import { CODEABLE_CONCEPT } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface IMMUNIZATION {
  resourceType: "Immunization";
  id: string;
  meta: Meta;
  text: Text;
  extension: Extension[];
  status: "completed" | "entered-in-error " | "not-done";
  statusReason: CODEABLE_CONCEPT;
  vaccineCode: CODEABLE_CONCEPT;
  patient: Patient;
  occurrenceDateTime: string;
  primarySource: boolean;
}

interface Meta {
  profile: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Immunization"[];
}

interface Text {
  status: string;
  div: string;
}

interface Extension {
  url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/BrandName";
  valueString: string;
}


interface Patient {
  reference: string;
}

export class Immunization extends ResourceMain implements ResourceMaster {
  getFHIR(options: IMMUNIZATION) {
    const patientString = `Patient/${options.patient.reference}`
    const body:IMMUNIZATION={
      ...options,
      patient : {"reference" : patientString}
    }

    return body
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}

const body = {
  resourceType: "Immunization",
  id: "example-01",
  meta: {
    profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Immunization"],
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Narrative with Details</b></p><p><b>id</b>: 1</p><p><b>status</b>: not-done</p><p><b>statusReason</b>: medical precaution <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ActReason code 'MEDPREC' = 'medical precaution', given as 'medical precaution'})</span></p><p><b>vaccineCode</b>: No consent DTP immunization <span>(Details : {http://snomed.info/sct code '314768003' = 'No consent DTP immunization'})</span></p><p><b>patient</b>: <a>Patient/1</a></p><p><b>occurrence</b>: 10/01/2013</p><p><b>primarySource</b>: true</p></div>",
  },
  extension: [
    {
      url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/BrandName",
      valueString: "Adacel®",
    },
  ],
  status: "not-done",
  statusReason: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
        code: "MEDPREC",
        display: "medical precaution",
      },
    ],
  },
  vaccineCode: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "314768003",
        display: "No consent DTP immunization",
      },
    ],
  },
  patient: { reference: "Patient/1" },
  occurrenceDateTime: "2013-01-10",
  primarySource: true,
};
