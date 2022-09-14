import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
interface Args {
  composition: COMPOSITOIN;
  PresentingProblems: any;
  allergies?: any;
  PhysicalExamination?: any;
  investigationAdvice?: any;
  medicationStatement?: any;
  medicationRequest?: any;
  procedure?: any;
  carePlan?: any;
  followUp?: any;
}
export class DischargeSUmmery extends Composition implements Records {

  create = async (options: Args) => {
    options.composition.section = [];

    options.composition.section.push({
      title: "Presenting Problems",
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
          reference: `Condition/${options.PresentingProblems.id}`,
        },
      ],
    });
    options.composition.documentDatahtml = `<h6>Presenting Problems</h> ${options.PresentingProblems.text.div}`;

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
        `<b>Allergies</b> ${options.allergies.text.div}`;
    }

    if (options.PhysicalExamination) {
      options.composition.section.push({
        title: "Physical Examination",
        code: {
          coding: [
            {
              system: "https://projecteka.in/sct",
              code: "425044008",
              display: "Physical exam section",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.PhysicalExamination.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b></b> ${options.PhysicalExamination.text.div}`;
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
        `<b>Investigation Advice</b> ${options.investigationAdvice.text.div}`;
    }

    if (options.medicationRequest || options.medicationRequest) {
      let entry = [];
      if (options.medicationStatement) {
        entry.push({
          reference: `MedicationStatement/${options.medicationStatement.id}`,
        });

        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          `<b>Medication Statement</b>${options.medicationStatement.text.div}`;
      }
      if (options.medicationRequest) {
        entry.push({
          reference: `MedicationRequest/${options.medicationRequest.id}`,
        });
        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          `<b>Prescription</b>${options.medicationRequest.text.div}`;
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
            reference: `Procedure/${options.procedure}`,
          },
        ],
      });
      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b>Procedure</b>${options.procedure.text.div}`;
    }

    if (options.carePlan) {
      options.composition.section.push({
        title: "Care Plan",
        code: {
          coding: [
            {
              system: "https://projecteka.in/sct",
              code: "734163000",
              display: "Care Plan",
            },
          ],
        },
        entry: [
          {
            reference: `CarePlan/${options.carePlan.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b>Care Plan</b>${options.carePlan.text.div}`;
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
        `<b>Follow up</b>${options.followUp.text.div}`;
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
      title: "Presenting Problems",
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
          reference: `Condition/${options.PresentingProblems.id}`,
        },
      ],
    });
    options.composition.documentDatahtml = `<b>Chief Complaints</b> ${options.PresentingProblems.text.div}`;

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
        `<b>Allergies</b> ${options.allergies.text.div}`;
    }

    if (options.PhysicalExamination) {
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
            reference: `Condition/${options.PhysicalExamination.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b>Medical History</b> ${options.PhysicalExamination.text.div}`;
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
        `<b>Investigation Advice</b> ${options.investigationAdvice.text.div}`;
    }

    if (options.medicationRequest || options.medicationRequest) {
      let entry = [];
      if (options.medicationStatement) {
        entry.push({
          reference: `MedicationStatement/${options.medicationStatement.id}`,
        });

        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          `<b>Medication Statement</b>${options.medicationStatement.text.div}`;
      }
      if (options.medicationRequest) {
        entry.push({
          reference: `MedicationRequest/${options.medicationRequest.id}`,
        });
        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          `<b>Prescription</b>${options.medicationRequest.text.div}`;
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
            reference: `Procedure/${options.procedure}`,
          },
        ],
      });
      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b>Procedure</b>${options.procedure.text.div}`;
    }

    if (options.carePlan) {
      options.composition.section.push({
        title: "Care Plan",
        code: {
          coding: [
            {
              system: "https://projecteka.in/sct",
              code: "734163000",
              display: "Care Plan",
            },
          ],
        },
        entry: [
          {
            reference: `CarePlan/${options.carePlan.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<b>Care Plan</b>${options.carePlan.text.div}`;
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
        `<b>Follow up</b>${options.followUp.text.div}`;
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

  getOptions = (options:Args):string=>{
    let docHTML=""
    return docHTML
  }
}

const test = {
  resourceType: "Composition",
  id: "fb8c668f-8e53-47dd-802b-aa2ff4763e8c",
  identifier: {
    system: "https://www.max.in/document",
    value: "fb8c668f-8e53-47dd-802b-aa2ff4763e8c",
  },
  status: "final",
  type: {
    coding: [
      {
        system: "https://projecteka.in/sct",
        code: "373942005",
        display: "Discharge Summary Record",
      },
    ],
  },
  subject: {
    reference: "Patient/NCC1543",
  },
  encounter: {
    reference: "Encounter/ece47f53-28dc-48bf-9232-79efa964defd",
  },
  date: "2019-04-19T00:00:00.605+05:30",
  author: [
    {
      reference: "Practitioner/MAX191101",
      display: "Dr Akshatha M K",
    },
  ],
  title: "Discharge Summary Document",
  custodian: {
    reference: "Organization/MaxSaket01",
  },
  section: [
    {
      title: "Presenting Problems",
      code: {
        coding: [
          {
            system: "https://projecteka.in/sct",
            code: "422843007",
            display: "Chief Complaint Section",
          },
        ],
      },
      entry: [
        {
          reference: "Condition/194208f1-a058-4b21-88bd-7ca38bbfe68f",
        },
      ],
    },
    {
      title: "Allergy Section",
      code: {
        coding: [
          {
            system: "https://projecteka.in/sct",
            code: "722446000",
            display: "Allergy Record",
          },
        ],
      },
      entry: [
        {
          reference: "AllergyIntolerance/example",
        },
        {
          reference: "AllergyIntolerance/medication",
        },
      ],
    },
    {
      title: "Physical Examination",
      code: {
        coding: [
          {
            system: "https://projecteka.in/sct",
            code: "425044008",
            display: "Physical exam section",
          },
        ],
      },
      entry: [
        {
          reference: "Observation/5d4cf222-76d0-4da1-9beb-c44d676db85c",
        },
        {
          reference: "Observation/3e1db0b3-46bb-4f23-a5ea-6ed3b3a34cf2",
        },
      ],
    },
    {
      title: "Prescribed medications during Admission",
      code: {
        coding: [
          {
            system: "https://projecteka.in/sct",
            code: "440545006",
            display: "Prescription",
          },
        ],
      },
      entry: [
        {
          reference: "MedicationRequest/b07e48bc-1554-4eaa-bee3-0370982eb8f0",
        },
        {
          reference: "MedicationRequest/27e444a7-379d-44b8-9e4b-24a52a29ff8e",
        },
      ],
    },
    {
      title: "Clinical consultation",
      code: {
        coding: [
          {
            system: "https://projecteka.in/sct",
            code: "371530004",
            display: "Clinical consultation report",
          },
        ],
      },
      entry: [
        {
          reference: "DocumentReference/4c641e52-0d59-4835-8752-e380e89c694c",
        },
      ],
    },
    {
      title: "Procedures",
      code: {
        coding: [
          {
            system: "https://projecteka.in/sct",
            code: "371525003",
            display: "Clinical procedure report",
          },
        ],
      },
      entry: [
        {
          reference: "Procedure/e6c5e7fd-c22a-4d5a-a568-270753e51249",
        },
      ],
    },
    {
      title: "Care Plan",
      code: {
        coding: [
          {
            system: "https://projecteka.in/sct",
            code: "734163000",
            display: "Care Plan",
          },
        ],
      },
      entry: [
        {
          reference: "CarePlan/00bc7230-101b-4339-bbed-89be3918663c",
        },
      ],
    },
    {
      title: "Follow up",
      code: {
        coding: [
          {
            system: "https://projecteka.in/sct",
            code: "736271009",
            display: "Follow up",
          },
        ],
      },
      entry: [
        {
          reference: "Appointment/4976fe22-7475-4545-a11b-5160b4950878",
        },
      ],
    },
  ],
  attester: [
    {
      mode: "official",
      time: "2019-01-04T09:10:14Z",
      party: {
        reference: "Organization/MaxSaket01",
        display: "Max Super Speciality Hospital, Saket",
      },
    },
  ],
};
