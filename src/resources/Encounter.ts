import { brotliDecompressSync } from "zlib";
import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MULTI_RESOURCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import { PRACTITIONER } from "./Practitioner";
import ResourceMain from "./ResourceMai";
import { Organization } from "./Organization";

const EncounterStatusArray = [
  "planned",
  "arrived",
  "triaged",
  "in-progress",
  "onleave",
  "finished",
  "cancelled",
  "entered-in-error",
  "unknown",
] as const;
const EncounterClassArray = [
  { code: "AMB", display: "ambulatory" },
  { code: "FLD", display: "Field" },
  { code: "HH", display: "Home Health" },
  { code: "IMP", display: "in-patient" },
  { code: "EMER", display: "emergency" },
  { code: "ACUTE", display: "inpatient acute" },
  { code: "NONAC", display: "inpatient non-acute" },
  { code: "OBSENC", display: "observation encounter" },
  { code: "PRENC", display: "pre-admission" },
  { code: "VR", display: "virtual" },
] as const;

const EncounterHospitalizationDischargeDispositionArray = [
  { code: "home", display: "home" },
  { code: "alt-home", display: "Alternative home" },
  { code: "other-hcf", display: "Other healthcare facility" },
  { code: "hosp", display: "Hospice" },
  { code: "long", display: "Long-term care" },
  { code: "aadvice", display: "Left against advice" },
  { code: "exp", display: "Expired" },
  { code: "psy", display: "Psychiatric hospital" },
  { code: "rehab", display: "Rehabilitation" },
  { code: "smf", display: "Skilled nursing facility" },
  { code: "oth", display: "Other" },
] as const;

type EncounterStatus = typeof EncounterStatusArray[number];
type EncounterClass = typeof EncounterClassArray[number];
type EncounterHospitalizationDischargeDisposition =
  typeof EncounterHospitalizationDischargeDispositionArray[number];

interface ENCOUNTER_PARTICIPANT {
  type: CODEABLE_CONCEPT[];
  individual: {
    reference: string;
    type: "RelatedPerson" | "Practitioner" | "PractitionerRole";
  };
}
interface BASED_ON extends MULTI_RESOURCE {
  resource:
    | "CarePlan"
    | "DeviceRequest"
    | "MedicationRequest"
    | "ServiceRequest";
}

interface ENCOUNTER {
  id?: string;
  text: string;
  extension?: EXTENSION[];
  status: EncounterStatus;
  careContext?: string;
  organizationId?: string;
  class: EncounterClass;
  type?: CODEABLE_CONCEPT[];
  patientId: string;
  startDate: string;
  endDate?: string;
  appointment?: { reference: string; type: "Appointment" }[];
  reasonReference?: {
    reference: string;
    type:
      | "ImmunizationRecommendation"
      | "Condition"
      | "Procedure"
      | "Observation";
  }[];
  reasonCode?: CODEABLE_CONCEPT[];
  hospitalization?: {
    dischargeDisposition?: CODEABLE_CONCEPT;
    id?: string;
    origin?: { reference: string; type: "Location" | "Organization" };
    admitSource?: CODEABLE_CONCEPT;
    reAdmission?: CODEABLE_CONCEPT;
    dietPreference?: CODEABLE_CONCEPT;
    destination?: { reference: string; type: "Location" | "Organization" };
  };
  diagnosis?: {
    condition: { reference: string; type: "Condition" | "Procedure" };
    use?: CODEABLE_CONCEPT;
    rank?: number;
  }[];
  participant?: ENCOUNTER_PARTICIPANT[];
  account?: { reference: string; type: "Account" }[];
  basedOn?: BASED_ON[];
  location?: {
    location: { reference: string };
    period?: {
      start: string;
      end: string;
    };
    status?: "planned" | "active" | "reserved" | "completed";
  }[];
}

