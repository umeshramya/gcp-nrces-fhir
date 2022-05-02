import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { DiagnosticReport } from "../DiagnosticReport";
import { ServiceRequest } from "../ServiceRequest";

interface args {
  composition: COMPOSITOIN;
  diagnosticReport: any;
  media: [];
  serviceRequest: any;
}

export class DiagnosticReportComp extends Composition implements Records {
  private setPerformerAndRequester = (options: args) => {
    const serviceRequest = new ServiceRequest();
    const serviceRequestBody = serviceRequest.convertFhirToObject(
      options.serviceRequest
    );

    const diagnosticReport = new DiagnosticReport();
    const diagnosticReportObj = diagnosticReport.convertFhirToObject(
      options.diagnosticReport
    );

    this.setRequester({
      reesource: serviceRequestBody.requester.resource,
      display: serviceRequestBody.requester.display,
    });

    if (diagnosticReportObj.performer) {
      diagnosticReportObj.performer.forEach((el) => {
        if (el.display) {
          this.setPerformer({ display: el.display, reesource: el.resource });
        }
      });
    }
  };
  create = async (options: args) => {
    this.setPerformerAndRequester(options);

    options.composition.section.push({
      title: options.diagnosticReport.code.text,
      code: options.diagnosticReport.code,
      entry: [
        {
          reference: `DiagnosticReport/${options.diagnosticReport.id}`,
          type: "DiagnosticReport",
        },
      ],
    });

    options.composition.documentDatahtml = options.diagnosticReport.text.div;

    const body = this.getFHIR(options.composition);

    body.section = options.composition.section;
    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };
  update = async (options: args) => {
    this.setPerformerAndRequester(options);
    options.composition.section = [];
    options.composition.section.push({
      title: "Computed tomography imaging report",
      code: options.diagnosticReport.code,
      entry: [
        {
          reference: `DiagnosticReport/${options.diagnosticReport.id}`,
          type: "DiagnosticReport",
        },
      ],
    });

    options.composition.documentDatahtml = options.diagnosticReport.text.div;

    const body = this.getFHIR(options.composition);

    body.section = options.composition.section;
    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.updateFhirResource(
      body,
      options.composition.id || "",
      "Composition"
    );
    return res;
  };
}
