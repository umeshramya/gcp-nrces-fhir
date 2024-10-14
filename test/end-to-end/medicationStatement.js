require("dotenv").config("env");
const v4 = require("uuid").v4;
const { cpSync } = require("fs");
const {
  GcpFhirCRUD,
  MedicationStatement,

} = require("gcp-nrces-fhir");

const gcpFhirCRUD = new GcpFhirCRUD();
const { callFunction, resources } = require("./index");

const setMedicationStatement = async () => {
  try {
    const medicationStatment = new MedicationStatement();
    let dosageInstruction = new Array();
    dosageInstruction.push(
      medicationStatment.createDosageInstrction({
        method: [{ display: "After Food", system: "http://snomed.info/sct" }],
        route: [{ display: "Oral", system: "http://snomed.info/sct" }],
        text: "For 5 Days",
        timing: "1-1-1",
        additionalInstruction: [
          {
            display: "watch for skin erruption",
            system: "http://snomed.info/sct",
          },
        ],
      })
    );
    let dosageObj = new Array();
    dosageObj.push(
      medicationStatment.convertDosageInstructionToObject(dosageInstruction[0])
    );

    dosageInstruction.push(
      medicationStatment.createDosageInstrction({
        method: [{ display: "Before Food", system: "http://snomed.info/sct" }],
        route: [{ display: "Oral", system: "http://snomed.info/sct" }],
        text: "For 15 Days",
        timing: "1-0-1",
        additionalInstruction: [
          {
            display: "watch for skin erruption",
            system: "http://snomed.info/sct",
          },
        ],
      })
    );
    dosageObj.push(
      medicationStatment.convertDosageInstructionToObject(dosageInstruction[1])
    );

    const body = medicationStatment.getFHIR({
      "date" : new Date().toISOString(),
      "dosage" : dosageObj,
      "informationSource": {"id": resources.patient.id, "resource" : "Patient"},
      "medicationCodeableConcept" : {"text" : "Tab Olmicip Trio"},
      "patientid" : resources.patient.id,
      "status": "active",
      "reasonCode" : [{"text" : "For Hypertension"}],
      
      

    });


    const res = await new GcpFhirCRUD().createFhirResource(
      body,
      "MedicationStatement"
    );


    const obj = medicationStatment.convertFhirToObject(res.data);

    resources.medicationStatment = obj;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setMedicationStatement };
