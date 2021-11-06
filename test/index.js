require('dotenv').config("env")
const { GcpFhirCRUD, PatientResource, PractitionerResource } = require("gcp-nrces-fhir")

const patient = PatientResource({
    "age": "52 years",
    "name": "UMESH R BILAGI",
    "gender": "Male",
    "mobile": "9343403620",
    "healthNumber": "23-3457-234",
    "dob": "1969-09-29",
    "MRN": "2345"

})

const Practitioner = PractitionerResource({
    "name": "DR Umesh R Bilagi",
    "qualification": "MD DM cardiology",
    "medicalLicenseNumber": "KMC 35167",
    "ndhmProfessionalId": ""
})

const create = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(patient, "Patient")

    console.log(res)
}

// const getdata = async () => {
//     const gcpFhirCRUD = new GcpFhirCRUD()
//     const res = await gcpFhirCRUD.getFhirResource("8c2f7c57-cfba-417c-a574-36c6e76d29c5", "Patient").then(res => res
//     return res
// }

const getdata = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource("8c2f7c57-cfba-417c-a574-36c6e76d29c5", "Patient")

    console.log(res.data)
}


getdata();



// create()


// 8c2f7c57-cfba-417c-a574-36c6e76d29c5



// {
//     id: 'e6f1d2f4-d164-4549-a74d-01683cbc09c6',
//     identifier: [
//       { system: 'https://doctor.ndhm.gov.in', type: [Object], value: '' }
//     ],
//     meta: {
//       lastUpdated: '2021-10-27T14:24:39.192327+00:00',
//       profile: [
//         'https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner'
//       ],
//       versionId: 'MTYzNTM0NDY3OTE5MjMyNzAwMA'
//     },
//     name: [ { text: 'DR Umesh R Bilagi' } ],
//     resourceType: 'Practitioner',
//     text: {
//       div: '<div xmlns="http://www.w3.org/1999/xhtml">DR Umesh R Bilagi, MD DM cardiology)</div>',
//       status: 'generated'
//     }
//   }