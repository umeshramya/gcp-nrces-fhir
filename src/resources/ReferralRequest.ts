import { type } from "os";
import { CODEABLE_CONCEPT, CodeDisplay, MULTI_RESOURCE, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";
const status = ["draft" , "active" , "suspended" , "cancelled" , "completed" , "entered-in-error" , "unknown"] as const
const intent = ["proposal" , "plan" , "order"] as const
type Status = typeof status[number]
type Intent = typeof intent[number]

interface SUBJECT extends MULTI_RESOURCE{
  resource : "Patient" | "Group"
  display :string
}
interface AGENT extends MULTI_RESOURCE{
  resource : "Practitioner" | "Organization" | "Patient" | "RelatedPerson" | "Device"
  display :string
}

interface ON_BE_HALF_OF extends MULTI_RESOURCE{
  resource : "Organization"
  display :string
}
interface REQUESTER {
  agent: AGENT
  onBehalfOf?: ON_BE_HALF_OF
}

interface RECIPENT extends MULTI_RESOURCE{
  resource : "Practitioner" | "Organization" | "HealthcareService"
  display :string
}
export interface REFERRAL_REQUEST {
  id?: string;
  text:string
  status : Status
  intent : Intent
  subject : SUBJECT
  /**
   * DateTime in ISO format
   */
  authoredOn:string
  requester: REQUESTER
  specialty : CODEABLE_CONCEPT
  recipient :RECIPENT[],
  description : string
 
}
export class ReferralRequest extends ResourceMain implements ResourceMaster {
  getFHIR(options: REFERRAL_REQUEST) {
    const body = {
      resourceType: "Specimen",
      id: options.id,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/ReferralRequest"],
      },
      text: {
        status: "generated",
        div: options.text,
      },
      status : options.status,
      intent : options.intent,
      subject : {"reference" : `${options.subject.resource}/${options.subject.id}`, display : options.subject.display},
      requester: {
        agent : {"reference" : `${options.requester.agent.resource}/${options.requester.agent.id}`, display : options.requester.agent.display},
        onBehalfOf : {"reference" : `${options.requester.onBehalfOf?.resource}/${options.requester.onBehalfOf?.id}` , display : options.requester.onBehalfOf?.display}
      },
      specialty : options.specialty,
      recipient : options.recipient.map(el=>{
        return{
          "reference" : `${el.resource}/${el.id}`,
          "display" : el.display
        }
      }),
      "description" : options.description
     
    };
    return body;
  }
  convertFhirToObject(options: any) {
    // let ret: REFERRAL_REQUEST = {


    // };
    // return ret;
  }
  statusArray?: Function | undefined;
}
