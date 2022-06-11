import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";

export class OPConsultationBundle extends BundelMain implements ResourceMaster {
  async getFHIR(options: {
    id?: string;
    identifier?: IDENTTIFIER;
    composition: any;
    pdfData: string;
  }) {
    if (options.identifier) {
      let ret: IDENTTIFIER = {
        system: "http://www.nicehms.com",
        value: options.identifier.value,
      };
    }
    
    const bundlemain = await new BundelMain().getentries(
      options.composition,
      options.pdfData
    );

    const entry = bundlemain.entry;
   
    const sectionEntries = options.composition.section

    await this.getAllSectionAndAllEntries(0, sectionEntries, entry)

    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle",
        ],
        security: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
            code: "V",
            display: "very restricted",
          },
        ],
      },
      identifier: options.identifier,
      type: "document",
      timestamp: new Date().toISOString,
      entry: entry,
    };

    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }

  private getAllSectionAndAllEntries = async(index:number, sections:any[], entry:any[])=>{

      if(index >= sections.length){
        return;
      }
      await this.getEntriesPerSection(0, sections[index].entry, entry)
      index= index+1
      this.getAllSectionAndAllEntries(index, sections, entry)

    }


  private getEntriesPerSection = async(index:number, sectionEntries:any[], entry:any[])=>{
    if(index >- sectionEntries.length){
      return
    }
    const curSectionEntryObj = this.getFromMultResource(sectionEntries[index].reference)
    const curSectionEntry = await new GcpFhirCrud().getFhirResource(curSectionEntryObj.id, curSectionEntryObj.resource);
    entry.push({
      fullUrl: `${curSectionEntryObj.resource}/${curSectionEntryObj.id}`,
      resource: curSectionEntry.data,
    })
    index = index +1;
    this.getEntriesPerSection(index, sectionEntries, entry)
  }


  statusArray?: Function | undefined;
}
