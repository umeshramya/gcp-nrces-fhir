const { Slot } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setSlot = async () => {
  const slot = new Slot();
  const body = slot.getFHIR({
    "appointmentType" : {
      "text" : "consultation"
    },
    "comment" : "Monday",
    "end" : new Date().toISOString(),
    "start" : new Date().toISOString(),
    "scheduleId" : "5c5e9e3b-06e3-4274-95d8-f6d77f3d8f51",
    "status" : "free",
    
  });



  const res = await gcpFhirCRUD.createFhirResource(body, "Slot");
  const ret = slot.convertFhirToObject(res.data);
  return ret;
};

module.exports = { setSlot };
