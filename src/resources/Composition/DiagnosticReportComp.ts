import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { DiagnosticReport } from "../DiagnosticReport";
import { ServiceRequest } from "../ServiceRequest";

interface args {
  composition: COMPOSITOIN;
  diagnosticReport: any;
  media: []
  serviceRequest: any
}

export class DiagnosticReportComp extends Composition implements Records {
  create = async (options: args) => {
    // this.setRequester(options.requester)
    // if (options.performer) {
    //   this.setPerformer(options.performer)
    // }
    // this.setPerformer(options.performer)
    const serviceRequest = new ServiceRequest();
    const serviceRequestBody = serviceRequest.convertFhirToObject(serviceRequest)
    this.setRequester({
      "reesource": serviceRequestBody.requester.resource,
      "display": serviceRequestBody.requester.display
    })

    const diagnosticReport = new DiagnosticReport();
    const diagnosticReportObj = diagnosticReport.convertFhirToObject(diagnosticReport);


    options.composition.section.push(
      {
        "title": "Computed tomography imaging report",
        "code": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "4261000179100",
              "display": "Computed tomography imaging report"
            }
          ]
        },
        "entry": [
          {
            reference: `DiagnosticReport/${options.diagnosticReport.id}`,
            type: "DiagnosticReport",
          }
        ]
      }
    );

    options.composition.documentDatahtml = options.diagnosticReport.text.div;


    const body = this.getFHIR(options.composition);

    body.section = options.composition.section;
    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };
  update = async (options: {}) => { };
}
