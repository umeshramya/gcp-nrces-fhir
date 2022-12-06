const { Immunization } = require("gcp-nrces-fhir")
require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setImmunization = async () => {
   const immunization = new Immunization()

   const body = immunization.getFHIR({
      "extension" : [{"url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/BrandName" , "valueString" : "abcd"}],
      "id" : undefined,
      "meta" : {"profile" : ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Immunization"]},
      "occurrenceDateTime" : new Date().toISOString(),
      "patient" : {"reference" : resources.patient.id},
      "primarySource" : true,
      "resourceType" : "Immunization",
      "status" : "not-done",
      "statusReason" :{"text" : "DPT"},
      "vaccineCode" :  {"text" : "DPT"},
   })

// console.log(body)

   let res = (await new GcpFhirCRUD().createFhirResource(body, "Immunization")).data;
   // res = new Observation().convertFhirToObject(res)

   return res;
}



module.exports = {setImmunization }