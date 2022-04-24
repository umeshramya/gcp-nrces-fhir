const { Specimen } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD} = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setSpecimen = async() => {
    const specimen = new Specimen();
    const body = specimen.getFHIR({
        "collection" : {"collectedDateTime" : new Date().toISOString()},
        "patientId" : resources.patient.id,
        "recivedDateTime" : new Date().toISOString(),
        "type" :  {"text" : "Plural Fluid"},
    })

    const res = await gcpFhirCRUD.createFhirResource(body, "Specimen")
    const ret = specimen.convertFhirToObject(res.data)
    return ret;

}


module.exports= {setSpecimen}