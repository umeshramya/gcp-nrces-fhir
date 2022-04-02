
import { CodeDisplay, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

const diagnosticReportStatus = ["registered", "partial", "preliminary", "final"] as const
export type DiagnosticReportStatus = typeof diagnosticReportStatus[number]

export interface DIAGNOSTIC_REPORT {
  id?: string;
  mediaId?: string[]
  issuedDate: string;
  conclusion: string
  conclusionCode: CodeDisplay[]
  status: DiagnosticReportStatus
  code: CodeDisplay[]
  base64Data?: string
}

export class DiagnosticReport extends ResourceMain implements ResourceMaster {
  getFHIR(options: DIAGNOSTIC_REPORT) {

    const getText = (): string => {
      let ret: string = ""

      return ret

    }

    const identifiers: IDENTTIFIER[] = []
    const body = {
      "resourceType": "DiagnosticReport",
      "id": options.id || undefined,
      "meta": {
        "versionId": "1",
        "lastUpdated": "2020-07-09T15:32:26.605+05:30",
        "profile": [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DiagnosticReportImaging"
        ]
      },
      "text": {
        "status": "generated",
        "div": getText()
      },
      "identifier": identifiers,
      "basedOn": [{ "reference": "ServiceRequest/1" }],
      "status": options.status,
      "category": [
        {
          "coding": options.conclusionCode
        }
      ],
      "code": {
        "coding": options.code
      },
      "subject": { "reference": "Patient/1", "display": "ABC" },
      "issued": options.issuedDate,
      "performer": [
        { "reference": "Organization/1", "display": "XYZ Lab Pvt.Ltd." }
      ],
      "resultsInterpreter": [
        { "reference": "Practitioner/1", "display": "Dr. DEF" }
      ],
      "media": options.mediaId ? options.mediaId?.map(el => {
        return { "link": { "reference": `Media/${el}` } }
      }) : undefined,
      "conclusion": options.conclusion,
      "conclusionCode": [
        {
          "coding": options.conclusionCode
        }
      ],
      "presentedForm": [
        {
          "contentType": "application/pdf",
          "language": "en-IN",
          "data": options.base64Data || "",
          "title": "Report"
        }
      ]
    }
    return body
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray(): DiagnosticReportStatus[] {
    return diagnosticReportStatus.map(el => el)
  }

}

