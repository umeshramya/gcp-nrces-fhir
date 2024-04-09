
const { GcpFhirCRUD} = require("gcp-nrces-fhir");
require("dotenv").config("env");

const claimCodes = require("./valuesets/claim-code.json")


const createValueSet = async()=>{
    const gcpFhirCRUD = new GcpFhirCRUD()

const res = await gcpFhirCRUD.createFhirResource(claimCodes, "ValueSet", true)

console.log(res)
}


module.exports= {createValueSet}