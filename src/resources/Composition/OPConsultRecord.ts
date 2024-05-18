import { TimeZone } from "../../TimeZone";
import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { title } from "process";

interface Args {
  composition: COMPOSITOIN;
  chiefComplaints?: any;
  treamentProtocol?:any;
  weight?:any;
  height?:any;
  heartRate?:any
  bloodPressurerightArm?:any
  bodyMassIndex?:any
  bodySurfaceArea?:any
  respiratoryRate?:any
  spo2?:any
  letter?:any
  stage?:any
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
  create = async (options: Args, Credentials?: any, DatabasePath?:any) => {
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    let gcpFhirCrud:GcpFhirCRUD;
    if(Credentials){
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath)
    }else{
      gcpFhirCrud= new GcpFhirCRUD()
    }
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };
  update = async (options: Args, Credentials?: any, DatabasePath?:any) => {
    options =await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;
    let gcpFhirCrud:GcpFhirCRUD;
    if(Credentials){
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath)
    }else{
      gcpFhirCrud= new GcpFhirCRUD()
    }
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
     docHtml += `<p><b>Diagnosis :- </b>${diagnosisString}</p><p></p>`
 
    }
    if(options.composition.documentSubType){
      docHtml += `${this.getLeftColumn(options)}<br/>`
      docHtml += `${this.getRightColumn(options)}`
    }else{
      docHtml += `<table  style="border-collapse: collapse; width: 99.9739%;" border="0">`;
      docHtml += `<tbody style="display: table-header-group"><tr>`;
      docHtml += `<td style="width: 50%;"  border="0" >${this.getLeftColumn(
        options
      )}</td>`;
      docHtml += `<td style="width: 50%;"  border="0" >${this.getRightColumn(
        options
      )}</td>`;
      docHtml += `</tbody>`;
      docHtml += `</table>`;
    }

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
    if(options.weight){
      options.composition.section.push({
        title: "Body Weight",
        code: {
          coding: [
            {
              "system": "http://loinc.org",
              "code": "29463-7",
              "display": "Body weight"
            }
          ],
        },
        entry: [
          {
            reference: `Observation/${options.weight.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.weight.text.div}<br/>`;

    }

    if(options.height){
      options.composition.section.push({
        title: "Body Height",
        code: {
          coding: [
            {
              "system": "http://loinc.org",
              "code": "8302-2",
              "display": "Body height"
            }
          ],
        },
        entry: [
          {
            reference: `Observation/${options.height.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.height.text.div}<br/>`;

    }

    if(options.bodyMassIndex){
      options.composition.section.push({
        title: "Body Mass Index",
        code: {
          coding: [
            {
              "system": "http://loinc.org",
              "code": "39156-5",
              "display": "Body mass index (BMI) [Ratio]"
            }
          ],
        },
        entry: [
          {
            reference: `Observation/${options.bodyMassIndex.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.bodyMassIndex.text.div}<br/>`;

    }

    if(options.bodySurfaceArea){
      options.composition.section.push({
        title: "Body Surface Area",
        code: {
          coding: [
            {
              "system": "http://loinc.org",
              "code": "58025-7",
              "display": "Body Surface Area (BSA) [Ratio]"
            }
          ],
        },
        entry: [
          {
            reference: `Observation/${options.bodySurfaceArea.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.bodySurfaceArea.text.div}<br/>`;

    }

    if(options.respiratoryRate){
      options.composition.section.push({
        title: "Respiratory rate",
        code: {
          coding: [
            {
              "system": "http://loinc.org",
              "code": "9279-1",
              "display": "Respiratory rate"
            }
          ],
        },
        entry: [
          {
            reference: `Observation/${options.respiratoryRate.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.respiratoryRate.text.div}<br/>`;

    }

    if(options.spo2){
      options.composition.section.push({
        title: "Oxygen saturation in Arterial blood",
        code: {
          coding: [
            {
              "system": "http://loinc.org",
              "code": "2708-6",
              "display": "Oxygen saturation in Arterial blood"
            }
          ],
        },
        entry: [
          {
            reference: `Observation/${options.spo2.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.spo2.text.div}<br/>`;

    }

    if(options.heartRate){
      options.composition.section.push({
        title: "Oxygen saturation in Arterial blood",
        code: {
          coding: [
            {
              "system": "http://loinc.org",
              "code": "8867-4",
              "display": "Heart rate"
            }
          ],
        },
        entry: [
          {
            reference: `Observation/${options.heartRate.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.heartRate.text.div}<br/>`;

    }

    if(options.bloodPressurerightArm){
      options.composition.section.push({
        title: "Blood pressure panel with all children optional",
        code: {
          coding: [
            {
              "system": "http://loinc.org",
              "code": "85354-9",
              "display": "Blood pressure panel with all children optional"
            }
          ],
        },
        entry: [
          {
            reference: `Observation/${options.bloodPressurerightArm.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.bloodPressurerightArm.text.div}<br/>`;

    }


  
    if (options.letter) {
      options.composition.section.push({
        title: "Letter",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371998007",
              display: "Letter",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.letter.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `${options.letter.text.div}<br/>`;
    }

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

      // docHtml =
      //   docHtml +
      //   `<div"><span><b>Follow up:-</b>${
      //     new Date(options.followUp.start).toDateString() ||
      //     new Date(options.followUp.end).toDateString()
      //   }${options.followUp.text.div}</br>`;

        docHtml = docHtml + 
        `<div"><span><b>Follow up:-</b>${
          new TimeZone().convertTZ(options.followUp.start, process.env.TZ as any, true) ||
          new TimeZone().convertTZ(options.followUp.end, process.env.TZ as any, true)
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

    if(options.treamentProtocol){
      options.composition.section.push({
        title: "Treatement Protocol",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "422843007",
              display: "Treatement Protocol",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.treamentProtocol.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `<b>Chief complaints</b>${options.treamentProtocol.text.div}<br/>`;
    }

    return docHtml;
  };
}
