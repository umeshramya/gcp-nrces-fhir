import { ResourceMaster } from "../../Interfaces";
import { v4 as uuidv4 } from "uuid";
import { Encounter, ENCOUNTER } from "../Encounter";
import { Patient, PATIENT } from "../Patient";
import { Organization, ORGANIZATION } from "../Organization";
import ResourceMain from "../ResourceMai";
import { Age } from "date-age";
import { GcpFhirCRUD, GcpFhirSearch } from "../..";
import { Practitioner, PRACTITIONER } from "../Practitioner";
import { CreatePdf, PDF_HEADER } from "js-ts-report";
import { resourceType } from "../../config";
import { PDF_FOOter } from "js-ts-report/build/classes/create-pdf";

export const compositionTypeArrey = [
  {
    type: "OPConsultation",
    system: "http://snomed.info/sct",
    url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord",
    code: "371530004",
    text: "Clinical consultation report",
  },

  {
    type: "DischargeSummary",
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
    type: "Prescription",
    system: "http://snomed.info/sct",
    url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/PrescriptionRecord",
    code: "440545006",
    text: "Prescription record",
  },
  {
    type: "DiagnosticReport",
    system: "http://snomed.info/sct",
    url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DiagnosticReportRecord",
    code: "721981007",
    text: "Diagnostic studies report",
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
  reference: string;
  display: string;
}

export interface COMPOSITOIN {
  id?: string;
  identifier?: string;
  userId?: string;
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
  section: any[];
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

  private _patient!: PATIENT;
  public get patient(): PATIENT {
    return this._patient;
  }

  private _organization!: ORGANIZATION;
  public get organization(): ORGANIZATION {
    return this._organization;
  }
  /**
   * This are persons who interpt the result in care of diagnostic report and in care of the others these who treat patinets
   */
  private _practitioner: any = [];
  public get practitioner(): any {
    return this._practitioner;
  }

  private _encounter!: ENCOUNTER;
  public get encounter(): ENCOUNTER {
    return this._encounter;
  }
  /**
   * This is for diagnostic reporting enity requesting the services
   */
  private requeter: string = "";
  private performer: string[] = [];

  async setEncounter(id: string) {
    let curClass = new Encounter();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Encounter");
    this._encounter = curClass.convertFhirToObject(res.data);
  }

  async setPatient(id: string) {
    let curClass = new Patient();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Patient");
    this._patient = curClass.convertFhirToObject(res.data);
  }
  async setOrganization(id: string) {
    let curClass = new Organization();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Organization");
    this._organization = curClass.convertFhirToObject(res.data);
  }
  async setPractitioner(id: string) {
    let curClass = new Practitioner();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Practitioner");

    this._practitioner.push({
      reference: `Practitioner/${res.data.id}}`,
      display: curClass.convertFhirToObject(res.data).name,
    });
  }

  /**
   * service requested by could be patient , organization, patient him or herself
   * this is applicable diagnostic report
   */
  setRequester = (options: {
    reesource: resourceType;
    display: string;
  }): void => {
    if (options.reesource == "Patient") {
      this.requeter = "Self";
    } else {
      this.requeter = `${options.display}`;
    }
  };

  setPerformer = (options: {
    reesource: resourceType;
    display: string;
  }): void => {
    this.performer.push(options.display);
  };
  getFHIR(options: COMPOSITOIN) {
    const getpatientdetails = () => {
      let ret = `<div>Patient:- ${options.patient.name}.</div>`;
      ret += `<div>MRN:- ${options.patient.MRN} </div>`;
      ret += `${
        options.patient.phrAddress
          ? `<div>ABHA Address : ${options.patient.phrAddress}. ${
              options.patient.healthNumber
                ? `ABHA Number ${options.patient.healthNumber}`
                : ""
            }</div>`
          : ""
      }`;
      ret += `<div>Gender/Age: ${options.patient.gender}/${new Age().dobToAge(
        new Date(options.patient.dob)
      )} ph: ${options.patient.mobile}</div>`;

      return ret.trim();
    };
    /**
     * This is for doctors who authored the document or who interpreted the results
     * @returns
     */
    const getDoctors = () => {
      let str: string = "";
      options.author.forEach((el, i) => {
        if (i > 0) {
          str = str + `<div>${el.display}</div>`;
        } else {
          str = `<div><b>Signed By :- ${el.display}</b></div>`;
        }
      });
      return str;
    };

    const getHtmlText = (): string => {
      let html = `<div xmlns="http://www.w3.org/1999/xhtml">`;
      html += `<div style="text-align: right">`;
      html += `Date:-${new Date(options.date).toDateString()}`;
      html += `</div>`;
      html += `<div style="text-align: right; font-size: 9px">`;
      html += `Docurment Status :${options.status}`;
      html += `</div>`;
      html += `<div style="text-align: right; font-size: 9px">`;
      html += `Docurment Type :${options.type}`;
      html += `</div>`;
      html += `<table data-pdfmake="{'widths':['60%','40%']}">`;
      html += `<tr>`;
      html += `<td>${getpatientdetails()}</td>`;
      html += `<td>${getDoctors()}`;

      html += `${
        this.performer.length > 0
          ? `<div>Performed By :${this.performer.reduce(
              (pr, cu) => (pr += `${cu}<\br>`)
            )}</div>`
          : ""
      }`;
      html += `</td>`;
      html += `</tr>`;

      html += `${
        this.requeter || options.patient.internalId
          ? `<tr><td>${
              this.requeter ? `Requested By : ${this.requeter}` : ""
            }</td><td>${
              options.patient.internalId
                ? `Internal Id : ${options.patient.internalId}`
                : ""
            }</td></tr>`
          : ""
      }`;

      html += `</table>`;
      html += `<div>${options.documentDatahtml}</div`;
      html += `</div>`;
      html = `<span style="font-size: 10px;">${html}</span>`

      return html.trim();
    };

    const extensions: any[] = [];
    if (options.userId) {
      extensions.push({
        url: "https://www.nicehms.com/userId",
        valueString: options.userId,
      });
    }

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
        div: getHtmlText(),
      },
      extension: extensions,
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
      documentDatahtml: options.text.div.trim(),
    };
    if (ret.patient == undefined) {
      delete ret.patient;
    }
    if (ret.encounter == undefined) {
      delete ret.encounter;
    }
    if (ret.organization == undefined) {
      delete ret.organization;
    }
    if (options.extension) {
      const userId = options.extension.filter((el: any) => {
        if ((el.url = "https://www.nicehms.com/userId")) {
          return el;
        }
      });

      ret.userId = userId[0].valueString;
    }

    return ret;
  }

  statusArray(): compositionStatus[] {
    return compositionStatusArrey.map((el) => el);
  }

  typeArray(): compositionType[] {
    return onlyType.map((el) => el);
  }

  /**
   * this function return the all resources of copistion namely Patient, Author/Practioner, Encounter and entries in section
   * @param id composition id
   * @returns
   */
  getWithIncludes = async (id: string) => {
    const gcpFhirSearch = new GcpFhirSearch();
    const res = await gcpFhirSearch.search(
      "Composition",
      `_id=${id}&_include=Composition:patient&_include=Composition:author&_include=Composition:author&_include=Composition:encounter&_include=Composition:entry`
    );
    return res;
  };

  /**
   * This function returns all the compositions of patient
   * @param id of patient
   * @returns
   */
  getCompositionsByPatient = async (id: string): Promise<any> => {
    const gcpFhirSearch = new GcpFhirSearch();
    const res = await gcpFhirSearch.search(
      "Patient",
      `_id=${id}&_revinclude=Composition:patient`
    );
    return res;
  };

  getPdf = async (options: {
    html: string;
    header?: (options: PDF_HEADER) => [];
    footer?: (options: PDF_FOOter) => [];
    composition: COMPOSITOIN;
    base64: boolean;
    signBase64: string;
    nameLine1: string;
    nameLine2?: string;
    qrCode: string;
    paperSize: string;
    headerbase64Image?: string;
    /**
     * This is letter pad header preprinted
     */
    topMargin?: number;
    /*
     * this is for setting footer height in care of preprinted paper
     */
    bottomMargin?: number;
  }): Promise<string | Buffer> => {
    const pdf = new CreatePdf();
    const retPdf = await pdf.create(options.html, {
      base64: options.base64,
      header: options.header,
      footer: options.footer,
      topMargin: options.topMargin,
      bottomMargin: options.bottomMargin,
      esign: {
        image:
          options.composition.status == "final"
            ? options.signBase64
            : emptySign,
        nameLine1: options.nameLine1,
        nameLine2: options.nameLine2 || "",
      },
      qrcode: options.qrCode,
      paperSize: options.paperSize,
      headerbase64Image: options.headerbase64Image,
    });

    return retPdf;
  };
}

export const emptySign = `data:image/gif;base64,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`;

export interface Records {
  create: Function;
  update: Function;

  // create = async (options: { composition: COMPOSITOIN }) => {};
  // update = async (options: { composition: COMPOSITOIN }) => {};
}
