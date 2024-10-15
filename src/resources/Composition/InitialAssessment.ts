import { TimeZone } from "../../TimeZone";
import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { resourceType } from "../../config";
import { ENCOUNTER } from "../Encounter";

interface Args {
  composition: COMPOSITOIN;
  medicationRequest?: any;
  presentingProblems?:any
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
  encounter:ENCOUNTER
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

    let docHtml = `<div style="text-align:center;">
    <h2>Initial Assessment</h2></div>`;
    
  let encounterOPIONumber = "";
  if (options.encounter && options.encounter.extension) {
    encounterOPIONumber = options.encounter.extension.find(el => el.url == "https://nicehms.com/OPD" || el.url == "https://nicehms.com/IPD")?.valueString || "";
  }
  
  docHtml += `<div style="text-align:center;"><h5>${options.encounter.text}${encounterOPIONumber}</h5>
  </div>`;

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

    
    docHtml += `<table data-pdfmake="{'widths':['32%','32%','32%']}"><tr>`
    //1 weight
    if(options.weight){
      sectionZero.entry.push({
        reference: `Observation/${options.weight.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.weight.text.div}</td>`;
    }else{
      docHtml += `<td></td>`
    }

    // 2 height
    if(options.height){
      sectionZero.entry.push({
        reference: `Observation/${options.height.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.height.text.div}</td>`;
    }else{
      docHtml += `<td></td>`
    }

    // 3 pulse rate
    if(options.pulseRate){
      sectionZero.entry.push({
        reference: `Observation/${options.pulseRate.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.pulseRate.text.div}</td>`;
    }else{
      docHtml += `<td></td>`
    }

    docHtml += `</tr><tr>`
    //1 Bllod Pressue
    if(options.bloodPressure){
      sectionZero.entry.push({
        reference: `Observation/${options.bloodPressure.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.bloodPressure.text.div}</td>`;
    }else{
      docHtml += `<td></td>`
    }
// 2 SPO2
    if(options.spo2){
      sectionZero.entry.push({
        reference: `Observation/${options.spo2.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.spo2.text.div}</td>`;
    }else{
      docHtml += `<td></td>`
    }
// 3 Blood Glucose
    if(options.bloodGlucose){
      sectionZero.entry.push({
        reference: `Observation/${options.bloodGlucose.id}`,
        type: "Observation",
      });
      docHtml += `<td>${options.bloodGlucose.text.div}</td>`;
    }else{
      docHtml += `<td></td>`
    }

  docHtml += `</tr><tr>`

  if(options.hba1c){
    sectionZero.entry.push({
      reference: `Observation/${options.hba1c.id}`,
      type: "Observation",
    });
    docHtml += `<td>${options.hba1c.text.div}</td>`;
  }else{
    docHtml += `<td></td>`
  }

  if(options.glasgowComaScale){
    sectionZero.entry.push({
      reference: `Observation/${options.glasgowComaScale.id}`,
      type: "Observation",
    });
    docHtml += `<td>${options.glasgowComaScale.text.div}</td>`;
  }else{
    docHtml += `<td></td>`
  }

  if(options.hb){
    sectionZero.entry.push({
      reference: `Observation/${options.hb.id}`,
      type: "Observation",
    });
    docHtml += `<td>${options.hb.text.div}</td>`;
  }else{
    docHtml += `<td></td>`
  }

  docHtml+=`</tr></table>`


  // AllergyIntolerance
  if(options.allergyIntolerance){
    sectionZero.entry.push({
      reference: `AllergyIntolerance/${options.allergyIntolerance.id}`,
      type: "AllergyIntolerance",
    });

    docHtml += `<h4>Allergy Intolerance</h4>`;
    docHtml += options.allergyIntolerance.text.div;
  }


    // presentingProblems
    if(options.presentingProblems){
      sectionZero.entry.push({
        reference: `Condition/${options.presentingProblems.id}`,
        type: "Condition",
      });
  
      docHtml += `<h4>Presenting Problems</h4>`;
      docHtml += options.presentingProblems.text.div;
    }
  
  

  // chiefComplaints
  if(options.chiefComplaints){
    sectionZero.entry.push({
      reference: `Condition/${options.chiefComplaints.id}`,
      type: "Condition",
    });

    docHtml += `<h4>Chief Complaints</h4>`;
    docHtml += options.chiefComplaints.text.div;
  }


  if(options.histroryOfPrsentingIllness){
    sectionZero.entry.push({
      reference: `Condition/${options.histroryOfPrsentingIllness.id}`,
      type: "Condition",
    });

    docHtml += `<h4>History of Presenting Illness</h4>`;

    docHtml += options.histroryOfPrsentingIllness.text.div;
  }

  // pasthistory
  if(options.pasthistory){
    sectionZero.entry.push({
      reference: `Condition/${options.pasthistory.id}`,
      type: "Condition",
    });

    docHtml += `<h4>Past History</h4>`;

    docHtml += options.pasthistory.text.div;
  }


  // medicationStatement
  if(options.medicationStatement){
    sectionZero.entry.push({
      reference: `MedicationStatement/${options.medicationStatement.id}`,
      type: "MedicationStatement",
    });

    docHtml += `<h4>Current Medications</h4>`;
    docHtml += options.medicationRequest.text.div;

  }

  // familyHistory
  if(options.familyHistory){
    sectionZero.entry.push({
      reference: `Condition/${options.familyHistory.id}`,
      type: "Condition",
    });

    docHtml +=`<h4>Family History</h4>`
    docHtml += options.familyHistory.text.div;
  }

//  medicationRequest
  if(options.medicationRequest){
    sectionZero.entry.push({
      reference: `MedicationRequest/${options.medicationRequest.id}`,
      type: "MedicationRequest",
    });
    docHtml += `<h4>Advise Medicines</h4>`
    docHtml += options.medicationRequest.text.div;
  }

    options.composition.documentDatahtml = docHtml;
    options.composition.section.push(sectionZero);
    return options;
  };
}
