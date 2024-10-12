import { TimeZone } from "../../TimeZone";
import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { resourceType } from "../../config";

interface Args {
  composition: COMPOSITOIN;
  medicationRequest?: any;
  chiefComplaints:any
  histroryOfPrsentingIllness?:any;
  pasthistory?:any
  familyHistory?:any
  weight?:any
  height:any
  pulseRate:any
  spo2:any
  bloodPressure?:any
  glasgowComaScale?:any
  hba1c?:any
  bloodGlucose?:any
  hb?:any
  medicationStatement?:any
  allergyIntolerance?:any
}
export class InitialAssessment extends Composition implements Records {
  create = async (options: Args) => {
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
    options = await this.getOptions(options);
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

  getOptions = async (options: Args): Promise<Args> => {
    let docHtml = "";

    let diagnosis: string[] = [];
    await this.getDiagnosisFromEnconter(
      options.composition.encounter.diagnosis,
      0,
      diagnosis
    );
    if (diagnosis && diagnosis.length > 0) {
      let diagnosisString = "";
      diagnosis.forEach((el, i)=> diagnosisString +=`(${i+1}). ${el} `)
      docHtml += `<p><b>Diagnosis :- </b>${diagnosisString}</p><p></p>`;
    }

    interface SECTION_ZERO {
      code: {
        coding: [
          {
            code: "371530004";
            display: "InitialAssessment";
            system: "https://ndhm.gov.in/sct";
          }
        ];
      };
      entry: {reference : string, "type" : resourceType}[];
      title: "InitialAssessment";
    }
    const sectionZero: SECTION_ZERO = {
      code: {
        coding: [
          {
            code: "371530004",
            display: "InitialAssessment",
            system: "https://ndhm.gov.in/sct",
          },
        ],
      },
      entry: [],
      title: "InitialAssessment",
    };

    docHtml = `<table><tr>`
    //1 weight
    if(options.weight){
      sectionZero.entry.push({
        reference: `Observation/${options.weight.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.weight.text.div}</td>`;
    }

    // 2 height
    if(options.height){
      sectionZero.entry.push({
        reference: `Observation/${options.height.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.height.text.div}</td>`;
    }

    // 3 pulse rate
    if(options.pulseRate){
      sectionZero.entry.push({
        reference: `Observation/${options.pulseRate.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.pulseRate.text.div}</td>`;
    }

    docHtml += `</tr><tr>`
    //1 Bllod Pressue
    if(options.bloodPressure){
      sectionZero.entry.push({
        reference: `Observation/${options.bloodPressure.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.bloodPressure.text.div}</td>`;
    }
// 2 SPO2
    if(options.spo2){
      sectionZero.entry.push({
        reference: `Observation/${options.spo2.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.spo2.text.div}</td>`;
    }
// 3 Blood Glucose
    if(options.bloodGlucose){
      sectionZero.entry.push({
        reference: `Observation/${options.bloodGlucose.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.bloodGlucose.text.div}</td>`;
    }

  docHtml += `</tr><tr>`

  if(options.hba1c){
    sectionZero.entry.push({
      reference: `Observation/${options.hba1c.id}`,
      type: "Observation",
    });
    docHtml += `<td>${options.hba1c.text.div}</td>`;
  }

  if(options.glasgowComaScale){
    sectionZero.entry.push({
      reference: `Observation/${options.glasgowComaScale.id}`,
      type: "Observation",
    });
    docHtml += `<td>${options.glasgowComaScale.text.div}</td>`;
  }

  if(options.hb){
    sectionZero.entry.push({
      reference: `Observation/${options.hb.id}`,
      type: "Observation",
    });
    docHtml += `<td>${options.hb.text.div}</td>`;
  }

  docHtml+=`</tr>`


  // AllergyIntolerance
  if(options.allergyIntolerance){
    sectionZero.entry.push({
      reference: `AllergyIntolerance/${options.allergyIntolerance.id}`,
      type: "AllergyIntolerance",
    });
    docHtml += options.allergyIntolerance.text.div;
  }

  // chiefComplaints
  if(options.chiefComplaints){
    sectionZero.entry.push({
      reference: `Condition/${options.chiefComplaints.id}`,
      type: "Condition",
    });

    docHtml += options.chiefComplaints.text.div;
  }

  // pasthistory
  if(options.pasthistory){
    sectionZero.entry.push({
      reference: `Condition/${options.pasthistory.id}`,
      type: "Condition",
    });

    docHtml += options.pasthistory.text.div;
  }


  // medicationStatement
  if(options.medicationStatement){
    sectionZero.entry.push({
      reference: `MedicationStatement/${options.medicationStatement.id}`,
      type: "MedicationStatement",
    });

    docHtml += options.medicationRequest.text.div;

  }

  // familyHistory
  if(options.familyHistory){
    sectionZero.entry.push({
      reference: `Condition/${options.familyHistory.id}`,
      type: "Condition",
    });

    docHtml += options.familyHistory.text.div;
  }

//  medicationRequest
  if(options.medicationRequest){
    sectionZero.entry.push({
      reference: `MedicationRequest/${options.medicationRequest.id}`,
      type: "MedicationRequest",
    });

    docHtml += options.medicationRequest.text.div;
  }

    options.composition.documentDatahtml = docHtml;
    return options;
  };
}
