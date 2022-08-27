const { Procedure } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD} = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setProcedure = async() => {
    const proceduer = new Procedure()
    const body =proceduer.getFHIR({
        "performer" : resources.practioner,
        "complication" : "Bleeding from site",
        "patientID" : resources.patient.id,
        "procedure" : {"text" : "PTCA to LAD"},
        "outcome" : {"text" : "Transe femoral route"},
        "encounterId" : resources.encounter.id,
        "procedureDate" : new Date().toISOString(),
        "status" : "in-progress",
        "text" : "<div>Umesh Did this proceduer</div>",
        "note" : ["These are the notes of the procedure"],
        "followUp" : ["Review after 15 days"]
        // "report" : ["ca7bfd8c-5208-48a2-a53d-e09228d64794", "70334fba-ad8d-494a-bc44-4b0f8f7015cf" , "10454763-d469-42e4-8c04-62c98744bb38"]

    })

    console.log(body)
    const res = await gcpFhirCRUD.createFhirResource(body, "Procedure")
    const ret = proceduer.convertFhirToObject(res.data)
    // const ret = res.data
    return ret;

}


module.exports= {setProcedure}