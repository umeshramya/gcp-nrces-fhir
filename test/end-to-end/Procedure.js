const { Procedure } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD} = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setProcedure = async() => {
    console.log(resources.practioner)
    const body = new Procedure().getFHIR({
        "performer" : resources.practioner,
        "complication" : "Bleeding from site",
        "patientID" : resources.patient.id,
        "procedure" : {"text" : "PTCA to LAD"},
        "outcome" : {"text" : "Transe femoral route"},
        "encounterId" : resources.encounter.id,
        "procedureDate" : new Date().toISOString(),
        "status" : "in-progress",
        "text" : "<div>Umesh Did this proceduer</div>"

    })

    console.log(body)
    const res = await gcpFhirCRUD.createFhirResource(body, "Specimen")
    const ret = specimen.convertFhirToObject(res.data)
    return ret;

}


module.exports= {setProcedure}