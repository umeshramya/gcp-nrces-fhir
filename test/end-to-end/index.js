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

/**
 * creates orgatniztion,
 * gets it convert it to object 
 * assign to resourceIds
 */
const setOrganization = async () => {
    const organization = new Organization()
    const body = organization.getFHIR({
        "email": "jjhhubli@gmail.com",
        "name": "Jeevan jyotoi hospital",
        "ndhmFacilityNumber": "JJH_123",
        "phone": "08362260624",
        "providerNumber": "123",
    });
    let res = await gcpFhirCRUD.createFhirResource(body, "Organization")
    res = await gcpFhirCRUD.getFhirResource(res.data.id, "Organization");
    const data = organization.convertFhirToObject(res.data)
    //   console.log(data)
  resourceIds.organizarionId=data.id;
  
}

/**
 * creates Patient,
 * gets it convert it to object 
 * assign to resourceIds
 */
const setPatient = async () => {
    const patient = new Patient();
    const body = patient.getFHIR({
        "name": "UMESH R BILAGI New",
        "gender": "Male",
        "mobile": "9343403620",
        "healthNumber": "23-3457-234",
        "dob": "1969-09-29",
        "MRN": "5002",
        "organizationId": resourceIds.organizarionId,
        "internalId" : "156141",
    })

    let res = await gcpFhirCRUD.createFhirResource(body, "Patient")
    res = await gcpFhirCRUD.getFhirResource(res.data.id, "Patient");
    const data = patient.convertFhirToObject(res.data);
    //   console.log(data);
    resourceIds.patientId = data.id;

}

/**
 * creates Practioner,
 * gets it convert it to object 
 * assign to resourceIds
 */
const setPractinioner = async () => {
    const practitioner = new Practitioner()
    const body = practitioner.getFHIR({
        "medicalLicenseNumber": "KMC 35167",
        "name": "Dr Umesh R Bilagi",
        "ndhmProfessionalId": "123456",
        "qualification": "MD DM Cardiology"
    })

    let res = await gcpFhirCRUD.createFhirResource(body, "Practitioner")
    res = await gcpFhirCRUD.getFhirResource(res.data.id, "Practitioner");
    const data = practitioner.convertFhirToObject(res.data)
    //   console.log(data);
    resourceIds.practionerId= data.id

}

const callFunction =async()=>{
    await setOrganization();
    await setPatient();
    await setPractinioner();
    console.log(resourceIds);
}

callFunction();


module.exports = { callFunction, resourceIds};

