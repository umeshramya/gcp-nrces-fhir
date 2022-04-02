require('dotenv').config("env")
const v4 = require("uuid").v4
const { cpSync } = require('fs')
const { GcpFhirCRUD, GcpFhirSearch, Encounter, OrganizationResource, PatientResource, Patient, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle, Composition, Organization, Practitioner, MedicationRequest, PrescriptionRecord, OPConsultRecord, ResourceFactory, PrescriptionBundle, ServiceRequest } = require("gcp-nrces-fhir")
const { emptySign } = require('gcp-nrces-fhir/lib/resources/Composition');
const gcpFhirCRUD = new GcpFhirCRUD();

const resources = {
    organizarion: null,
    patient: null,
    practioner: null,
    encounter: null,
    conditon: null,
    medicationsRequest: null,
    serviceRequest : null
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
    resources.organizarion = organization.convertFhirToObject(res.data)



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
        "organizationId": resources.organizarion.id,
        "internalId": "156141",
    })

    let res = await gcpFhirCRUD.createFhirResource(body, "Patient")
    res = await gcpFhirCRUD.getFhirResource(res.data.id, "Patient");
    resources.patient = patient.convertFhirToObject(res.data);



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
    resources.practioner = practitioner.convertFhirToObject(res.data)


}


const setEncounter = async () => {
    const encounter = new Encounter();
    const body = encounter.getFHIR({
        "class": { "code": "IMP", "display": "in-patient" },
        "dischargeDisposition": { "code": "home", "display": "home" },
        "endDate": new Date().toISOString(),
        "startDate": new Date().toISOString(),
        "identifier": new Date().getTime().toString(),
        "patientId": resources.patient.id,
        "text": "discherged Home",
        "status": "finished"
    })

    let res = await gcpFhirCRUD.createFhirResource(body, "Encounter");
    res = await gcpFhirCRUD.getFhirResource(res.data.id, "Encounter");
    resources.encounter = encounter.convertFhirToObject(res.data);

}



const callFunction = async () => {
    await setOrganization();
    await setPatient();
    await setPractinioner();
    await setEncounter();
}




module.exports = { callFunction, resources };

