const { Appointment } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setAppointment= async () => {
  const appointment = new Appointment();
  const body = appointment.getFHIR({
    "appointmentType" : {"text" : "Consulatation"},
    "createdDate" : new Date().toISOString(),
    "description" : "Appointement for Consulatation in view of Post PTCA follwup",
    "endDate" : new Date().toISOString(),
    "startDate" : new Date().toISOString(),
    "participants" : [
      {
        "actor" : {"multiResource" : {"display" : resources.patient.name, "id" : resources.patient.id, "resource" : "Patient"}},
        "status" : "tentative",
        "type" : [{"text" : "Patient"}],
        "required" : "required"
      },
      {
        "actor" : {"multiResource" : {"display" : resources.practioner.name, "id" : resources.practioner.id, "resource" : "Practitioner"}},
        "status" : "accepted",
        "type" : [{"text" : "Doctor"}]
      }
    ],
    "priority" : 1,
    "specialty" : [{"text" : "Cardiology"}],
    "status" : "proposed",
    "slotId" :[ "8ad46b43-4785-4e88-a3c5-13320a884426"]
  });

  const res = await gcpFhirCRUD.createFhirResource(body, "Appointment");
  const ret = appointment.convertFhirToObject(res.data);
  return ret;
};

module.exports = { setAppointment };
