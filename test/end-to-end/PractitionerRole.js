const { PractitionerRole } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;
const { cpSync } = require("fs");
const { GcpFhirCRUD, GcpFhirSearch } = require("gcp-nrces-fhir");
const gcpFhirCRUD = new GcpFhirCRUD();
const { callFunction, resources } = require("./index");

 const setPractiotionerRole = async () => {
  
  const practitionerRole = new PractitionerRole();
  let body = practitionerRole.getFHIR({
    "availabilityExceptions" : "Not on Public holidays",
    "email" : "umeshbilai@gmail.com",
    "mobile" : "9343403620",
    "ndhmFacilityId" : "IN23456",
    "doctorId" : "1",
    "availableTime" : [{
      "daysOfWeek" : ["fri", "mon", "sat",],
      "availableStartTime" : "12:00:00",
      "availableEndTime" : "16:00:00",
    },
    {
      "daysOfWeek" : ["fri", "mon", "sat",],
      "availableStartTime" : "17:00:00",
      "availableEndTime" : "20:00:00",
    }
  ],
  "notAvailable" : [{"description" : "Not end of this month", "during" : {"start" :new Date().toISOString(), "end" : new Date().toISOString(),} }],
  "organizationId" : resources.organizarion.id,
  "practitionerId" : resources.practioner.id,
  "practitionerName" : resources.practioner.name,
  "practionerRole" : [{"code" : "106289002", "display" : "Cardiologist"}],
  "practitionerRoleSpecialities" : [{"code" : "394539006", "display" : "Cardiology"}],
  "userId" : "1",
  "period" : {"start": new Date().toISOString(), "end" : new Date().toISOString()}
  })

  const res =await gcpFhirCRUD.createFhirResource(body, "PractitionerRole");
 let ret = practitionerRole.convertFhirToObject(res.data)
 return ret

};

module.exports={setPractiotionerRole}