export class Encounter extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string>{
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: ENCOUNTER) {
    const identifiers: IDENTTIFIER[] = [];

    if (options.careContext) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR",
              display: "Medical record number",
            },
          ],
        },
        system: "https://ndhm.in",
        value: `${options.careContext}`,
      };

      identifiers.push(id);
    }

    const body: any = {
      resourceType: "Encounter",
      id: options.id,
      meta: {
        lastUpdated: new Date().toISOString(),
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.text} </div>`,
      },
      identifier: identifiers,
      status: options.status,
      class: {
        system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        code: options.class.code,
        display: options.class.display,
      },
      subject: {
        reference: `Patient/${options.patientId}`,
      },
      period: {
        start: options.startDate,
        end: options.endDate,
      },
      hospitalization: options.hospitalization,
      diagnosis: options.diagnosis,
      participant: this.rearrangeParticipants(options.participant || []),
      reasonReference: options.reasonReference,
      reasonCode: options.reasonCode,
      account: options.account,
    };

    if (options.extension) {
      body.extension = options.extension;
    }

    if (options.basedOn) {
      body.basedOn = options.basedOn.map((el) => {
        return {
          reference: `${el.resource}/${el.id}`,
        };
      });
    }

    if (options.type) {
      body.type = options.type;
    }

    if (options.organizationId) {
      body.serviceProvider = {
        reference: `Organization/${options.organizationId}`,
      };
    }
    if (options.location) {
      body.location = options.location;
    }
    return body;
  }

  convertFhirToObject(options: any): ENCOUNTER {
    let ret: ENCOUNTER = {
      text: this.getDivText(options.text.div),
      status: options.status,
      class: { code: options.class.code, display: options.class.display },
      patientId: `${options.subject.reference}`.substring(8),
      startDate: options.period.start,

      id: options.id,
    };

    if (options.serviceProvider) {
      ret.organizationId = this.getIdFromReference({
        ref: options.serviceProvider.reference,
        resourceType: "Organization",
      });
    }
    if (options.period.end) {
      ret.endDate = options.period.end;
    }
    if (options.diagnosis) {
      ret.diagnosis = options.diagnosis;
    }
    if (options.account) {
      ret.account = options.account;
    }
    if (options.appointment) {
      ret.appointment = options.appointment;
    }
    if (options.reasonCode) {
      ret.reasonCode = options.reasonCode;
    }
    if (options.reasonReference) {
      ret.reasonReference = options.reasonReference;
    }
    if (options.participant) {
      ret.participant = options.participant;
    }
    if (options.hospitalization) {
      ret.hospitalization = options.hospitalization;
    }

    if (options.extension) {
      ret.extension = options.extension;
    }
    if (options.identifier) {
      const careContext: any[] = options.identifier.filter(
        (el: any) => el.system == "https://ndhm.in"
      );

      if (careContext.length > 0) {
        ret.careContext = careContext[0].value;
      }
    }

    if (options.basedOn) {
      ret.basedOn = options.basedOn.map((el: any) => {
        const ret: BASED_ON = this.getFromMultResource({
          reference: el.reference,
        }) as any;
        return ret;
      });
    }

    if (options.type) {
      ret.type = options.type;
    }
    if (options.location) {
      ret.location = options.location;
    }

    return ret;
  }

  rearrangeParticipants (participant:ENCOUNTER_PARTICIPANT[]):ENCOUNTER_PARTICIPANT[]{
    const ret:ENCOUNTER_PARTICIPANT[]=participant.sort((a, b) => {
      const typeA = a.type[0];
      const typeB = b.type[0];
    
      const codingA = typeA.coding ? typeA.coding[0] : undefined;
      const codingB = typeB.coding ? typeB.coding[0] : undefined;
    
      const codeA = codingA ? codingA.code : undefined;
      const codeB = codingB ? codingB.code : undefined;
    
      if (codeA && codeB) {
        return codeA.localeCompare(codeB);
      } else if (codeA) {
        return -1;
      } else if (codeB) {
        return 1;
      }
    
      return 0;
    });
    

    return ret
  }

  /**
   *
   * @param particpants particpants of encounters
   * @param allPractioners supply array of practioners for filtering
   * @returns array of practioners
   */
  getPractionersFromParticipants = (
    particpants: ENCOUNTER_PARTICIPANT[],
    allPractioners: PRACTITIONER[]
  ): PRACTITIONER[] => {
    let ret: PRACTITIONER[] = [];
    if (particpants && particpants.length > 0) {
      ret = particpants?.map((el) => {
        const multisource = this.getFromMultResource({
          reference: el.individual.reference,
        });
        return allPractioners.filter((el) => el.id == multisource.id)[0];
      });
    }
    return ret;
  };
  /**
   * This converts Practioners to encounter particpants
   * @param practioners  PRACTINIORS
   * @returns
   */
  convertPractionersToParticpants = (
    practioners: PRACTITIONER[]
  ): ENCOUNTER["participant"] => {
    let ret: ENCOUNTER_PARTICIPANT[] = [];
    ret = practioners.map((el) => {
      return {
        individual: {
          reference: `Practitioner/${el.id}`,
          type: `Practitioner`,
        },
        type: [{ text: "Practitioner" }],
      };
    });
    return ret;
  };
}

/**
 * @deprecated
 * @param options
 * @returns
 */
const EncounterResource = (options: ENCOUNTER) => {
  const encounter = new Encounter();
  return encounter.getFHIR(options);
};

export {
  ENCOUNTER,
  ENCOUNTER_PARTICIPANT,
  EncounterResource,
  EncounterHospitalizationDischargeDispositionArray,
  EncounterStatusArray,
  EncounterClassArray,
};
export type {
  EncounterClass,
  EncounterStatus,
  EncounterHospitalizationDischargeDisposition,
};
