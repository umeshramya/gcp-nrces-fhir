import { Composition, compositionStatus, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { EXTENSION, IDENTTIFIER } from "../../config";
interface Args {
  id?: string;
  patientId: string;
  encounterId: string;
  languageCode: string;
  orgnizationId: string;
  status: compositionStatus;
  docHtml: string;
  date: string;
  title: string;
  author: COMPOSITOIN["author"];
  identifier?: IDENTTIFIER[];
  extension?: EXTENSION;
}
export class DietaryRecord extends Composition implements Records {
  getOptions =()=>{};
  create = async (options: Args, Credentials?: any, DatabasePath?: any) => {
    let gcpFhirCrud: GcpFhirCRUD;
    if (Credentials) {
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath);
    } else {
      gcpFhirCrud = new GcpFhirCRUD();
    }
    // body.section = options.composition.section;
    const res = await gcpFhirCrud.createFhirResource(
      {
        resourceType: "Composition",
        identifier: options.identifier ? options.identifier : undefined,
        extension: options.extension ? options.extension : undefined,
        language: options.languageCode ? options.languageCode : "en",
        status: options.status,
        type: {
          coding: [
            {
              system: "https://ndhm.gov.in/sct",
              code: "440654000",
              display: "Dietary record",
            },
          ],
          text: "Dietary record",
        },
        subject: {
          reference: `Patient/${options.patientId}`,
        },
        encounter: {
          reference: `Encounter/${options.encounterId}`,
        },
        date: options.date,
        author: options.author,
        title: "Dietary record",
        custodian: {
          reference: `Organization/${options.orgnizationId}`,
        },
        text: {
          status: "generated",
          div: options.docHtml,
        },
      },
      "Composition"
    );
    return res;
  };

  update = async (options: Args, Credentials?: any, DatabasePath?: any) => {
    if (!options.id) {
      throw (new Error().message = "id of composition is required");
    }
    let gcpFhirCrud: GcpFhirCRUD;
    if (Credentials) {
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath);
    } else {
      gcpFhirCrud = new GcpFhirCRUD();
    }
    const res = await gcpFhirCrud.updateFhirResource(
      {
        id: options.id,
        resourceType: "Composition",
        identifier: options.identifier ? options.identifier : undefined,
        extension: options.extension ? options.extension : undefined,
        language: options.languageCode ? options.languageCode : "en",
        status: options.status,
        type: {
          coding: [
            {
              system: "https://ndhm.gov.in/sct",
              code: "440654000",
              display: "Dietary record",
            },
          ],
          text: "Dietary record",
        },
        subject: {
          reference: `Patient/${options.patientId}`,
        },
        encounter: {
          reference: `Encounter/${options.encounterId}`,
        },
        date: options.date,
        author: options.author,
        title: "Dietary record",
        custodian: {
          reference: `Organization/${options.orgnizationId}`,
        },
        text: {
          status: "generated",
          div: options.docHtml,
        },
      },
      options.id,
      "Composition"
    );
    return res;
  };





}
