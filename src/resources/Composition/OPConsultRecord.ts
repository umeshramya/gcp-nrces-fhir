import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
interface Args {
  composition: COMPOSITOIN;
  chiefComplaints: any;
  allergies?: any;
  medicalHistory?: any;
  investigationAdvice?: any;
  medicationStatement?: any;
  physicalExamination?: any;
  medicationRequest?: any;
  procedure?: any;
  followUp?: any;
}
export class OPConsultRecord extends Composition implements Records {
  create = async (options: Args) => {
    options = this.getOptions(options)
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };
  update = async (options: Args) => {
    options= this.getOptions(options)
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

  getOptions(options:Args):Args{
    options.composition.section = [];
    options.composition.documentDatahtml =""
    let docHtml = ""   
    docHtml = `<table  style="border-collapse: collapse; width: 99.9739%;" border="0">`;
    docHtml += `<tbody style="display: table-header-group"><tr>`;
    docHtml += `<td style="width: 50%;"  border="0" >${this.getLeftColumn(options)}</td>`
    docHtml += `<td style="width: 50%;"  border="0" >${this.getRightColumn(options)}</td>`
    docHtml += `</tr></thead>`
    docHtml += `<tbody>`
    docHtml += `</table>`;

    if (options.medicationRequest || options.medicationRequest) {
      let entry = [];
      if (options.medicationStatement) {
        entry.push({
          reference: `MedicationStatement/${options.medicationStatement.id}`,
        });

       docHtml =
         docHtml +
          `<h6>Medication Statement</h6>${options.medicationStatement.text.div}`;
      }
      if (options.medicationRequest) {
        entry.push({
          reference: `MedicationRequest/${options.medicationRequest.id}`,
        });
       docHtml =
         docHtml +
          `<h6>Prescription</h6>${options.medicationRequest.text.div}`;
      }

      options.composition.section.push({
        title: "Medications",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "721912009",
              display: "Medication summary document",
            },
          ],
        },
        entry: entry,
      });
    }

    options.composition.documentDatahtml=docHtml

    return options
  }

  getLeftColumn=(options:Args):string=>{
    let docHtml=""
    if(options.chiefComplaints){
      options.composition.section.push({
        title: "Chief complaints",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "422843007",
              display: "Chief complaint section",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.chiefComplaints.id}`,
          },
        ],
      });
     docHtml =options.composition.documentDatahtml + `<h6>Chief complaints</h6>${options.chiefComplaints.text.div}`;
  

    }
    
    if (options.medicalHistory) {
      options.composition.section.push({
        title: "Medical History",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371529009",
              display: "History and physical report",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.medicalHistory.id}`,
          },
        ],
      });

     docHtml =
       docHtml +
        `<h6>Medical History</h6>${options.medicalHistory.text.div}`;
    }

    if (options.physicalExamination) {
      options.composition.section.push({
        title: "Physical Examination",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371529009",
              display: "physical report",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.physicalExamination.id}`,
          },
        ],
      });

     docHtml =
       docHtml +
        `<h6>Physical Examination</h6>${options.physicalExamination.text.div}`;
    }

    if (options.investigationAdvice) {
      options.composition.section.push({
        title: "Investigation Advice",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "721963009",
              display: "Order document",
            },
          ],
        },
        entry: [
          {
            reference: `ServiceRequest/${options.investigationAdvice.id}`,
          },
        ],
      });
     docHtml =
       docHtml +
        `<h6>Investigation Advice</h6>${options.investigationAdvice.text.div}`;
    }

    if (options.procedure) {
      options.composition.section.push({
        title: "Procedure",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371525003",
              display: "Clinical procedure report",
            },
          ],
        },
        entry: [
          {
            reference: `Procedure/${options.procedure.id}`,
          },
        ],
      });
     docHtml =
       docHtml +
        `<h6>Procedure</h6>${options.procedure.text.div}`;
    }
    return docHtml
  }

  getRightColumn =(options:Args):string=>{
    let docHtml=""
    if (options.followUp) {
      options.composition.section.push({
        title: "Follow Up",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "736271009",
              display: "Outpatient care plan",
            },
          ],
        },
        entry: [
          {
            reference: `Appointment/${options.followUp.id}`,
          },
        ],
      });
      
     docHtml =
       docHtml +
        `<div"><span><b>Follow up:-</b>${new Date(options.followUp.start).toDateString() || new Date(options.followUp.end).toDateString()}`;
    }
    if (options.allergies) {
      options.composition.section.push({
        title: "Allergies",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "722446000",
              display: "Allergy record",
            },
          ],
        },
        entry: [
          {
            reference: `AllergyIntolerance/${options.allergies.id}`,
          },
        ],
      });

     docHtml =
       docHtml +
        `<h6>Allergies</h6>${options.allergies.text.div}`;
    }

    return docHtml

  }
}
