import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";
import { MedicationRequest } from "../MedicationRequest";
import { Condition } from "../Condition";

export class HealthDocumentBundle extends BundelMain implements ResourceMaster {

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

    const bundlemain = await new BundelMain(
      this.gcpCredetials,
      this.gcpPath
    ).getentries(options.composition, options.pdfData);

    this.entry = bundlemain.entry;

    const sectionEntries = options.composition.section;

    await this.getAllSectionAndAllEntries(0, sectionEntries);
    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        lastUpdated: new Date().toISOString(),
      },
      identifier: {
        system: "https://www.nicehms.com/bundle",
        value: options.id,
      },
      type: "document",
      timestamp: options.composition.date,
      entry: this.entry,
    };
    
    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}







export interface COMPOSITOIN_RESOURCE {
  resourceType: string
  id: string
  meta: Meta
  identifier: Identifier
  type: string
  timestamp: string
  entry: Entry[]
}

 interface Meta {
  lastUpdated: string
}

 interface Identifier {
  system: string
  value: string
}

 interface Entry {
  fullUrl: string
  resource: Resource
}

interface Resource {
  author: Author[]
  custodian: Custodian
  date: string
  encounter: Encounter
  id: string
  identifier: Identifier2
  resourceType: string
  section: Section[]
  status: string
  subject: Subject
  title: string
  type: Type
}

interface Author {
  display: string
  reference: string
}

interface Custodian {
  reference: string
}

interface Encounter {
  reference: string
}

interface Identifier2 {
  system: string
  value: string
}

interface Section {
  code: Code
  entry: Entry2[]
  title: string
}

interface Code {
  coding: Coding[]
}

interface Coding {
  code: string
  display: string
  system: string
}

interface Entry2 {
  reference: string
  type: string
}

interface Subject {
  reference: string
}

interface Type {
  coding: Coding2[]
  text: string
}

interface Coding2 {
  code: string
  display: string
  system: string
}
