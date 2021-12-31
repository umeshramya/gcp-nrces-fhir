import { CodeDisplay } from "../../config";
import { ResourceMaster } from "../../Interfaces";
import { PATIENT } from "../Patient";
import { PRACTITIONER } from "../Practitioner";
import ResourceMain from "../ResourceMai";

export const MedicatioRequestStatusArray = ["active" , "on-hold" , "cancelled" , "completed" , "entered-in-error" , "stopped" , "draft" , "unknown"] as const
type MedicatioRequestStatus = typeof MedicatioRequestStatusArray[number]

export const MedicatioRequestIntentArray = ["proposal" , "plan" , "order" , "original-order" , "reflex-order" , "filler-order" , "instance-order" , "option"] as const
type MedicatioRequestIntent = typeof MedicatioRequestIntentArray[number]

interface MEDICATION_REQUEST{
    id?:string;
    patient:PATIENT;
    Practitioner:PRACTITIONER;
    date:string;
    reasonReferenceCondtionId?: string;
    status : MedicatioRequestStatus;
    intent : MedicatioRequestIntent;
    medicationCodeableConcept:CodeDisplay[]
    reasonCode:CodeDisplay[]
    dosageInstruction:{
        text: string,
        additionalInstruction ?: [
        {
            coding: CodeDisplay[]
        },
        ],
        timing: {     "code" : {
            "text" : string;
          }    
        },
        route: {
        coding:CodeDisplay[]
        },
        method: {
        coding:CodeDisplay[]
        },
    }[]
    
}

export class MedicationRequest extends ResourceMain implements ResourceMaster{
    getFHIR(options:MEDICATION_REQUEST):any {
        
    const body = {
        resourceType: "MedicationRequest",
        id: options.id || undefined,
        meta: {
        profile: [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest",
        ],
        },
        text: {
        status: "generated",
        div:
            `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Narrative with Details</b></p><p><b>id</b>: </p><p><b>status</b>: ${options.status}</p><p><b>intent</b>: ${options.intent}</p><p><b>subject</b>:MRN :- ${options.patient.MRN} Name ${options.patient.name}</p><p><b>requester</b>: ${options.Practitioner.name} ${options.Practitioner.qualification}</p><p><b>reasonCode</b>: Traveller\'s Diarrhea</p><p><b>medication</b>: Azithromycin (as azithromycin dihydrate) 250 mg oral capsule</p><p><b>authoredOn</b>: 2020-07-09</p><p><b>dosageInstruction</b>: One tablet at once (With or after food)</p></div>`,
        },
        status: "active",
        intent: "order",
        medicationCodeableConcept: {
        coding: options.medicationCodeableConcept,
        },
        subject: { reference: `Patient/${options.id}`, display: options.patient.name },
        authoredOn: options.date,
        requester: { reference: `Practitioner/${options.id}`, display: `${options.Practitioner.name} ${options.Practitioner.qualification}` },
        reasonCode: [
        {
            coding: options.reasonCode
        },
        ],
        reasonReference: [{ reference: options.reasonReferenceCondtionId ?  `Condition/${options.reasonReferenceCondtionId}` : undefined }],
        dosageInstruction: options.dosageInstruction
    };

    return body
  
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }

}
