require('dotenv').config("env")
const { GcpFhirCRUD, GcpFhirSearch, OrganizationResource, PatientResource, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle } = require("gcp-nrces-fhir")

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
    const res = await gcpFhirSearch.searchFhirResourcesGet("Encounter", [{ "key": "subject", "value": "Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5" },
    { "key": "status", "value": "cancelled,finished" }
    ])
    console.log(res.data.entry)
}

// search()

// console.log(EncounterStatusArray.map(el=>{
//     return el
// }))




// const getdata = async () => {
//     const gcpFhirCRUD = new GcpFhirCRUD(,)
//     const res = await gcpFhirCRUD.getFhirResource("8c2f7c57-cfba-417c-a574-36c6e76d29c5", "Patient").then(res => res
//     return res,
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


// procedure

const procedure = new Procedure()
const createProceure = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(procedure.getFHIR({
        "patientID": "8c2f7c57-cfba-417c-a574-36c6e76d29c5",
        "procedure": [{ "display": "Coronary stenting", "system": "http://snomed.info/sct" }],
        "procedureDate": "2021-11-03T15:32:26.605+05:30",
        "status": "in-progress",
        "text": "Coronary stenting",
        "complication": [{ "display": "bleeding", "system": "http://snomed.info/sct" }],
    }), "Procedure")


    // 

    console.log(res)
}



// createProceure()


const getProcedure = async () => {
    let id = "87555651-bb59-4d3b-8cc5-b5e73cf2599c";
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "Procedure")
    const data = res.data

    const obj = procedure.convertFhirToObject(data)

    console.log(obj)

}

// getProcedure()



// Condtion

const condition = new Condition()
const createCondition = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(condition.getFHIR({
        "condtion": [{ "display": "Chest Pain", "system": "http://snomed.info/sct" }],
        "patientId": "8c2f7c57-cfba-417c-a574-36c6e76d29c5",
        "text": "Chest Pain for Evaluvation"
    }), "Condition")


    // 80cde551-455e-4e7d-8190-02296903aebf

    console.log(res)
}

// createCondition()


const getCondtiopn = async () => {
    const id = "80cde551-455e-4e7d-8190-02296903aebf"
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "Condition")
    const data = res.data

    const obj = condition.convertFhirToObject(data)

    console.log(obj)

}


// getCondtiopn()

// AllergyIntolrence

const allergyIntolerance = new AllergyIntolerance()

const createAllergyIntolerance = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const body = allergyIntolerance.getFHIR({
        "allergyIntolerance": [{ "display": "Asprin" }],
        "clinicalStatus": "active",
        "verificationStatus": "unconfirmed",
        "date": new Date().toISOString(),
        "note": [{ "text": "patient developed rash" }],
        "patientId": "8c2f7c57-cfba-417c-a574-36c6e76d29c5",
        "practitionerId": "877f1236-63fd-4827-a3da-636a4f2c5739",
        "text": "Allergic to Asprin"
    })

    const res = await gcpFhirCRUD.createFhirResource(body, "AllergyIntolerance")


    // e7f1d6ad-34e7-41d5-b1f5-ba45024be438

    console.log(res)
}

// createAllergyIntolerance()


const getAllergyIntolerance = async () => {
    const id = "e7f1d6ad-34e7-41d5-b1f5-ba45024be438"
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "AllergyIntolerance")
    // console.log(res)
    const data = res.data;

    const ret = allergyIntolerance.convertFhirToObject(data)
    console.log(ret)
}

// getAllergyIntolerance()


// Appointment
const appointment = new Appointment();
const createAppointment = async () => {
    const body = appointment.getFHIR({
        "patientId": "8c2f7c57-cfba-417c-a574-36c6e76d29c5",
        "practitionerId": "877f1236-63fd-4827-a3da-636a4f2c5739",
        "practitionerStatus": "accepted",
        "patientStatus": "accepted",
        "reasonReferenceConditionId": "80cde551-455e-4e7d-8190-02296903aebf",
        "serviceCategory": [{ "display": "Consultation", "system": "http://snomed.info/sct" }],
        "serviceType": [{ "display": "Consulataion", "system": "http://snomed.info/sct" }],
        "appointmentType": [{ "display": "consulaltion", "system": "http://snomed.info/sct" }],
        "status": "booked",
        "text": "Apponiment",
        "startDate": new Date().toISOString(),
        "endDate": new Date().toISOString(),
        "createdDate": new Date().toISOString()
    })
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(body, "Appointment")
    // cd33d0e1-62b3-4589-95bf-bb75b498ae88
    console.log(res)
}


// createAppointment()

const getAppontment = async () => {
    const id = "cd33d0e1-62b3-4589-95bf-bb75b498ae88"
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "Appointment")
    // console.log(res)
    const data = res.data;
    console.log(data)
    const ret = appointment.convertFhirToObject(data)
    console.log(ret)
}


// getAppontment();


// DocumentBundle
const  documentBundle= new DocumentBundle()

const createDocumentBumdle = async()=>{
    const body = documentBundle.getFHIR({
        "date" : new Date().toISOString(),
        "practitionerId": "877f1236-63fd-4827-a3da-636a4f2c5739",
        "signJpegbase64" : "",
        "entry" : []

    })


    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(body, "Bundle")
    console.log(res)

    // d563a017-2ee7-4af8-a36d-77f19987745e

}


// createDocumentBumdle()

const getDocumentBundle = async ()=>{
    const  id = "d563a017-2ee7-4af8-a36d-77f19987745e"
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await  gcpFhirCRUD.getFhirResource(id, "Bundle");
    const data = documentBundle.convertFhirToObject(res.data);
    console.log(data)

}

getDocumentBundle();