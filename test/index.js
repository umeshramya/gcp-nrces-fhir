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
    // console.log(res.identifier[0].type)

    // const res = await gcpFhirCRUD.createFhirResource(Practitioner, "Practitioner")
    // console.log(res)

    // const res = await gcpFhirCRUD.getFhirResource("e6f1d2f4-d164-4549-a74d-01683cbc09c6", "Practitioner")
    // const pract = PractitionerResource({
    //     "id" : "e6f1d2f4-d164-4549-a74d-01683cbc09c6",
    //     "name": "DR Umesh R Bilagi",
    //     "qualification": "MBBS MD DM cardiology",
    //     "medicalLicenseNumber": "KMC 35167",
    //     "ndhmProfessionalId": "12234"
    //     })
    // const res = await gcpFhirCRUD.updateFhirResource(pract, "e6f1d2f4-d164-4549-a74d-01683cbc09c6", "Practitioner")

    console.log(res)
}



create()




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