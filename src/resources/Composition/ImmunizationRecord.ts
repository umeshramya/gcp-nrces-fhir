import { TimeZone } from "../../TimeZone";
import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { IMMUNIZATION } from "../Immunization";
import { IMMUNIZATION_RECOMMENDATION } from "../ImmunizationRecommendation";
import { DOCUMENT_REFERENCE } from "../DocumentReference";

interface Args {
  composition: COMPOSITOIN;
  immunization?: IMMUNIZATION[];
  immunizationRecommendation?: IMMUNIZATION_RECOMMENDATION;
  documentReference?: DOCUMENT_REFERENCE[];
  title?: string;
}

export class ImmunizationRecordComp extends Composition implements Records {
  create = async (options: Args, Credentials?: any, DatabasePath?: any) => {
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

  update = async (options: Args, Credentials?: any, DatabasePath?: any) => {
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

  getOptions = async (options: Args): Promise<Args> => {
    let docHtml = "";
    docHtml += `<h3 style="text-align: center;">Immunization Record</h3>`;

    const sectionTitle = options.title || "Immunization record";
    const sectionEntry: any[] = [];

    // Section 0: Immunization entries
    if (options.immunization && options.immunization.length > 0) {
      docHtml += `<p><b>Vaccines Administered</b></p>`;
      docHtml += `<table style="border-collapse: collapse; width: 100%;" border="1">`;
      docHtml += `<tr><th>Vaccine</th><th>Dose #</th><th>Date</th><th>Brand</th><th>Lot #</th><th>Status</th></tr>`;

      options.immunization.forEach((imm) => {
        sectionEntry.push({
          reference: `Immunization/${imm.id}`,
          type: "Immunization",
        });

        const vaccineName =
          imm.vaccineCode?.text ||
          imm.vaccineCode?.coding?.[0]?.display ||
          "";
        const doseNumber =
          imm.protocolApplied?.[0]?.doseNumberPositiveInt || "";
        const date = imm.occurrenceDateTime
          ? new TimeZone().convertTZ(imm.occurrenceDateTime, process.env.TZ as any, false)
          : "";
        const brand = imm.manufacturer?.display || imm.extension?.[0]?.valueString || "";
        const lot = imm.lotNumber || "";
        const status = imm.status || "";

        docHtml += `<tr><td>${vaccineName}</td><td>${doseNumber}</td><td>${date}</td><td>${brand}</td><td>${lot}</td><td>${status}</td></tr>`;
      });
      docHtml += `</table>`;
    }

    // Section 1 (entries): ImmunizationRecommendation
    if (options.immunizationRecommendation) {
      docHtml += `<p><b>Next Due Dates</b></p>`;
      docHtml += `<table style="border-collapse: collapse; width: 100%;" border="1">`;
      docHtml += `<tr><th>Vaccine</th><th>Dose #</th><th>Due Date</th><th>Notes</th></tr>`;

      sectionEntry.push({
        reference: `ImmunizationRecommendation/${options.immunizationRecommendation.id}`,
        type: "ImmunizationRecommendation",
      });

      options.immunizationRecommendation.recommendation?.forEach((rec) => {
        const vaccineName =
          rec.vaccineCode?.[0]?.text ||
          rec.vaccineCode?.[0]?.coding?.[0]?.display ||
          "";
        const doseNumber = rec.doseNumberPositiveInt || "";
        const dueDate =
          rec.dateCriterion?.[0]?.value
            ? new TimeZone().convertTZ(rec.dateCriterion[0].value, process.env.TZ as any, false)
            : "";
        const notes = rec.description || "";

        docHtml += `<tr><td>${vaccineName}</td><td>${doseNumber}</td><td>${dueDate}</td><td>${notes}</td></tr>`;
      });
      docHtml += `</table>`;
    }

    // Section 2 (entries): DocumentReference (optional)
    if (options.documentReference && options.documentReference.length > 0) {
      options.documentReference.forEach((dr) => {
        sectionEntry.push({
          reference: `DocumentReference/${dr.id}`,
          type: "DocumentReference",
        });
      });
    }

    options.composition.section = [
      {
        title: sectionTitle,
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "41000179103",
              display: "Immunization record",
            },
          ],
        },
        entry: sectionEntry,
      },
    ];

    options.composition.documentDatahtml = docHtml;
    return options;
  };
}
