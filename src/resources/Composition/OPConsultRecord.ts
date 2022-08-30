import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
interface Args {
  composition: COMPOSITOIN;
  chiefComplaints: any;
  allergies?: any;
  medicalHistory?: any;
  investigationAdvice?: any;
  medicationStatement?: any;
  physicalExamination?: any;
  medicationRequest?: any;
  procedure?: any;
  followUp?: any;
}
export class OPConsultRecord extends Composition implements Records {
  create = async (options: Args) => {
    options.composition.section = [];

    options.composition.section.push({
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
          reference: `Condition/${options.chiefComplaints.id}`,
        },
      ],
    });
    options.composition.documentDatahtml = `<b><u>Chief complaints</u></b>${options.chiefComplaints.text.div}`;

    if (options.allergies) {
      options.composition.section.push({
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
            reference: `AllergyIntolerance/${options.allergies.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Allergies</u></b>${options.allergies.text.div}`;
    }

    if (options.medicalHistory) {
      options.composition.section.push({
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
            reference: `Condition/${options.medicalHistory.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Medical History</u></b>${options.medicalHistory.text.div}`;
    }

    if (options.physicalExamination) {
      options.composition.section.push({
        title: "Physical Examination",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371529009",
              display: "physical report",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.physicalExamination.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Physical Examination</u></b>${options.physicalExamination.text.div}`;
    }

    if (options.investigationAdvice) {
      options.composition.section.push({
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
            reference: `ServiceRequest/${options.investigationAdvice.id}`,
          },
        ],
      });
      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Investigation Advice</u></b>${options.investigationAdvice.text.div}`;
    }

    if (options.procedure) {
      options.composition.section.push({
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
      });
      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Procedure</u></b>${options.procedure.text.div}`;
    }
    if (options.followUp) {
      options.composition.section.push({
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
            reference: `Appointment/${options.followUp.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Follow up</u></b>${options.followUp.text.div}`;
    }
    if (options.medicationRequest || options.medicationRequest) {
      let entry = [];
      if (options.medicationStatement) {
        entry.push({
          reference: `MedicationStatement/${options.medicationStatement.id}`,
        });

        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          `<b><u>Medication Statement</u></b>${options.medicationStatement.text.div}`;
      }
      if (options.medicationRequest) {
        entry.push({
          reference: `MedicationRequest/${options.medicationRequest.id}`,
        });
        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          `<b><u>Prescription</u></b>${options.medicationRequest.text.div}`;
      }

      options.composition.section.push({
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
        entry: entry,
      });
    }

    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };
  update = async (options: Args) => {
    options.composition.section = [];

    options.composition.section.push({
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
          reference: `Condition/${options.chiefComplaints.id}`,
        },
      ],
    });
    options.composition.documentDatahtml = `<b><u>Chief Complaints</u></b>${options.chiefComplaints.text.div}`;

    if (options.allergies) {
      options.composition.section.push({
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
            reference: `AllergyIntolerance/${options.allergies.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Allergies</u></b>${options.allergies.text.div}`;
    }

    if (options.medicalHistory) {
      options.composition.section.push({
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
            reference: `Condition/${options.medicalHistory.id}`,
          },
        ],
      });
      options.composition.documentDatahtml =
      options.composition.documentDatahtml +
      `<b><u>Medical History</u></b>${options.medicalHistory.text.div}`;
    }

    if (options.physicalExamination) {
      options.composition.section.push({
        title: "Physical Examination",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371529009",
              display: " physical report",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.physicalExamination.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Physical Examination</u></b>${options.physicalExamination.text.div}`;
    }

    if (options.investigationAdvice) {
      options.composition.section.push({
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
            reference: `ServiceRequest/${options.investigationAdvice.id}`,
          },
        ],
      });
      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Investigation Advice</u></b> ${options.investigationAdvice.text.div}`;
    }

    if (options.procedure) {
      options.composition.section.push({
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
      });
      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Procedure</u></b>${options.procedure.text.div}`;
    }

    if (options.followUp) {
      options.composition.section.push({
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
            reference: `Appointment/${options.followUp.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b><u>Follow up</u></b>${options.followUp.text.div}`;
    }

    if (options.medicationRequest || options.medicationRequest) {
      let entry = [];
      if (options.medicationStatement) {
        entry.push({
          reference: `MedicationStatement/${options.medicationStatement.id}`,
        });

        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          `<b><u>Medication Statement</u></b>${options.medicationStatement.text.div}`;
      }
      if (options.medicationRequest) {
        entry.push({
          reference: `MedicationRequest/${options.medicationRequest.id}`,
        });
        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          `<b><u>Prescription</u></b>${options.medicationRequest.text.div}`;
      }

      options.composition.section.push({
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
        entry: entry,
      });
    }

    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;
    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.updateFhirResource(
      body,
      options.composition.id || "",
      "Composition"
    );
    return res;
  };
}
