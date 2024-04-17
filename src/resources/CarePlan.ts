import { CODEABLE_CONCEPT } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";


 const carePlanStatusArray = ["draft" , "active" , "on-hold" , "revoked" , "completed" , "entered-in-error" , "unknown"]as const
export type CarePlanStatus = typeof carePlanStatusArray;

export const carePlanIntentArray = ["proposal" , "plan" ,"order" , "option"]as const
export type CarePlanIntent = typeof carePlanIntentArray


export interface CARE_PLAN{
    id?:string
    status:CarePlanStatus
    inetent: CarePlanIntent
    text : string
    category?:CODEABLE_CONCEPT[]
    title?:string
    description?:string
    patient:PATIENT;

}
export class CarePlan extends ResourceMain implements ResourceMaster {
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: CARE_PLAN) {
    const body = {
      resourceType: "CarePlan",
      id: options.id || undefined,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/CarePlan"],
      },
      text: {
        status: "additional",
        div: options.text,
      },
      status: options.status,
      intent: options.inetent,
      category: options.category,
      title: options.title,
      description: options.description,
      subject: {
        reference: `Patient/${options.patient.id}`,
        display: options.patient.name,
      },
      activity: [
        {
          outcomeReference: [
            {
              reference: "Appointment/1",
            },
          ],
        },
      ],
    };
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray = ():CarePlanStatus[]=>{
    return carePlanStatusArray.map(el=>el) as any
  }
}
