import { ResourceMaster } from "../Interfaces";
import { v4 as uuidv4 } from "uuid";
import { ENCOUNTER } from "./Encounter";
import { PATIENT } from "./Patient";
import { ORGANIZATION } from "./Organization";
import ResourceMain from "./ResourceMai";
import { Age } from "date-age";
import { GcpFhirSearch } from "..";

export const compositionTypeArrey = [
  {
    type: "OPConsultRecord",
    system: "http://snomed.info/sct",
    url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord",
    code: "371530004",
    text: "Clinical consultation report",
  },

  {
    type: "DischargeSummaryRecord",
    system: "http://snomed.info/sct",
    url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DischargeSummaryRecord",
    code: "373942005",
    text: "Discharge summary",
  },

  {
    type: "ImmunizationRecord",
    system: "http://snomed.info/sct",
    url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ImmunizationRecord",
    code: "41000179103",
    text: "Immunization record",
  },
  {
    type: "PrescriptionRecord",
    system: "http://snomed.info/sct",
    url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/PrescriptionRecord",
    code: "440545006",
    text: "Prescription record",
  },
] as const;

const onlyType = compositionTypeArrey.map((el) => el.type);
export type compositionType = typeof onlyType[number];
const compositionStatusArrey = [
  "preliminary",
  "final",
  "amended",
  "entered-in-error",
] as const;
type compositionStatus = typeof compositionStatusArrey[number];

export interface compositionAuthor {
  reference: `Practitioner/${string}`;
  display: string;
}

export interface COMPOSITOIN {
  id?: string;
  identifier?: string;
  patient: PATIENT;
  patientId: string;
  encounter: ENCOUNTER;
  encounterId: string;
  date: string;
  author: compositionAuthor[];
  organization: ORGANIZATION;
  organizationId: string;
  status: compositionStatus;
  type: compositionType;
  documentDatahtml?: string;
  section: [];
}
export class Composition extends ResourceMain implements ResourceMaster {
  private compType!: {
    type: string;
    system: "http://snomed.info/sct";
    url: string;
    code: string;
    text: string;
  };
  public mapCompositionType(type: compositionType) {
    this.compType = compositionTypeArrey.filter((comp) => comp.type == type)[0];
  }
  getFHIR(options: COMPOSITOIN) {
    const getpatientdetails = () => {
      return `<div>Patient:- ${options.patient.name}.  ${
        options.patient.healthNumber
          ? `Health Id ${options.patient.healthNumber}`
          : ""
      }</div>
                <div>MRN:- ${options.patient.MRN}</div>
                <div>Gender/Age: ${options.patient.gender}/${new Age().dobToAge(
        new Date(options.patient.dob)
      )} ph: ${options.patient.mobile}</div>`;
    };

    this.mapCompositionType(options.type);
    const body = {
      resourceType: "Composition",
      id: options.id || undefined,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: [this.compType.url],
      },
      language: "en-IN",
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml">
        <div style="text-align: right">
          Date:-${new Date(options.date).toDateString()}
        </div>
        <div style="text-align: right; font-size: 9px">
          Docurment Status :${options.status}
        </div>
        <div style="text-align: right; font-size: 9px">
          Docurment Type :${options.type}
        </div>
        <table data-pdfmake="{'widths':['60%','40%']}">
          <tr>
            <td>${getpatientdetails()}</td>
            <td>
                    ${options.author.map((el, i) => {
                      if (i > 0) {
                        return `<div>${el.display}</div>`;
                      } else {
                        return `<div><b>Signed By :- ${el.display}</b></div>`;
                      }
                    })} 
  
            </td>
          </tr>
        </table>
        <hr />
        <div>${options.documentDatahtml}</div>
      </div>`,
      },
      identifier: {
        system: "https://ndhm.in/phr",
        value: options.identifier || uuidv4(),
      },
      status: options.status,
      type: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: this.compType.code,
            display: this.compType.text,
          },
        ],
        text: this.compType.text,
      },
      subject: {
        reference: `Patient/${options.patientId}`,
        // "display": options.patient.name
      },
      encounter: {
        reference: `Encounter/${options.encounterId}`,
      },
      date: options.date,
      author: options.author,
      title: options.type,
      custodian: {
        reference: `Organization/${options.organizationId}`,
        // "display": options.organization.name
      },
      section: [
        {
          title: this.compType.type,
          code: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: this.compType.code,
                display: options.type,
              },
            ],
          },
          entry: options.section,
        },
      ],
    };

    return body;
  }
  convertFhirToObject(options: any): Partial<COMPOSITOIN> {
    let ret: Partial<COMPOSITOIN> = {
      patient: undefined,
      patientId: this.getIdFromReference({
        ref: options.subject.reference,
        resourceType: "Patient",
      }),
      encounter: undefined,
      encounterId: this.getIdFromReference({
        ref: options.encounter.reference,
        resourceType: "Encounter",
      }),
      date: options.date,
      organization: undefined,
      // organizationId: `${options.custodian.reference}`.substring(13),
      organizationId: this.getIdFromReference({
        ref: options.custodian.reference,
        resourceType: "Organization",
      }),
      status: options.status,
      type: options.title,
      section: options.section,
      id: options.id,
      identifier: options.identifier.value,
      author: options.author,
    };
    return ret;
  }

  statusArray(): compositionStatus[] {
    return compositionStatusArrey.map((el) => el);
  }

  typeArray(): compositionType[] {
    return onlyType.map((el) => el);
  }

  getWithIncludes = async (id: string) => {
    const gcpFhirSearch = new GcpFhirSearch();
    const res = await gcpFhirSearch.search(
      "Composition",
      `_id=${id}&_include=Composition:patient&_include=Composition:author&_include=Composition:author&_include=Composition:encounter&_include=Composition:entry`
    );
    return res;
  };

  getCompositionsByPatient = async (id: string) => {
    const gcpFhirSearch = new GcpFhirSearch();
    const res = await gcpFhirSearch.search(
      "Patient",
      `_id=${id}&_revinclude=Composition:patient`
    );
    return res;
  };
}
