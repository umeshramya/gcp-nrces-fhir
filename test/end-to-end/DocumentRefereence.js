require("dotenv").config("env");
const v4 = require("uuid").v4;
const { cpSync } = require("fs");
const {
  GcpFhirCRUD,
  GcpFhirSearch,
  Encounter,
  OrganizationResource,
  PatientResource,
  Patient,
  PractitionerResource,
  EncounterResource,
  EncounterClassArray,
  EncounterStatusArray,
  Procedure,
  Condition,
  AllergyIntolerance,
  Appointment,
  DocumentBundle,
  Composition,
  Organization,
  Practitioner,
  MedicationRequest,
  PrescriptionRecord,
  OPConsultRecord,
  ResourceFactory,
  PrescriptionBundle,
  DocumentReference
} = require("gcp-nrces-fhir");
const { emptySign } = require("gcp-nrces-fhir/lib/resources/Composition");
const gcpFhirCRUD = new GcpFhirCRUD();
const { callFunction, resources } = require("./index");

const setDocimentReference = async () => {
  const documentReference = new DocumentReference();
  let res = documentReference.getFHIR({
    "docStatus" : "final",
    "patientId" :resources.patient.id,
    "pdf" : "",
    "status" : "current",
    "title" : "Angioplasty",
    "type" :{
      "coding" : [
        {
          system: "http://snomed.info/sct",
          code: "77343006",
          display: "Angiography",
        },
      ]
    }
  })
  res = await gcpFhirCRUD.createFhirResource(res, "DocumentReference");
 const ret = documentReference.convertFhirToObject(res.data);
  resources.documentReference = ret
  return ret
};

module.exports = { setDocimentReference };
