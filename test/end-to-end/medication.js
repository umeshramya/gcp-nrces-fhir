require('dotenv').config("env")
const v4 = require("uuid").v4
const { cpSync } = require('fs')
const { GcpFhirCRUD, GcpFhirSearch, Encounter, OrganizationResource, PatientResource, Patient, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle, Composition, Organization, Practitioner, MedicationRequest, PrescriptionRecord, OPConsultRecord, ResourceFactory, PrescriptionBundle } = require("gcp-nrces-fhir")
const { emptySign } = require('gcp-nrces-fhir/lib/resources/Composition');
const gcpFhirCRUD = new GcpFhirCRUD();
const { callFunction, resources } = require("./index")

const setMedicationRequest = async () => {
    try {

        const medicationRequest = new MedicationRequest()
        let dosageInstruction = new Array()
        dosageInstruction.push(medicationRequest.createDosageInstrction({
            "method": [{ "display": "After Food", "system": "http://snomed.info/sct" }],
            "route": [{ "display": "Oral", "system": "http://snomed.info/sct" }],
            "text": "For 5 Days",
            "timing": "1-1-1",
            "additionalInstruction": [{ "display": "watch for skin erruption", "system": "http://snomed.info/sct" }]
        }))
        let dosageObj = new Array()
        dosageObj.push(medicationRequest.convertDosageInstructionToObject(dosageInstruction[0]));

        dosageInstruction.push(medicationRequest.createDosageInstrction({
            "method": [{ "display": "Before Food", "system": "http://snomed.info/sct" }],
            "route": [{ "display": "Oral", "system": "http://snomed.info/sct" }],
            "text": "For 15 Days",
            "timing": "1-0-1",
            "additionalInstruction": [{ "display": "watch for skin erruption", "system": "http://snomed.info/sct" }]
        }))
        dosageObj.push(medicationRequest.convertDosageInstructionToObject(dosageInstruction[1]))


        const body = medicationRequest.getFHIR({
            "Practitioner": resources.practioner,
            "patient": resources.patient,
            "date": new Date().toISOString(),
            "intent": "order",
            "status": "active",
            "medicationCodeableConcept": [{ "display": "Tab Pantop 40mg", "system": "http://snomed.info/sct" }, { "display": "Tab DOLO 650mg", "system": "http://snomed.info/sct" }],
            "reasonCode": [{ "display": "LRTI", "system": "http://snomed.info/sct" }],
            "DOSAGE_INSTRUCTION": dosageObj

        })


        const res = await new GcpFhirCRUD().createFhirResource(body, "MedicationRequest");
        const obj = medicationRequest.convertFhirToObject(res.data)

        resources.medicationsRequest = obj

    } catch (error) {
        console.log(error)
    }

}



module.exports = { setMedicationRequest }