/**
 * FHIR ChargeItem resource for ABDM Invoice line items
 */

import GcpFhirCRUD from "../classess/gcp";

export interface CHARGE_ITEM_CODE {
  coding: Array<{ system: string; code: string; display: string }>;
  text?: string;
}

export interface CHARGE_ITEM_OPTIONS {
  id?: string;
  identifier?: Array<{ system: string; value: string }>;
  status: "planned" | "billable" | "not-billable" | "aborted" | "billed" | "entered-in-error" | "unknown";
  code: CHARGE_ITEM_CODE;
  subject: { reference: string; display?: string };
  context?: { reference: string; display?: string };
  occurrenceDateTime?: string;
  performer?: Array<{ actor: { reference: string; display?: string } }>;
  performingOrganization?: { reference: string; display?: string };
  requestingOrganization?: { reference: string; display?: string };
  quantity?: { value: number; unit?: string };
  factorOverride?: number;
  priceOverride?: { value: number; currency: string };
  overrideReason?: string;
  enterer?: { reference: string; display?: string };
  enteredDate?: string;
  reason?: Array<{ system?: string; code?: string; display?: string }>;
  service?: Array<{ reference: string }>;
  note?: Array<{ text: string; time?: string }>;
}

export class ChargeItem {
  /**
   * Convert internal item data to FHIR ChargeItem JSON
   */
  static toFhir(options: CHARGE_ITEM_OPTIONS): any {
    const body: any = {
      resourceType: "ChargeItem",
      id: options.id || undefined,
      meta: {
        profile: ["http://hl7.org/fhir/R4/chargeitem.html"],
        lastUpdated: new Date().toISOString(),
      },
      status: options.status || "billable",
      code: {
        coding: options.code.coding,
        text: options.code.text || options.code.coding[0]?.display || "",
      },
      subject: options.subject,
    };

    if (options.identifier) body.identifier = options.identifier;
    if (options.context) body.context = options.context;
    if (options.occurrenceDateTime) body.occurrenceDateTime = options.occurrenceDateTime;
    if (options.performer) body.performer = options.performer;
    if (options.performingOrganization) body.performingOrganization = options.performingOrganization;
    if (options.requestingOrganization) body.requestingOrganization = options.requestingOrganization;
    if (options.quantity) body.quantity = options.quantity;
    if (options.factorOverride != null) body.factorOverride = options.factorOverride;
    if (options.priceOverride) body.priceOverride = options.priceOverride;
    if (options.overrideReason) body.overrideReason = options.overrideReason;
    if (options.enterer) body.enterer = options.enterer;
    if (options.enteredDate) body.enteredDate = options.enteredDate;
    if (options.reason) body.reason = options.reason;
    if (options.service) body.service = options.service;
    if (options.note) body.note = options.note;

    return body;
  }

  /**
   * Build a ChargeItem from a voucher line item
   */
  static fromVoucherItem(
    item: {
      itemName?: string;
      itemId?: number;
      item?: string;
      quantity?: number;
      unit?: string;
      salePrice?: number;
    },
    patientReference: string,
    encounterReference?: string,
    organizationReference?: string
  ): CHARGE_ITEM_OPTIONS {
    const itemName = item.itemName || item.item || `Item #${item.itemId}`;
    const qty = item.quantity || 1;

    return {
      status: "billable",
      code: {
        coding: [{
          system: "https://www.nicehms.com/items",
          code: String(item.itemId || itemName),
          display: itemName,
        }],
        text: itemName,
      },
      subject: { reference: patientReference },
      context: encounterReference ? { reference: encounterReference } : undefined,
      performingOrganization: organizationReference ? { reference: organizationReference } : undefined,
      quantity: { value: qty, unit: item.unit || "each" },
      priceOverride: { value: item.salePrice || 0, currency: "INR" },
    };
  }

  /**
   * Store a ChargeItem in GCP FHIR store
   */
  static async create(options: CHARGE_ITEM_OPTIONS, creds?: any, dbPath?: any): Promise<any> {
    const fhirBody = ChargeItem.toFhir(options);
    const gcpFhirCrud = creds ? new GcpFhirCRUD(creds, dbPath) : new GcpFhirCRUD();
    return await gcpFhirCrud.createFhirResource(fhirBody, "ChargeItem" as any);
  }

  /**
   * Get ChargeItem from GCP FHIR store
   */
  static async get(id: string, creds?: any, dbPath?: any): Promise<any> {
    const gcpFhirCrud = creds ? new GcpFhirCRUD(creds, dbPath) : new GcpFhirCRUD();
    return await gcpFhirCrud.getFhirResource(id, "ChargeItem" as any);
  }
}
