import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { APPOINTMENT } from "../Appointment";
interface Args {
  composition: COMPOSITOIN;
  medicationRequest: any;
  diagnosis?: any;
  followUp?:any
}
export class PrescriptionRecord extends Composition implements Records {

  create = async (options:Args ) => {
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    const gcpFhirCrud = new GcpFhirCRUD();
    body.section = options.composition.section;
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };

  update = async (options: Args) => {
    if (!options.composition.id) {
      throw (new Error().message = "id of composition is required");
    }
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

  getOptions = async(options:Args):Promise<Args>=>{
    let docHtml=""

    interface SECTION_ZERO{
      "code": {
        "coding": [
          {
            "code": "440545006",
            "display": "Prescription",
            "system": "https://ndhm.gov.in/sct"
          }
        ]
      },
      "entry": any[],
      "title": "Prescription"
    }
    const sectionZero:SECTION_ZERO={
      "code": {
        "coding": [
          {
            "code": "440545006",
            "display": "Prescription",
            "system": "https://ndhm.gov.in/sct"
          }
        ]
      },
      "entry" : [],
      "title": "Prescription"
    }
    if (options.diagnosis) {
      sectionZero.entry.push({
        reference: `Condition/${options.diagnosis.id}`,
        type: "Condition",
      });
      docHtml= `${options.diagnosis.text.div}`;
    }

    sectionZero.entry.push({
      reference: `MedicationRequest/${options.medicationRequest.id}`,
      type: "MedicationRequest",
    });


    options.composition.section.push(sectionZero);
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
  
   let diagnosis:string[] = []
   await this.getDiagnosisFromEnconter(options.composition.encounter.diagnosis, 0, diagnosis)
   if(diagnosis && diagnosis.length > 0){
    let diagnosisString=""
    diagnosis.forEach((el, i)=> diagnosisString +=`${i+1}. ${el}, `)
    docHtml = `<div><b>Diagnosis</b></div>${diagnosisString}${docHtml}`

   }

    docHtml += options.medicationRequest.text.div;

    options.composition.documentDatahtml =docHtml
    return options
  }
}
