import { v4 as uuidv4 } from "uuid";
import {
  COMPOSITOIN,
  DocumentBundle,
  DOCUMENT_BUNDLE,
  GcpFhirCRUD,
  resourceType,
} from "..";

interface SECTION {
  chiefComplints: any;
  allergyIntolerance: any;
  medicalHistroy: any;
  serviceRequest: any;
  medicationStatement: any;
  medicationRequest: any;
  procedure: any;
  appointment: any;
  documentReference: any;
}

interface NON_SECTION {
  patient: any;
  composition: any;
  practitioner: any;
  encounter: any;
  documentReference: any;
}

export class MakeDocumentBundle {
  private nonSection!: any[];

  private _section: any[] = [];
  private _bundleEntry: any[] = [];

  public get section(): any[] {
    return this._section;
  }
  public set section(value: any[]) {
    this._section = value;
  }

  public get bundleEntry(): any[] {
    return this._bundleEntry;
  }
  public set bundleEntry(value: any[]) {
    this._bundleEntry = value;
  }

  private createBundleEntry(options: {
    resourceType: resourceType;
    gcpFhirId: string;
    resource: any;
  }) {
    const index = this._bundleEntry.findIndex(
      (el) => el.fullUrl == `${options.resourceType}/${options.gcpFhirId}`
    );

    const entry = {
      fullUrl: `${options.resourceType}/${options.gcpFhirId}`,
      resource: options.resource,
    };

    if (index < 0) {
      this._bundleEntry.push(entry);
    } else {
      this._bundleEntry[index] = entry;
    }
  }

  private createSectionEntry(options: { section: any }) {
    const index = this._section.findIndex(
      (el) => el.title == options.section.title
    );

    if (index < 0) {
      this._section.push(options.section);
    } else {
      this._section[index] = options.section;
    }
  }

  setEntries(options: Partial<SECTION>) {
    let sectionBody: any;
    let index: number;

    // "Chief complaints"
    if (options.chiefComplints) {
      this.createBundleEntry({
        gcpFhirId: options.chiefComplints.id,
        resource: options.chiefComplints,
        resourceType: "Condition",
      });

      sectionBody = {
        title: "Chief complaints",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "422843007",
              display: "Chief complaint section",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.chiefComplints.id}`,
          },
        ],
      };

      this, this.createSectionEntry({ section: sectionBody });
    }

    // "Allergies"
    if (options.allergyIntolerance) {
      this.createBundleEntry({
        resourceType: "AllergyIntolerance",
        gcpFhirId: options.allergyIntolerance.id,
        resource: options.allergyIntolerance,
      });

      const sectionBody = {
        title: "Allergies",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "722446000",
              display: "Allergy record",
            },
          ],
        },
        entry: [
          {
            reference: `AllergyIntolerance/${options.allergyIntolerance.id}`,
          },
        ],
      };

      this.createSectionEntry({ section: sectionBody });
    }

    // "Medical History"
    if (options.medicalHistroy) {
      this.createBundleEntry({
        resource: options.medicalHistroy,
        resourceType: "Condition",
        gcpFhirId: options.medicalHistroy.id,
      });
      const sectionBody = {
        title: "Medical History",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371529009",
              display: "History and physical report",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.medicalHistroy.id}`,
          },
        ],
      };

      this.createSectionEntry({ section: sectionBody });
    }

    // "Order document"
    if (options.serviceRequest) {
      this.createBundleEntry({
        resourceType: "ServiceRequest",
        gcpFhirId: options.serviceRequest.id,
        resource: options.serviceRequest,
      });
      const sectionBody = {
        title: "Investigation Advice",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "721963009",
              display: "Order document",
            },
          ],
        },
        entry: [
          {
            reference: `ServiceRequest/${options.serviceRequest.id}`,
          },
        ],
      };
      this.createSectionEntry({ section: sectionBody });
    }

    //  "Medications"
    if (options.medicationStatement && options.medicationRequest) {
      this.createBundleEntry({
        resourceType: "MedicationStatement",
        gcpFhirId: options.medicationStatement.id,
        resource: options.medicationStatement,
      });

      this.createBundleEntry({
        gcpFhirId: options.medicationRequest.id,
        resource: options.medicationRequest,
        resourceType: "MedicationRequest",
      });

      const sectionBody = {
        title: "Medications",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "721912009",
              display: "Medication summary document",
            },
          ],
        },
        entry: [
          {
            reference: `MedicationStatement/${options.medicationStatement.id}`,
          },
          {
            reference: `MedicationRequest/${options.medicationRequest.id}`,
          },
        ],
      };

      this.createSectionEntry({ section: sectionBody });
    }

    // "Procedure"
    if (options.procedure) {
      this.createBundleEntry({
        gcpFhirId: options.procedure.id,
        resource: options.procedure,
        resourceType: "Procedure",
      });
      const sectionBody = {
        title: "Procedure",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371525003",
              display: "Clinical procedure report",
            },
          ],
        },
        entry: [
          {
            reference: `Procedure/${options.procedure.id}`,
          },
        ],
      };
      this.createSectionEntry({ section: sectionBody });
    }

    // "Follow Up"
    if (options.appointment) {
      this.createBundleEntry({
        gcpFhirId: options.appointment.id,
        resource: options.appointment,
        resourceType: "Appointment",
      });
      const sectionBody = {
        title: "Follow Up",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "736271009",
              display: "Outpatient care plan",
            },
          ],
        },
        entry: [
          {
            reference: `Appointment/${options.appointment.id}`,
          },
        ],
      };
      this.createSectionEntry({ section: sectionBody });
    }

    // "Document Reference"
    if (options.documentReference) {
      this.createBundleEntry({
        gcpFhirId: options.documentReference.id,
        resource: options.documentReference,
        resourceType: "DocumentReference",
      });
      const sectionBody = {
        title: "Document Reference",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371530004",
              display: "Clinical consultation report",
            },
          ],
        },
        entry: [
          {
            reference: `DocumentReference/${options.documentReference.id}`,
          },
        ],
      };
      this.createSectionEntry({ section: sectionBody });
    }
  }
}







// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const full = [
//   {
//     fullUrl: "Condition/3",
//     resource: {
//       resourceType: "Condition",
//       id: "3",
//       meta: {
//         profile: [
//           "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition",
//         ],
//       },
//       text: {
//         status: "generated",
//         div: '<div xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-IN" lang="en-IN">Past Medical Problem of Diabetes mellitus type 2</div>',
//       },
//       clinicalStatus: {
//         coding: [
//           {
//             system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
//             code: "recurrence",
//             display: "Recurrence",
//           },
//         ],
//       },
//       code: {
//         coding: [
//           {
//             system: "http://snomed.info/sct",
//             code: "44054006",
//             display: "Diabetes mellitus type 2",
//           },
//         ],
//         text: "Diabetes mellitus type 2",
//       },
//       subject: {
//         reference: "Patient/1",
//       },
//     },
//   },
// ];
