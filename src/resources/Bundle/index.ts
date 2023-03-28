import ResourceFactory from "../../classess/ResourceFactory";
import { Composition, COMPOSITOIN, emptySign } from "../Composition";
import GcpFhirCrud from "../../classess/gcp";
import ResourceMain from "../ResourceMai";
import { Binary, BINARY } from "../Binary";
import { CreatePdf } from "js-ts-report";
import { DocumentReference } from "../DocumentReference";
import { Patient } from "../Patient";
import { Encounter } from "../Encounter";
import { Organization } from "../Organization";
import { MedicationRequest } from "../MedicationRequest";

export class BundelMain extends ResourceMain {
  protected entry: any[] = [];

  protected  gcpCredetials:any
  protected  gcpPath:any

  constructor(gcpCredetials:any,gcpPath:any ){
    super()
    this.gcpCredetials = gcpCredetials
    this.gcpPath= gcpPath;
  }

  async getentries(
    composition: any,
    pdfData: string
  ): Promise<{ entry: any[]; compositionObj: COMPOSITOIN }> {
    const compositionObj = new ResourceFactory(
      "Composition"
    ).convertFhirToObject<COMPOSITOIN>(composition);
    const gcpGcpFhir = new GcpFhirCrud(this.gcpCredetials, this.gcpPath);

    const authors: any = await Promise.all(
      compositionObj.author.map(async (el) => {
        const id = this.getIdFromReference({
          ref: el.reference,
          resourceType: "Practitioner",
        });
        const url = el.reference;
        const resource = await gcpGcpFhir
          .getFhirResource(id, "Practitioner")
          .then((res) => res.data);
        return {
          fullUrl: url,
          resource: resource,
        };
      })
    ).then((res) => res);
  
    const entry = [
      {
        fullUrl: `Composition/${compositionObj.id}`,
        resource:  new Composition().bundlify(composition),
      },
      {
        fullUrl: `Patient/${compositionObj.patientId}`,
        resource: new Patient().bundlify((await gcpGcpFhir.getFhirResource(
          compositionObj.patientId,
          "Patient"
        )).data),
      },
      {
        fullUrl: `Encounter/${compositionObj.encounterId}`,
        resource: new Encounter().bundlify((await gcpGcpFhir.getFhirResource(
          compositionObj.encounterId,
          "Encounter"
        )).data),
      },

      {
        fullUrl: `Organization/${compositionObj.organizationId}`,
        resource: new Organization().bundlify((await gcpGcpFhir.getFhirResource(
          compositionObj.organizationId,
          "Organization"
        )).data),
      },
      {
        fullUrl : `DocumentReference/${compositionObj.id}`,
        resource : new DocumentReference().bundlify(new DocumentReference().getFHIR({
          "id": compositionObj.id,
          "patientId": compositionObj.patientId,
          "pdf": pdfData,
          "docStatus": compositionObj.status,
          "title": composition.title,
          "type" : composition.type,
          status: "current"
      }))
    }
      
    ];

    authors.forEach((el: { fullUrl: string; resource: any }) => {
      entry.push(el);
    });

    return { entry, compositionObj };
  }

  async getpdf(options: { html: string; qrCode: string , compositionRes?:any, singleImagePerPage ?: boolean}): Promise<string> {
    const composition = new Composition()
      const mediaContent: string[] = [];
    if(options.compositionRes){
      const section = composition.convertFhirToObject(options.compositionRes).section as any

         const mediaId: string[] = section[0].entry.filter((el:any)=>{
      if(el.type=="Media"){
        return el
      }
    }).map(
      (el: any) => {
        const id = this.getIdFromReference({
          ref: el.reference,
          resourceType: "Media",
        });
        return id;
      }
    );

  
    if(mediaId.length > 0){
      await composition.getMediaComposition(0, mediaId, mediaContent);
    }
    }

 
   
    let pdf = new CreatePdf();
    const ret = await pdf.create(options.html, {
      base64: true,
      paperSize: "A4",
      qrcode: options.qrCode,
      esign: {
        image: emptySign,
        nameLine1: "Scan QR code to get full document",
      },
      media :mediaContent.length > 0 ?  {
        "content" : mediaContent,
        singleImagePerPage : options.singleImagePerPage || false 
      } : undefined
    });
    return ret as any;
  }


  protected getAllSectionAndAllEntries = async (
    index: number,
    sections: any[]
  ) => {
    if (index >= sections.length) {
      return;
    }

    await this.getEntriesPerSection(0, sections[index].entry);

    index = index + 1;
    await this.getAllSectionAndAllEntries(index, sections);
  };

  protected getEntriesPerSection = async (
    index: number,
    sectionEntries: any[]
  ) => {
    if (index >= sectionEntries.length) {
      return;
    }

    const curSectionEntryObj = this.getFromMultResource({
      reference: sectionEntries[index].reference,
    });
    const curSectionEntry = await new GcpFhirCrud(
      this.gcpCredetials,
      this.gcpPath
    ).getFhirResource(curSectionEntryObj.id, curSectionEntryObj.resource);
    if (curSectionEntryObj.resource == "MedicationRequest") {
      const medicationRequest = new MedicationRequest().bundlify(
        curSectionEntry.data
      );
      medicationRequest.forEach((el: any, i: number) => {
        this.entry.push(el);
      });
    } else {
      this.entry.push({
        fullUrl: `${curSectionEntryObj.resource}/${curSectionEntryObj.id}`,
        resource: new ResourceFactory(curSectionEntryObj.resource).bundlefy(
          curSectionEntry.data
        ),
      });
    }

    curSectionEntry.data;
    index = index + 1;
    await this.getEntriesPerSection(index, sectionEntries);
  };
}


