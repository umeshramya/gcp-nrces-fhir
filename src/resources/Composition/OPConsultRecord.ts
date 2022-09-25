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
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };
  update = async (options: Args) => {
    options =await this.getOptions(options);
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

  async getOptions(options: Args):Promise<Args> {
    options.composition.section = [];
    options.composition.documentDatahtml = "";
    let docHtml = "";
    let diagnosis:string[] = []
    await this.getDiagnosisFromEnconter(options.composition.encounter.diagnosis, 0, diagnosis)
    if(diagnosis && diagnosis.length > 0){
     let diagnosisString=""
     diagnosis.forEach((el, i)=> diagnosisString +=`(${i+1}). ${el} `)
     docHtml += `<p><b>Diagnosis :- </b>${diagnosisString}${docHtml}</p><p></p>`
 
    }
    docHtml += `<table  style="border-collapse: collapse; width: 99.9739%;" border="0">`;
    docHtml += `<tbody style="display: table-header-group"><tr>`;
    docHtml += `<td style="width: 50%;"  border="0" >${this.getLeftColumn(
      options
    )}</td>`;
    docHtml += `<td style="width: 50%;"  border="0" >${this.getRightColumn(
      options
    )}</td>`;
    docHtml += `</tr></thead>`;
    docHtml += `<tbody>`;
    docHtml += `</table>`;

    if (options.medicationRequest || options.medicationStatement) {
      let entry = [];
      if (options.medicationStatement) {
        entry.push({
          reference: `MedicationStatement/${options.medicationStatement.id}`,
        });

        docHtml =
          docHtml +
          `<b>Medication Statement</b>${options.medicationStatement.text.div}`;
      }
      if (options.medicationRequest) {
        entry.push({
          reference: `MedicationRequest/${options.medicationRequest.id}`,
        });
        docHtml =
          docHtml + `<b>Prescription</b>${options.medicationRequest.text.div}`;
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

    options.composition.documentDatahtml = docHtml;

    return options;
  }

  getLeftColumn = (options: Args): string => {
    let docHtml = "";
    if (options.chiefComplaints) {
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
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.chiefComplaints.text.div}<br/>`;
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
        `<b>Medical History</b>${options.medicalHistory.text.div}<br/>`;
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
        `<b>Physical Examination</b>${options.physicalExamination.text.div}</br>`;
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
      docHtml = docHtml + `<b>Procedure</b>${options.procedure.text.div}</br>`;
    }
    return docHtml;
  };

  getRightColumn = (options: Args): string => {
    let docHtml = "";
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
        `<div"><span><b>Follow up:-</b>${
          new Date(options.followUp.start).toDateString() ||
          new Date(options.followUp.end).toDateString()
        }${options.followUp.text.div}</br>`;
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

      docHtml = docHtml + `<b>Allergies</b>${options.allergies.text.div}</br>`;
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
        `<b>Investigation Advice</b>${options.investigationAdvice.text.div}</br>`;
    }

    return docHtml;
  };
}
