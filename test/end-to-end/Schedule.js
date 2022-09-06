const { Schedule } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setSChedule = async () => {
  const schedule = new Schedule();
  const body = schedule.getFHIR({
    active: true,
    actors: [
      {
        multiResource: {
          display: resources.practioner.name,
          id: resources.practioner.id,
          resource: "Practitioner",
        },
      },
    ],

    comment: "This is Augst Schedule of Dr Umesh R Bilagi",
    planningHorizon: {
      start: new Date("2022-09-01").toISOString(),
      end: new Date("2022-09-30").toISOString(),
    },
    serviceCategory: [{ text: "Consultation" }],
    specialty: [{ text: "Cardiology" }],
  });



  const res = await gcpFhirCRUD.createFhirResource(body, "Schedule");
  const ret = schedule.convertFhirToObject(res.data);
  return ret;
};

module.exports = { setSChedule };
