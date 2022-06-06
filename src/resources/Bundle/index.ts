import ResourceFactory from "../../classess/ResourceFactory";
import { COMPOSITOIN, emptySign } from "../Composition";
import GcpFhirCrud from "../../classess/gcp";
import ResourceMain from "../ResourceMai";
import { Binary, BINARY } from "../Binary";
import { CreatePdf } from "js-ts-report";
import { DocumentReference } from "../DocumentReference";

export class BundelMain extends ResourceMain {
  async getentries(
    composition: any,
    pdfData: string
  ): Promise<{ entry: any[]; compositionObj: COMPOSITOIN }> {
    const compositionObj = new ResourceFactory(
      "Composition"
    ).convertFhirToObject<COMPOSITOIN>(composition);
    const gcpGcpFhir = new GcpFhirCrud();

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
        resource: composition,
      },
      {
        fullUrl: `Patient/${compositionObj.patientId}`,
        resource: await gcpGcpFhir.getFhirResource(
          compositionObj.patientId,
          "Patient"
        ),
      },
      {
        fullUrl: `Encounter/${compositionObj.encounterId}`,
        resource: await gcpGcpFhir.getFhirResource(
          compositionObj.encounterId,
          "Encounter"
        ),
      },

      {
        fullUrl: `Organization/${compositionObj.organizationId}`,
        resource: await gcpGcpFhir.getFhirResource(
          compositionObj.organizationId,
          "Organization"
        ),
      },
      {
        fullUrl : `DocumentReference/${compositionObj.id}`,
        resource : new DocumentReference().getFHIR({
          "id": compositionObj.id,
          "patientId": compositionObj.patientId,
          "pdf": pdfData,
          "docStatus": compositionObj.status,
          "title": "",
          "type" : composition.type,
          status: "current"
      })
    }
      
    ];

    authors.forEach((el: { fullUrl: string; resource: any }) => {
      entry.push(el);
    });

    return { entry, compositionObj };
  }

  async getpdf(options: { html: string; qrCode: string }): Promise<string> {
    let pdf = new CreatePdf();
    const ret = await pdf.create(options.html, {
      base64: true,
      paperSize: "A4",
      qrcode: options.qrCode,
      esign: {
        image: emptySign,
        nameLine1: "Scan QR code to get full document",
      },
    });
    return ret as any;
  }
}
