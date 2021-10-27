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

const create = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(patient, "Patient")

    console.log(res.identifier[0].type)
}

create()