import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";

interface InvoiceRecordArgs {
  composition: COMPOSITOIN;
  invoiceRefs?: Array<{ id: string; reference: string }>;
}

export class InvoiceRecordComp extends Composition implements Records {
  create = async (options: InvoiceRecordArgs, Credentials?: any, DatabasePath?: any) => {
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    let gcpFhirCrud: GcpFhirCRUD;
    if (Credentials) {
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath);
    } else {
      gcpFhirCrud = new GcpFhirCRUD();
    }
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };

  update = async (options: InvoiceRecordArgs, Credentials?: any, DatabasePath?: any) => {
    if (!options.composition.id) {
      throw new Error("id of composition is required");
    }
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    let gcpFhirCrud: GcpFhirCRUD;
    if (Credentials) {
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath);
    } else {
      gcpFhirCrud = new GcpFhirCRUD();
    }
    const res = await gcpFhirCrud.updateFhirResource(
      body,
      options.composition.id || "",
      "Composition"
    );
    return res;
  };

  getOptions = async (options: InvoiceRecordArgs): Promise<InvoiceRecordArgs> => {
    const sections: any[] = [];

    if (options.invoiceRefs && options.invoiceRefs.length > 0) {
      sections.push({
        title: "Invoice Record",
        code: {
          coding: [{
            system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-billing-codes",
            code: "99",
            display: "Invoice Record",
          }],
        },
        entry: options.invoiceRefs.map(ref => ({
          reference: ref.reference,
          type: "Invoice",
        })),
      });
    }

    options.composition.section = sections;
    return options;
  };
}
