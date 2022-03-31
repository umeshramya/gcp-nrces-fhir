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

export interface NOT_AVAILABLE {
  description: string;
  during: PERIOD;
}

export interface PRACTITIONER_ROLE {
  id?: string;
  ndhmFacilityId?: string;
  doctorId?: string;
  userId: string;
  period: PERIOD;
  practitionerId: string;
  practitionerName: string;
  organizationId: string;
  practionerRole: PractionerRoles[];
  practitionerRoleSpecialities: PractitionerRoleSpecialities[];
  mobile: string;
  email: string;
  availableTime?: AVAILABLE_TIME[];
  notAvailable?: NOT_AVAILABLE[];
  availabilityExceptions: string;
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
        reference: `Practitioner/${options.practitionerId}`,
        display: options.practitionerName,
      },
      organization: {
        reference: `Organization/${options.organizationId}`,
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
      notAvailable: options.notAvailable,
      availabilityExceptions: options.availabilityExceptions,
    };
  }
  convertFhirToObject(options: any): PRACTITIONER_ROLE {
    const practionerRoles: PractionerRoles[] = options.practionerRole.map(
      (el: CodeDisplay) => {
        let ret: PractionerRoles = {
          alias: "",
          code: el.code as any,
          display: el.display as any,
        };
        return ret;
      }
    );
    const practitionerRoleSpecialities: PractitionerRoleSpecialities[] =
      options.specialty.map((el: CodeDisplay) => {
        let ret: PractitionerRoleSpecialities = {
          alias: "",
          code: el.code as any,
          display: el.display as any,
        };
        return ret;
      });
    let ret: PRACTITIONER_ROLE = {
      userId: options.telecom.filter(
        (el: any) => el.type.coding[0].system == "http://www.nicehms.com/userId"
      )[0].value,

      ndhmFacilityId: options.telecom.filter(
        (el: any) =>
          el.type.coding[0].system == "http://www.ndhm.in/practitioners"
      )[0].value,
      doctorId: options.telecom.filter(
        (el: any) =>
          el.type.coding[0].system == "http://www.nicehms.com/doctorId"
      )[0].value,
      period: options.period,
      practitionerId: this.getIdFromReference({
        ref: options.practitioner.reference,
        resourceType: "Practitioner",
      }),
      practitionerName: options.practitioner.display,
      organizationId: this.getIdFromReference({
        ref: options.organization.reference,
        resourceType: "Organization",
      }),
      practionerRole: practionerRoles,
      practitionerRoleSpecialities: practitionerRoleSpecialities,
      mobile: options.telecom.filter(
        (el: { system: string }) => el.system == "phone"
      )[0].value,
      email: options.telecom.filter(
        (el: { system: string }) => el.system == "email"
      )[0].value,
      availabilityExceptions: options.availabilityExceptions,
      availableTime: options.availableEndTime,
      notAvailable: options.notAvailable,
    };
    return ret;
  }
  statusArray?: Function | undefined;

  practionerRoles(): PractionerRoles[] {
    return practionerRoles as any;
  }
  practitionerRoleSpecialities(): PractitionerRoleSpecialities[] {
    return practitionerRoleSpecialities as any;
  }
}
