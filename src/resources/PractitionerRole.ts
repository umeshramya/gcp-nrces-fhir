import { CodeDisplay, IDENTTIFIER, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import { ORGANIZATION } from "./Organization";
import { PRACTITIONER } from "./Practitioner";
import ResourceMain from "./ResourceMai";
import {
  practionerRoles,
  practitionerRoleSpecialities,
  daysOfWeek,
} from "../config/practionerRole";

type PractionerRoles = typeof practionerRoles[number];
type PractitionerRoleSpecialities = typeof practitionerRoleSpecialities[number];
type DaysOfWeek = typeof daysOfWeek[number];

export interface AVAILABLE_TIME {
  daysOfWeek: DaysOfWeek[];
  allDay?: boolean;
  availableStartTime: string;
  availableEndTime: string;
}

export interface PRACTITIONER_ROLE {
  id?: string;
  ndhmFacilityId?: string;
  doctorId?: string;
  userId: string;
  period: PERIOD;
  practitioner: PRACTITIONER;
  organization: ORGANIZATION;
  practionerRole: PractionerRoles[];
  practitionerRoleSpecialities: PractitionerRoleSpecialities[];
  mobile: string;
  email: string;
  availableTime: AVAILABLE_TIME[];
}

export class PractitionerRole extends ResourceMain implements ResourceMaster {
  getFHIR(options: PRACTITIONER_ROLE) {
    const getText = (): string => {
      let ret: string = "";

      return ret;
    };

    const identifiers: IDENTTIFIER[] = [];
    if (options.ndhmFacilityId) {
      identifiers.push({
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "EI",
              display: "Employee number",
            },
          ],
        },
        system: "http://www.ndhm.in/practitioners",
        value: options.ndhmFacilityId,
      });
    }

    if (options.doctorId) {
      identifiers.push({
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "EI",
              display: "Employee number",
            },
          ],
        },
        system: "http://www.nicehms.com/doctorId",
        value: options.doctorId,
      });
    }

    if (options.userId) {
      identifiers.push({
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "EI",
              display: "Employee number",
            },
          ],
        },
        system: "http://www.nicehms.com/userId",
        value: options.userId,
      });
    }

    const code: CodeDisplay[] = options.practionerRole.map((el) => {
      let ret: CodeDisplay = {
        code: el.code,
        display: el.display,
        system: "http://snomed.info/sct",
      };
      return ret;
    });

    const speciality: CodeDisplay[] = options.practitionerRoleSpecialities.map(
      (el) => {
        let ret: CodeDisplay = {
          code: el.code,
          display: el.display,
          system: "http://snomed.info/sct",
        };
        return ret;
      }
    );

    const body = {
      resourceType: "PractitionerRole",
      id: options.id,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/PractitionerRole",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${getText()}</div>`,
      },
      identifier: identifiers,
      active: true,
      period: options.period,
      practitioner: {
        reference: `Practitioner/${options.practitioner.id}`,
        display: options.practitioner.name,
      },
      organization: {
        reference: `Organization/${options.organization.id}`,
      },
      code: [
        {
          coding: code,
        },
      ],
      specialty: [
        {
          coding: speciality,
        },
      ],
      telecom: [
        {
          system: "phone",
          value: options.mobile,
          use: "work",
        },
        {
          system: "email",
          value: options.email,
          use: "work",
        },
      ],
      availableTime: options.availableTime,
      notAvailable: [
        {
          description: "DEF will be on extended leave during Nov 2020",
          during: {
            start: "2020-11-01",
            end: "2020-11-20",
          },
        },
      ],
      availabilityExceptions:
        "Adam is generally unavailable on public holidays",
    };
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;

  practionerRoles(): PractionerRoles[] {
    return practionerRoles as any;
  }
  practitionerRoleSpecialities(): PractitionerRoleSpecialities[] {
    return practitionerRoleSpecialities as any;
  }
}
