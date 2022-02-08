import { Composition, COMPOSITOIN, Records } from ".";

export class OPConsultRecord extends Composition implements Records {
  create = async (options: {
    composition: COMPOSITOIN;
    chiefComplinats: any;
    allergies?: any;
    medicalHistory?: any;
  }) => {
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
          reference: `Condition/${options.chiefComplinats.id}`,
        },
      ],
    });
    options.composition.documentDatahtml = options.chiefComplinats.text.div;

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
        options.composition.documentDatahtml + options.allergies.text.div;
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
        options.composition.documentDatahtml + options.medicalHistory.text.div;
    }
  };
  update = async (options: { composition: COMPOSITOIN }) => {};
}
