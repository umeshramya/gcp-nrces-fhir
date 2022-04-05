import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";

interface args{ 
  composition: COMPOSITOIN;
  diagnosticReport:any;
  requester:any;
  performer?:any;
  media:[]
}

export class DiagnosticReportComp extends Composition implements Records {
  create = async (options: args) => {
    this.setRequester(options.requester)
    if(options.performer){
      this.setPerformer(options.performer)
    }
    this.setPerformer(options.performer)

    options.composition.section.push({
      reference: `DiagnosticReport/${options.diagnosticReport.id}`,
      type: "DiagnosticReport",
    });
    options.composition.documentDatahtml += options.diagnosticReport.text.div;
  };
  update = async (options: {}) => {};
}
