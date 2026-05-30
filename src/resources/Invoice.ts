/**
 * FHIR Invoice resource class implementing the NRCES Invoice profile
 * https://nrces.in/ndhm/fhir/r4/StructureDefinition/Invoice
 */

import GcpFhirCRUD from "../classess/gcp";

// ABDM Invoice type codes from ValueSet ndhm-invoice-types
export const INVOICE_TYPE_CODES = {
  CONSULTATION: { code: "00", display: "Consultation", system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-billing-codes" },
  PHARMACY:     { code: "01", display: "Pharmacy",     system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-billing-codes" },
  IPD:          { code: "02", display: "IPD",          system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-billing-codes" },
  OPD:          { code: "03", display: "OPD",          system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-billing-codes" },
  OTHERS:       { code: "99", display: "Others",       system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-billing-codes" },
} as const;

// ABDM Price Component codes from ValueSet ndhm-price-components
export const PRICE_COMPONENT_CODES = {
  MRP:      { code: "00", display: "MRP",      system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-price-components" },
  RATE:     { code: "01", display: "Rate",     system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-price-components" },
  DISCOUNT: { code: "02", display: "Discount", system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-price-components" },
  CGST:     { code: "03", display: "CGST",     system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-price-components" },
  SGST:     { code: "04", display: "SGST",     system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-price-components" },
} as const;

export interface INVOICE_IDENTIFIER {
  value: string;
  system?: string;
  type?: { text: string };
}

export interface PRICE_COMPONENT {
  type: "base" | "surcharge" | "deduction" | "discount" | "tax" | "informational";
  code: { coding: Array<{ system: string; code: string; display: string }> };
  amount: { value: number; currency: string };
  factor?: number;
}

export interface INVOICE_LINE_ITEM {
  sequence?: number;
  chargeItemReference: string;
  chargeItemDisplay?: string;
  priceComponent: PRICE_COMPONENT[];
}

export interface INVOICE_OPTIONS {
  id?: string;
  identifier: INVOICE_IDENTIFIER;
  status: "draft" | "issued" | "balanced" | "cancelled" | "entered-in-error";
  type: { coding: Array<{ system: string; code: string; display: string }>; text?: string };
  subject: { reference: string; display?: string };
  date: string;
  lineItem: INVOICE_LINE_ITEM[];
  totalNet: { value: number; currency: string };
  totalGross: { value: number; currency: string };
  recipient?: { reference: string; display?: string };
  issuer?: { reference: string; display?: string };
  participant?: Array<{ role?: { coding: Array<{ system: string; code: string; display: string }> }; actor: { reference: string; display?: string } }>;
  account?: { reference: string; display?: string };
  paymentTerms?: string;
  note?: Array<{ text: string; time?: string }>;
  cancelledReason?: string;
}

export class Invoice {
  /**
   * Map internal voucher type to ABDM Invoice type coding
   */
  static mapVoucherTypeToInvoiceType(voucherType: string): { coding: Array<{ system: string; code: string; display: string }>; text: string } {
    if (voucherType.startsWith("INVOICE_P")) {
      return { coding: [INVOICE_TYPE_CODES.PHARMACY], text: "Pharmacy" };
    }
    if (voucherType.startsWith("INVOICE")) {
      return { coding: [INVOICE_TYPE_CODES.OPD], text: "Consultation" };
    }
    if (voucherType.startsWith("CREDIT_NOTE")) {
      return { coding: [INVOICE_TYPE_CODES.OTHERS], text: "Credit Note" };
    }
    if (voucherType === "RECEIPT") {
      return { coding: [INVOICE_TYPE_CODES.OTHERS], text: "Payment Receipt" };
    }
    if (voucherType === "PAYMENT") {
      return { coding: [INVOICE_TYPE_CODES.OTHERS], text: "Payment Refund" };
    }
    return { coding: [INVOICE_TYPE_CODES.OTHERS], text: "Others" };
  }

  /**
   * Build a price component for a line item
   */
  static buildPriceComponent(
    type: PRICE_COMPONENT["type"],
    code: { code: string; display: string; system: string },
    amount: number,
    currency: string = "INR"
  ): PRICE_COMPONENT {
    return {
      type,
      code: { coding: [{ system: code.system, code: code.code, display: code.display }] },
      amount: { value: parseFloat(amount.toFixed(2)), currency },
    };
  }

  /**
   * Build price components array for a single line item from GST item data
   */
  static buildLineItemPriceComponents(
    quantity: number,
    salePrice: number,
    discountPercent: number = 0,
    cgst: number = 0,
    sgst: number = 0
  ): PRICE_COMPONENT[] {
    const baseAmount = quantity * salePrice;
    const discountAmount = baseAmount * (discountPercent / 100);
    const components: PRICE_COMPONENT[] = [];

    components.push(Invoice.buildPriceComponent("base", PRICE_COMPONENT_CODES.RATE, baseAmount));

    if (discountAmount > 0) {
      components.push(Invoice.buildPriceComponent("discount", PRICE_COMPONENT_CODES.DISCOUNT, -discountAmount));
    }
    if (cgst > 0) {
      components.push(Invoice.buildPriceComponent("tax", PRICE_COMPONENT_CODES.CGST, cgst));
    }
    if (sgst > 0) {
      components.push(Invoice.buildPriceComponent("tax", PRICE_COMPONENT_CODES.SGST, sgst));
    }

    return components;
  }

  /**
   * Calculate net total from line items (base - discounts; taxes are added separately in totalGross)
   */
  static calculateNetTotal(lineItems: INVOICE_LINE_ITEM[]): number {
    return lineItems.reduce((total, item) => {
      const itemTotal = item.priceComponent.reduce((sum, pc) => {
        if (pc.type === "base" || pc.type === "surcharge") return sum + pc.amount.value;
        if (pc.type === "discount" || pc.type === "deduction") return sum + pc.amount.value;
        return sum;
      }, 0);
      return total + itemTotal;
    }, 0);
  }

  /**
   * Calculate gross total from line items (base - discounts + taxes)
   */
  static calculateGrossTotal(lineItems: INVOICE_LINE_ITEM[]): number {
    return lineItems.reduce((total, item) => {
      const itemTotal = item.priceComponent.reduce((sum, pc) => sum + pc.amount.value, 0);
      return total + itemTotal;
    }, 0);
  }

  /**
   * Generate the FHIR Invoice resource JSON
   */
  static toFhir(options: INVOICE_OPTIONS): any {
    const body: any = {
      resourceType: "Invoice",
      id: options.id || undefined,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Invoice"],
        lastUpdated: new Date().toISOString(),
      },
      identifier: [{
        system: options.identifier.system || "https://www.nicehms.com/invoice",
        value: options.identifier.value,
      }],
      status: options.status,
      type: options.type,
      subject: options.subject,
      date: options.date,
      lineItem: options.lineItem.map((item, idx) => ({
        sequence: item.sequence || idx + 1,
        chargeItemReference: { reference: item.chargeItemReference, type: "ChargeItem" },
        priceComponent: item.priceComponent,
      })),
      totalNet: { value: options.totalNet.value, currency: options.totalNet.currency || "INR" },
      totalGross: { value: options.totalGross.value, currency: options.totalGross.currency || "INR" },
    };

    if (options.recipient) body.recipient = options.recipient;
    if (options.issuer) body.issuer = options.issuer;
    if (options.participant) body.participant = options.participant;
    if (options.account) body.account = options.account;
    if (options.paymentTerms) body.paymentTerms = options.paymentTerms;
    if (options.note) body.note = options.note;
    if (options.cancelledReason) body.cancelledReason = options.cancelledReason;

    return body;
  }

  /**
   * Store an Invoice resource in GCP FHIR store
   */
  static async create(options: INVOICE_OPTIONS, creds?: any, dbPath?: any): Promise<any> {
    const fhirBody = Invoice.toFhir(options);
    const gcpFhirCrud = creds ? new GcpFhirCRUD(creds, dbPath) : new GcpFhirCRUD();
    return await gcpFhirCrud.createFhirResource(fhirBody, "Invoice" as any);
  }

  /**
   * Update an existing Invoice resource
   */
  static async update(id: string, options: INVOICE_OPTIONS, creds?: any, dbPath?: any): Promise<any> {
    const fhirBody = Invoice.toFhir({ ...options, id });
    const gcpFhirCrud = creds ? new GcpFhirCRUD(creds, dbPath) : new GcpFhirCRUD();
    return await gcpFhirCrud.updateFhirResource(fhirBody, id, "Invoice" as any);
  }

  /**
   * Get Invoice resource from GCP FHIR store
   */
  static async get(id: string, creds?: any, dbPath?: any): Promise<any> {
    const gcpFhirCrud = creds ? new GcpFhirCRUD(creds, dbPath) : new GcpFhirCRUD();
    return await gcpFhirCrud.getFhirResource(id, "Invoice" as any);
  }
}
