require('dotenv').config("env")
const v4 = require("uuid").v4
const { cpSync } = require('fs')
const { GcpFhirCRUD, GcpFhirSearch, Encounter, OrganizationResource, PatientResource, Patient, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle, Composition, Organization, Practitioner, MedicationRequest, PrescriptionRecord, OPConsultRecord, ResourceFactory, PrescriptionBundle } = require("gcp-nrces-fhir")
const { emptySign } = require('gcp-nrces-fhir/lib/resources/Composition');
const gcpFhirCRUD = new GcpFhirCRUD();

const resourceIds = {
    organizarionId : null,
    patientId : null,
    practionerId: null,
    encounterId:null,
    conditonId:null,
    medicationsRequestId:null
};

const organization = new Organization()
const createOrganization = async () => {
  const body = organization.getFHIR({
    "email": "jjhhubli@gmail.com",
    "name": "Jeevan jyotoi hospital",
    "ndhmFacilityNumber": "JJH_123",
    "phone": "08362260624",
    "providerNumber": "123",
  })

  const res = await gcpFhirCRUD.createFhirResource(body, "Organization")
  console.log(res.data)

}

createOrganization();
