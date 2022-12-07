const { ImmunizationRecommendation } = require("gcp-nrces-fhir");
require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setImmunizationRecommendation = async () => {
  const immunization = new ImmunizationRecommendation();

  const body = immunization.getFHIR({
    authority: { reference: resources.organization.id },
    patient: { reference: resources.patient.id },
    date: new Date().toISOString(),
    resourceType: "ImmunizationRecommendation",
    recommendation: [
      {
        dateCriterion: [
          {
            code: {
              coding: [
                {
                  code: "30980-7",
                  display: "Date vaccine due",
                  system: "http://loinc.org",
                },
              ],
            },
            value: new Date().toISOString,
          },
        ],
        description: "trest",
        doseNumberPositiveInt: 1,
        series: "Covid series",
        seriesDosesPositiveInt: 2,
        vaccineCode: [{ text: "Covid Vaccine" }],
        forecastStatus: {
          coding: [
            {
              code: "Covid",
              display: "Covid",
              system:
                "http://terminology.hl7.org/CodeSystem/immunization-recommendation-status",
            },
          ],
        },
      },
    ],
  });

  let res = (
    await new GcpFhirCRUD().createFhirResource(
      body,
      "ImmunizationRecommendation"
    )
  ).data;
  // res = new Immunization().convertFhirToObject(res)

  return res;
};

module.exports = { setImmunizationRecommendation };
