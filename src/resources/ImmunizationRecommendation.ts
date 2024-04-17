import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface IMMUNIZATION_RECOMMENDATION {
  resourceType: "ImmunizationRecommendation";
  id?: string;
  text: Text;
  patient: Patient;
  date: string;
  authority: Authority;
  recommendation: Recommendation[];
}

interface Text {
  status: string;
  div: string;
}

interface Patient {
  reference: string;
}

interface Authority {
  reference: string;
}

interface Recommendation {
  vaccineCode: {
    coding?: [
      {
        system: "http://snomed.info/sct";
        code: string;
        display: string;
      }
    ];
    text?: string;
  }[];
  forecastStatus: ForecastStatus;
  dateCriterion: DateCriterion[];
  description: string;
  series: string;
  doseNumberPositiveInt: number;
  seriesDosesPositiveInt: number;
  supportingImmunization: SupportingImmunization[];
}

interface VaccineCode {
  coding: Coding[];
}

export interface Coding {
  system: string;
  code: string;
  display: string;
}

export interface ForecastStatus {
  coding: {
    system: "http://terminology.hl7.org/CodeSystem/immunization-recommendation-status";
    code: string;
    display: string;
  }[];
}

export interface Coding2 {
  system: string;
  code: string;
  display: string;
}

export interface DateCriterion {
  code: {
    coding: [
      {
        system: "http://loinc.org";
        code: "30980-7";
        display: "Date vaccine due";
      }
    ];
  };
  value: string;
}

export interface SupportingImmunization {
  reference: string;
}

export class ImmunizationRecommendation
  extends ResourceMain
  implements ResourceMaster
{
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: IMMUNIZATION_RECOMMENDATION) {
    const supportingImmunization = (): Recommendation[] => {
      let ret: Recommendation[] = options.recommendation.map((el) => {
        if (el.supportingImmunization && el.supportingImmunization.length > 0) {
          return {
            ...el,
            supportingImmunization: el.supportingImmunization.map((pl) => {
              return {
                ...pl,
                reference: `Immunization/${pl.reference}`,
              };
            }),
          };
        } else {
          return el;
        }
      });
      return ret;
    };
    const body: IMMUNIZATION_RECOMMENDATION = {
      ...options,
      patient: { reference: `Patient/${options.patient.reference}` },
      authority: { reference: `Organization/${options.authority.reference}` },
      recommendation: supportingImmunization(),
    };

    return body;
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}

const body = {
  resourceType: "ImmunizationRecommendation",
  id: "example-01",
  text: {
    status: "generated",
    div: '<div xmlns="http://www.w3.org/1999/xhtml">This is Immunization Recommendation for hepatitis A vaccine to be taken on 2021-05-10.</div>',
  },
  patient: { reference: "Patient/1" },
  date: "2021-01-10T11:04:15.817-05:00",
  authority: { reference: "Organization/1" },
  recommendation: [
    {
      vaccineCode: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "871751006",
              display: "Hepatitis A vaccine",
            },
          ],
        },
      ],
      forecastStatus: {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/immunization-recommendation-status",
            code: "due",
            display: "Due",
          },
        ],
      },
      dateCriterion: [
        {
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "30980-7",
                display: "Date vaccine due",
              },
            ],
          },
          value: "2021-05-10T00:00:00-05:00",
        },
      ],
      description: "First sequence in protocol",
      series: "Vaccination Series 1",
      doseNumberPositiveInt: 1,
      seriesDosesPositiveInt: 3,
      supportingImmunization: [{ reference: "Immunization/1" }],
    },
  ],
};
