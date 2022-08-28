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
        "followUp" : ["Review after 15 days"],
        "report" : ["c08e5635-ac16-42e4-a48d-0218fea037a9", "133862ca-5602-481d-a569-bfc325aa4bee" , "598135e3-e7ce-4859-aa9f-69a6bd0f1e1d"],
        "code" : {"text" : "<div>Umesh Did this proceduer</div>"}

    })

    const res = await gcpFhirCRUD.createFhirResource(body, "Procedure")
    const ret = proceduer.convertFhirToObject(res.data)
    resources.procedure= res.data;
    // const ret = res.data
    return ret;

}


module.exports= {setProcedure}