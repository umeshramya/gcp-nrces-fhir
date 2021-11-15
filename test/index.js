require('dotenv').config("env")
const { GcpFhirCRUD, GcpFhirSearch , OrganizationResource, PatientResource, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray } = require("gcp-nrces-fhir")

const organization = OrganizationResource({
    "email": "jjhhubli@gmail.com",
    "name": "JJH",
    "ndhmFacilityNumber": "JJH_123",
    "phone": "08362260624",
    "providerNumber": "123"
})


const createOrganization = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(organization, "Organization")
    console.log(res)
}

// createOrganization()
id = "a15a0e31-3b72-4d48-bae8-c3000c97786f"

const patient = PatientResource({
    "name": "UMESH R BILAGI",
    "gender": "Male",
    "mobile": "9343403620",
    "healthNumber": "23-3457-234",
    "dob": "1969-09-29",
    "MRN": "2345",
    "organizationId": "a15a0e31-3b72-4d48-bae8-c3000c97786f"

})

const createPatient = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(patient, "Patient")
    console.log(res)
}
// createPatient()

const Practitioner = PractitionerResource({
    "name": "DR Umesh R Bilagi",
    "qualification": "MD DM cardiology",
    "medicalLicenseNumber": "KMC 35167",
    "ndhmProfessionalId": "",
    "organizationId": "a15a0e31-3b72-4d48-bae8-c3000c97786f"
})

const createPractinioner = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(Practitioner, "Practitioner")
    console.log(res)
}

// createPractinioner()

const search = async () => {
    const gcpFhirSearch = new GcpFhirSearch()
    const res = await gcpFhirSearch.searchFhirResourcesGet("Encounter", [{"key" : "subject", "value" : "Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5"}])
    console.log(res.data.entry)
}

// search()

console.log(EncounterStatusArray.map(el=>{
    return el
}))




// const getdata = async () => {
//     const gcpFhirCRUD = new GcpFhirCRUD()
//     const res = await gcpFhirCRUD.getFhirResource("8c2f7c57-cfba-417c-a574-36c6e76d29c5", "Patient").then(res => res
//     return res
// }

// const getdata = async () => {
//     const gcpFhirCRUD = new GcpFhirCRUD();
//     const res = await gcpFhirCRUD.getFhirResource("8c2f7c57-cfba-417c-a574-36c6e76d29c5", "Patient")

//     console.log(res.data)
// }


// const enCounter = EncounterResource({
//     "class": { "code": "IMP", "display": "in-patient" },
//     "dischargeDisposition": { "code": "home", "display": "home" },
//     "endDate": "2021-11-06T15:32:26.605+05:30",
//     "startDate": "2021-11-03T15:32:26.605+05:30",
//     "identifier": new Date().getTime().toString(),
//     "patientId": "8c2f7c57-cfba-417c-a574-36c6e76d29c5",
//     "text": "discherged Home",
//     "status": "finished"
// })

// const createEncounter = async () => {
//     const gcpFhirCRUD = new GcpFhirCRUD();
//     const res = await gcpFhirCRUD.createFhirResource(enCounter, "Encounter")
//     console.log(res)
// }

// createEncounter()

// getdata();



// create()


// 8c2f7c57-cfba-417c-a574-36c6e76d29c5








// {"resourceType":"Encounter","meta":{"lastUpdated":"2020-07-09T14:58:58.181+05:30","profile":["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter"]},"text":{"status":"generated","div":"<div xmlns=\\"http://www.w3.org/1999/xhtml\\"> Admitted to Cardiac Unit,UVW Hospital between June 28 and July 
// 9 2020</div>"},"identifier":[{"system":"https://ndhm.in","value":"S100"}],"status":"finished","class":{"system":"http://terminology.hl7.org/CodeSystem/v3-ActCode","code":"IMP","display":"inpatient encounter"},"subject":{"reference":"Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5"},"period":{"start":"2020-04-20T15:32:26.605+05:30","end":"2020-05-01T15:32:26.605+05:30"},"hospitalization":{"dischargeDisposition":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/discharge-disposition","code":"home","display":"Home"}],"text":"Discharged to Home Care"}}}'



// {"resourceType":"Encounter","meta":{"lastUpdated":"2020-07-09T14:58:58.181+05:30","profile":["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter"]},"text":{"status":"generated","div":"<div xmlns=\\"http://www.w3.org/1999/xhtml\\">{discherged Home </div>"},"identifier":[{"system":"https://ndhm.in","value":"1636210865014"}],"status":"finished","class":{"system":"http://terminology.hl7.org/CodeSystem/v3-ActCode","code":"IMP","display":"in-patient"},"subject":{"reference":"Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5}"},"period":{"start":"2021-11-03T15:32:26.605+05:30","end":"2021-11-06T15:32:26.605+05:30"},"hospitalization":{"dischargeDisposition":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/discharge-disposition","code":"home","display":"home"}],"text":"Discharged to Home Care"}}}