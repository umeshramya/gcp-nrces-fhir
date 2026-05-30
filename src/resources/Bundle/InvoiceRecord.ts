import { ResourceMaster } from "../../Interfaces";
import { BundelMain } from ".";
import { Composition } from "../Composition";
import GcpFhirCrud from "../../classess/gcp";
import { DocumentReference } from "../DocumentReference";
import createPdf from "../../classess/PdfGenerator";

export class InvoiceRecordBundle extends BundelMain implements ResourceMaster {
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async getFHIR(options: {
    id?: string;
    composition: any;
    pdfData?: string;
  }) {
    const bundlemain = await new BundelMain(
      this.gcpCredetials,
      this.gcpPath
    ).getentries(options.composition, options.pdfData || "");

    this.entry = bundlemain.entry;
    const compObj = bundlemain.compositionObj;

    // Add Invoice and ChargeItem resources from section entries
    const gcpFhirCrud = new GcpFhirCrud(this.gcpCredetials, this.gcpPath);
    if (options.composition.section) {
      for (const section of options.composition.section) {
        if (section.entry) {
          for (const entry of section.entry) {
            try {
              const refParts = entry.reference?.split("/");
              if (refParts && refParts.length === 2) {
                const [resourceType, resourceId] = refParts;
                if (resourceType === "Invoice") {
                  const invRes = await gcpFhirCrud.getFhirResource(resourceId, "Invoice" as any);
                  if (invRes?.data) {
                    this.entry.push({
                      fullUrl: entry.reference,
                      resource: invRes.data,
                    });

                    // Also fetch ChargeItems referenced by this Invoice
                    if (invRes.data.lineItem) {
                      for (const lineItem of invRes.data.lineItem) {
                        const ciRef = lineItem.chargeItemReference?.reference || lineItem.chargeItemReference;
                        if (ciRef) {
                          try {
                            const ciRefParts = ciRef.split("/");
                            if (ciRefParts && ciRefParts.length === 2) {
                              const [ciType, ciId] = ciRefParts;
                              if (ciType === "ChargeItem") {
                                const ciRes = await gcpFhirCrud.getFhirResource(ciId, "ChargeItem" as any);
                                if (ciRes?.data) {
                                  this.entry.push({
                                    fullUrl: ciRef,
                                    resource: ciRes.data,
                                  });
                                }
                              }
                            }
                          } catch {
                            // ChargeItem may not be stored in FHIR store; skip
                          }
                        }
                      }
                    }
                  }
                }
              }
            } catch (err) {
              // Entry not found; skip
            }
          }
        }
      }
    }

    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        lastUpdated: new Date().toISOString(),
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"],
      },
      identifier: {
        system: "https://www.nicehms.com/bundle",
        value: options.id,
      },
      type: "document",
      timestamp: options.composition.date || new Date().toISOString(),
      entry: this.entry,
    };

    return body;
  }

  async getpdf(options: { html: string; qrCode?: string }): Promise<string> {
    const pdf = await createPdf(options.html, {
      base64: true,
      paperSize: "A4",
      qrcode: options.qrCode,
    });
    return pdf as string;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }

  statusArray?: Function | undefined;
}
