import { CODEABLE_CONCEPT, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";

export interface COMMUNICATION {
  id?: string;
  hcx?: "nhcx" | "swasth";
  text: string;
  identifier: IDENTTIFIER[];
  CommunicationRequestIds?: string[];
  status:
    | "preparation"
    | "in-progress"
    | "not-done"
    | "on-hold"
    | "stopped"
    | "completed"
    | "entered-in-error"
    | "unknown";
  category: CODEABLE_CONCEPT[];
  priority: "routine" | "urgent" | "asap" | "stat";
  recipientOrganizationIds: string[];
  senderOrganizationId: string;
  contentBase64PDFstrings ?: {pdf :string, createdDate:string, title:string}[]
}

export  class Communication
  extends ResourceMain
  implements ResourceMaster
{
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: COMMUNICATION) {
    const body = {
      resourceType: "Communication",
      id: options.id ? options.id : undefined,
      meta: {
        versionId: "1",
        lastUpdated: "2023-09-07T14:58:58.181+05:30",
        profile:
          options.hcx == "nhcx"
            ? [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Communication",
              ]
            : [
                "https://ig.hcxprotocol.io/v0.8/StructureDefinition-Communication.html",
              ],
      },
      text: {
        status: "generated",
        div: options.text,
      },
      identifier: options.identifier,
      basedOn: options.CommunicationRequestIds?.map((el) => ({
        reference: `CommunicationRequest/${el}`,
      })),
      status: options.status,
      category: options.category,
      priority: options.priority,
      recipient: options.recipientOrganizationIds.map((el) => ({
        reference: `Organization/${el}`,
      })),
      sender: {
        reference: `Organization/${options.senderOrganizationId}`,
      },
      payload:options.contentBase64PDFstrings &&  options.contentBase64PDFstrings.map(el=>(
        {
          contentAttachment:{
            contentType: "application/pdf",
            language: "en-IN",
            data: el.pdf,
            title: el.title,
            creation: el.createdDate
          }
        }
     ))
    };
    return body;
  }
  convertFhirToObject(options: any) : COMMUNICATION {
    const communication:COMMUNICATION={
      text: options.text.div,
      identifier: options.identifier,
      status: options.status,
      category: options.category,
      priority: options.priority,
      recipientOrganizationIds: options.recipient.map((el:any) => this.getIdFromReference({"resourceType" : "Organization", "ref" : el.reference})),
      senderOrganizationId: this.getIdFromReference({"resourceType" : "Organization", "ref" : options.sender.reference}),
      contentBase64PDFstrings: options.payload.map((el:any) => ({
       pdf: el.contentAttachment.data,
       title: el.contentAttachment.title,
       createdDate: el.contentAttachment.creation
      }))
    };

    if(options.basedOn){
      communication.CommunicationRequestIds = options.basedOn.map((el:any) => this.getIdFromReference({"resourceType" : "CommunicationRequest", "ref" : el.reference}));
    }
    if(options.id){
      communication.id = options.id;
    }
    return communication;
  }
  statusArray?: Function | undefined;
}
