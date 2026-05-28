import { TimeZone } from "../../TimeZone";
import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { DOCUMENT_REFERENCE } from "../DocumentReference";

interface Args {
  composition: COMPOSITOIN;
  // Vital Signs
  systolicBP?: any;
  diastolicBP?: any;
  heartRate?: any;
  respiratoryRate?: any;
  spo2?: any;
  bodyTemperature?: any;
  // Body Measurement
  height?: any;
  weight?: any;
  bmi?: any;
  waistCircumference?: any;
  // General Assessment
  bloodGlucose?: any;
  hba1c?: any;
  hemoglobin?: any;
  bodyFat?: any;
  fluidIntake?: any;
  calorieIntake?: any;
  // Women Health
  ageAtMenarche?: any;
  lastMenstrualPeriod?: any;
  // Lifestyle
  dietType?: any;
  tobaccoUse?: any;
  alcoholUse?: any;
  physicalActivityLevel?: any;
  // Document Reference
  documentReference?: DOCUMENT_REFERENCE[];
}

export class WellnessRecordComp extends Composition implements Records {
  create = async (options: Args, Credentials?: any, DatabasePath?: any) => {
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    let gcpFhirCrud: GcpFhirCRUD;
    if (Credentials) {
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath);
    } else {
      gcpFhirCrud = new GcpFhirCRUD();
    }
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };

  update = async (options: Args, Credentials?: any, DatabasePath?: any) => {
    if (!options.composition.id) {
      throw new Error("id of composition is required");
    }
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    let gcpFhirCrud: GcpFhirCRUD;
    if (Credentials) {
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath);
    } else {
      gcpFhirCrud = new GcpFhirCRUD();
    }
    const res = await gcpFhirCrud.updateFhirResource(
      body,
      options.composition.id || "",
      "Composition"
    );
    return res;
  };

  getOptions = async (options: Args): Promise<Args> => {
    let docHtml = `<h3 style="text-align: center;">Wellness Record</h3>`;

    const sections: any[] = [];

    // Section: Vital Signs
    const vitalSignsEntry: any[] = [];
    let hasVitalSigns = false;
    let vsHtml = `<p><b>Vital Signs</b></p>`;
    vsHtml += `<table style="border-collapse: collapse; width: 100%;" border="1"><tr>`;

    if (options.systolicBP) {
      hasVitalSigns = true;
      vitalSignsEntry.push({ reference: `Observation/${options.systolicBP.id}`, type: "Observation" });
      vsHtml += `<td>${options.systolicBP.text.div}</td>`;
    }
    if (options.diastolicBP) {
      hasVitalSigns = true;
      vitalSignsEntry.push({ reference: `Observation/${options.diastolicBP.id}`, type: "Observation" });
      vsHtml += `<td>${options.diastolicBP.text.div}</td>`;
    }
    if (options.heartRate) {
      hasVitalSigns = true;
      vitalSignsEntry.push({ reference: `Observation/${options.heartRate.id}`, type: "Observation" });
      vsHtml += `<td>${options.heartRate.text.div}</td>`;
    }
    if (options.respiratoryRate) {
      hasVitalSigns = true;
      vitalSignsEntry.push({ reference: `Observation/${options.respiratoryRate.id}`, type: "Observation" });
      vsHtml += `<td>${options.respiratoryRate.text.div}</td>`;
    }
    if (options.spo2) {
      hasVitalSigns = true;
      vitalSignsEntry.push({ reference: `Observation/${options.spo2.id}`, type: "Observation" });
      vsHtml += `<td>${options.spo2.text.div}</td>`;
    }
    if (options.bodyTemperature) {
      hasVitalSigns = true;
      vitalSignsEntry.push({ reference: `Observation/${options.bodyTemperature.id}`, type: "Observation" });
      vsHtml += `<td>${options.bodyTemperature.text.div}</td>`;
    }

    vsHtml += `</tr></table>`;

    if (hasVitalSigns) {
      docHtml += vsHtml;
      sections.push({
        title: "Vital Signs",
        code: {
          coding: [{ system: "http://snomed.info/sct", code: "371530004", display: "Vital Signs" }],
        },
        entry: vitalSignsEntry,
      });
    }

    // Section: Body Measurement
    const bodyMeasurementEntry: any[] = [];
    let hasBodyMeasurement = false;
    let bmHtml = `<p><b>Body Measurement</b></p>`;
    bmHtml += `<table style="border-collapse: collapse; width: 100%;" border="1"><tr>`;

    if (options.height) {
      hasBodyMeasurement = true;
      bodyMeasurementEntry.push({ reference: `Observation/${options.height.id}`, type: "Observation" });
      bmHtml += `<td>${options.height.text.div}</td>`;
    }
    if (options.weight) {
      hasBodyMeasurement = true;
      bodyMeasurementEntry.push({ reference: `Observation/${options.weight.id}`, type: "Observation" });
      bmHtml += `<td>${options.weight.text.div}</td>`;
    }
    if (options.bmi) {
      hasBodyMeasurement = true;
      bodyMeasurementEntry.push({ reference: `Observation/${options.bmi.id}`, type: "Observation" });
      bmHtml += `<td>${options.bmi.text.div}</td>`;
    }
    if (options.waistCircumference) {
      hasBodyMeasurement = true;
      bodyMeasurementEntry.push({ reference: `Observation/${options.waistCircumference.id}`, type: "Observation" });
      bmHtml += `<td>${options.waistCircumference.text.div}</td>`;
    }

    bmHtml += `</tr></table>`;

    if (hasBodyMeasurement) {
      docHtml += bmHtml;
      sections.push({
        title: "Body Measurement",
        code: {
          coding: [{ system: "http://snomed.info/sct", code: "371530004", display: "Body Measurement" }],
        },
        entry: bodyMeasurementEntry,
      });
    }

    // Section: General Assessment
    const generalAssessmentEntry: any[] = [];
    let hasGeneralAssessment = false;
    let gaHtml = `<p><b>General Assessment</b></p>`;
    gaHtml += `<table style="border-collapse: collapse; width: 100%;" border="1"><tr>`;

    if (options.bloodGlucose) {
      hasGeneralAssessment = true;
      generalAssessmentEntry.push({ reference: `Observation/${options.bloodGlucose.id}`, type: "Observation" });
      gaHtml += `<td>${options.bloodGlucose.text.div}</td>`;
    }
    if (options.hba1c) {
      hasGeneralAssessment = true;
      generalAssessmentEntry.push({ reference: `Observation/${options.hba1c.id}`, type: "Observation" });
      gaHtml += `<td>${options.hba1c.text.div}</td>`;
    }
    if (options.hemoglobin) {
      hasGeneralAssessment = true;
      generalAssessmentEntry.push({ reference: `Observation/${options.hemoglobin.id}`, type: "Observation" });
      gaHtml += `<td>${options.hemoglobin.text.div}</td>`;
    }
    if (options.bodyFat) {
      hasGeneralAssessment = true;
      generalAssessmentEntry.push({ reference: `Observation/${options.bodyFat.id}`, type: "Observation" });
      gaHtml += `<td>${options.bodyFat.text.div}</td>`;
    }
    if (options.fluidIntake) {
      hasGeneralAssessment = true;
      generalAssessmentEntry.push({ reference: `Observation/${options.fluidIntake.id}`, type: "Observation" });
      gaHtml += `<td>${options.fluidIntake.text.div}</td>`;
    }
    if (options.calorieIntake) {
      hasGeneralAssessment = true;
      generalAssessmentEntry.push({ reference: `Observation/${options.calorieIntake.id}`, type: "Observation" });
      gaHtml += `<td>${options.calorieIntake.text.div}</td>`;
    }

    gaHtml += `</tr></table>`;

    if (hasGeneralAssessment) {
      docHtml += gaHtml;
      sections.push({
        title: "General Assessment",
        code: {
          coding: [{ system: "http://snomed.info/sct", code: "371530004", display: "General Assessment" }],
        },
        entry: generalAssessmentEntry,
      });
    }

    // Section: Women Health
    const womenHealthEntry: any[] = [];
    let hasWomenHealth = false;
    let whHtml = `<p><b>Women Health</b></p>`;
    whHtml += `<table style="border-collapse: collapse; width: 100%;" border="1"><tr>`;

    if (options.ageAtMenarche) {
      hasWomenHealth = true;
      womenHealthEntry.push({ reference: `Observation/${options.ageAtMenarche.id}`, type: "Observation" });
      whHtml += `<td>${options.ageAtMenarche.text.div}</td>`;
    }
    if (options.lastMenstrualPeriod) {
      hasWomenHealth = true;
      womenHealthEntry.push({ reference: `Observation/${options.lastMenstrualPeriod.id}`, type: "Observation" });
      whHtml += `<td>${options.lastMenstrualPeriod.text.div}</td>`;
    }

    whHtml += `</tr></table>`;

    if (hasWomenHealth) {
      docHtml += whHtml;
      sections.push({
        title: "Women Health",
        code: {
          coding: [{ system: "http://snomed.info/sct", code: "371530004", display: "Women Health" }],
        },
        entry: womenHealthEntry,
      });
    }

    // Section: Lifestyle
    const lifestyleEntry: any[] = [];
    let hasLifestyle = false;
    let lsHtml = `<p><b>Lifestyle</b></p>`;
    lsHtml += `<table style="border-collapse: collapse; width: 100%;" border="1"><tr>`;

    if (options.dietType) {
      hasLifestyle = true;
      lifestyleEntry.push({ reference: `Observation/${options.dietType.id}`, type: "Observation" });
      lsHtml += `<td>${options.dietType.text.div}</td>`;
    }
    if (options.tobaccoUse) {
      hasLifestyle = true;
      lifestyleEntry.push({ reference: `Observation/${options.tobaccoUse.id}`, type: "Observation" });
      lsHtml += `<td>${options.tobaccoUse.text.div}</td>`;
    }
    if (options.alcoholUse) {
      hasLifestyle = true;
      lifestyleEntry.push({ reference: `Observation/${options.alcoholUse.id}`, type: "Observation" });
      lsHtml += `<td>${options.alcoholUse.text.div}</td>`;
    }
    if (options.physicalActivityLevel) {
      hasLifestyle = true;
      lifestyleEntry.push({ reference: `Observation/${options.physicalActivityLevel.id}`, type: "Observation" });
      lsHtml += `<td>${options.physicalActivityLevel.text.div}</td>`;
    }

    lsHtml += `</tr></table>`;

    if (hasLifestyle) {
      docHtml += lsHtml;
      sections.push({
        title: "Lifestyle",
        code: {
          coding: [{ system: "http://snomed.info/sct", code: "371530004", display: "Lifestyle" }],
        },
        entry: lifestyleEntry,
      });
    }

    // Section: Document Reference
    const docRefEntry: any[] = [];
    if (options.documentReference && options.documentReference.length > 0) {
      options.documentReference.forEach((dr) => {
        docRefEntry.push({
          reference: `DocumentReference/${dr.id}`,
          type: "DocumentReference",
        });
      });
      sections.push({
        title: "Document Reference",
        code: {
          coding: [{ system: "http://snomed.info/sct", code: "371530004", display: "Document Reference" }],
        },
        entry: docRefEntry,
      });
    }

    options.composition.section = sections;
    options.composition.documentDatahtml = docHtml;
    return options;
  };
}
