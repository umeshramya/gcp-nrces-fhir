import { ResourceMaster } from "../Interfaces";
import GcpFhirSearch from "../classess/gcpSearch";
import { CODEABLE_CONCEPT, CodeDisplay, MULTI_RESOURCE } from "../config/index";
import ResourceMain from "./ResourceMai";

export const allergyClinicalStatusArray = [
  "active",
  "inactive",
  "resolved",
] as const;
type AllergyClinicalStatus = typeof allergyClinicalStatusArray[number];

export const allergyVerificationStatusArray = [
  "unconfirmed",
  "confirmed",
  "refuted",
  "entered-in-error",
] as const;
type AllergyVerificationStatus = typeof allergyVerificationStatusArray[number];

interface RECORDER extends MULTI_RESOURCE{
  "resource" : "Practitioner" | "PractitionerRole" | "Patient" | "RelatedPerson"
}

export interface ALLERGY_INTOLERANCE {
  id?: string;
  clinicalStatus: AllergyClinicalStatus;
  verificationStatus: AllergyVerificationStatus;
  code : CODEABLE_CONCEPT
  text?: string;
  patientId: string;
  date: string;
  recorder?: RECORDER
  note?: { text: string }[];
  encounterId?:string
}

export class AllergyIntolerance extends ResourceMain implements ResourceMaster {
  async toHtml():Promise<string> {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: ALLERGY_INTOLERANCE): any {
    const getAllergy = (): string => {
      let ret = `<table data-pdfmake="{'widths':['90%']}">`;
      ret += `<tr><td>`
        
        ret = `Agent:${options.code.text}, clinical status:${options.clinicalStatus}, verification status:${options.verificationStatus}`;
        
        if(options.note && options.note.length > 0){
          ret += `${ret} <div>${options.note.map(el=>el.text).join(". ")}</div>`;
        }

      return ret;
    };
    const body:any = {
      resourceType: "AllergyIntolerance",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/AllergyIntolerance",
        ],
      },
      text: {
        status: "generated",
        div: getAllergy(),
      },
    
      clinicalStatus: {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
            code: options.clinicalStatus,
            display: options.clinicalStatus,
          },
        ],
      },
      verificationStatus: {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
            code: options.verificationStatus,
            display: options.verificationStatus,
          },
        ],
      },
      code: options.code,
      patient: { reference: `Patient/${options.patientId}` },
      recordedDate: options.date,
     
      
    };

    if(options.encounterId){
      body.encounter=  {
        "reference" : `Encounter/${options.encounterId}`
      }
    }

    if(options.note){
      body.note = options.note
    }

    if(options.recorder){
      body.recorder={"reference" : `${options.recorder?.resource}/${options.recorder?.id}`}
    }


    return body;
  }
  convertFhirToObject(options: any): ALLERGY_INTOLERANCE {
    let ret: ALLERGY_INTOLERANCE = {
      clinicalStatus: options.clinicalStatus.coding[0].code,
      verificationStatus: options.verificationStatus.coding[0].code,
      code: options.code,
      text: options.text.div,
      patientId: `${options.patient.reference}`.substring(8),
      date: options.recordedDate,
      id: options.id,

    };
    if(options.encounter){
      ret.encounterId = this.getIdFromReference({"ref" : options.encounter.reference, "resourceType" : "Encounter"})
    }
    if(options.recorder){
    ret.recorder = this.getFromMultResource({"reference" : options.recorder.reference }) as RECORDER
    }

    if(options.note){
      ret.note= options.note
    }

      
    
    // note: options.note,
    return ret;
  }

  getClinicalStatusArray = (): AllergyClinicalStatus[] => {
    return allergyClinicalStatusArray.map((el) => el);
  };

  getVerificationStatus = (): AllergyVerificationStatus[] => {
    return allergyVerificationStatusArray.map((el) => el);
  };


  getPatientPerEncounterAllergyIntolerances = async (patientId: string, encounterId: string): Promise<ALLERGY_INTOLERANCE[]> => {
    let ret: ALLERGY_INTOLERANCE[] = [];
    const gcpFhirSearch = new GcpFhirSearch();

    try {
        // Perform search for AllergyIntolerance resources by patient ID
        const res = await gcpFhirSearch.search("AllergyIntolerance", `patient=${patientId}`);

        // Check if the response contains valid data entries
        if (res.data && res.data.entry && res.data.entry.length > 0) {
            // Filter entries to only include those with a matching encounter ID
            ret = res.data.entry
                .filter((el: any) => {
                    // Attempt to extract Encounter ID from the resource reference
                    const id = this.getIdFromReference({ ref: el.resource.encounter.reference, resourceType: "Encounter" });
                    return id === encounterId;
                })
                // Convert each filtered FHIR resource to ALLERGY_INTOLERANCE object
                .map((el: { resource: any; }) => this.convertFhirToObject(el.resource));
        }
    } catch (error) {
        console.error("Error fetching AllergyIntolerance data:", error);
        // Optional: Handle errors, log, or throw to propagate further
    }

    return ret;
}




gettAllergyIntolerancesText =(allergyIntolerances:ALLERGY_INTOLERANCE[]):string=>{
  let  ret:string=''
  allergyIntolerances.forEach((el, i)=>{
    ret+= `<div>${i+1} ${el.text}</div>`
  })

  return ret

}
}
