const { Location } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setLocation = async () => {
  const location = new Location();
  const body = location.getFHIR({
    address: " main building",
    alias: ["Main Building", "ABlock"],
    availabilityExceptions: "None",
    description: "A Block",
    managingOrganizationId: resources.organization.id,
    type: [{ text: "Building" }],
    name: "A Block",
    status: "active",
    operationalStatus: { code: "Occupied", display: "Occupied" },
    form: {
      coding: [
        {
          system:
            "http://terminology.hl7.org/CodeSystem/location-physical-type",
          code: "ro",
          display: "Room",
        },
      ],
      text: "Room",
    }
  });

  const res = await gcpFhirCRUD.createFhirResource(body, "Location");
  console.log(res.data);
  const ret = location.convertFhirToObject(res.data);

  resources.location = res.data;
  return ret;
};

module.exports = { setLocation };
