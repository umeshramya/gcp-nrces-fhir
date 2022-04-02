require('dotenv').config("env")
const v4 = require("uuid").v4
const { cpSync } = require('fs')
const { GcpFhirCRUD, GcpFhirSearch, Encounter, OrganizationResource, PatientResource, Patient, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle, Composition, Organization, Practitioner, MedicationRequest, PrescriptionRecord, OPConsultRecord, ResourceFactory, PrescriptionBundle } = require("gcp-nrces-fhir")
const { emptySign } = require('gcp-nrces-fhir/lib/resources/Composition');
const gcpFhirCRUD = new GcpFhirCRUD();
const { callFunction, resources } = require("./index")


const setCondition = async () => {
const condition = new Condition();
let res = condition.getFHIR({
    "condtion" : [{"display" :"Chest Pain", "system" : "http://snomed.info/sct"}],
    "patientId" : resources.patient.id,
    "text" : "Chest pain for evaluvation",
    "title":  "Chest pain",
})
    res = await gcpFhirCRUD.createFhirResource(res, "Condition")
 
    resources.conditon = condition.convertFhirToObject(res.data);
  
  
  }


module.exports= {setCondition}