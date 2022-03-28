import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { DocumentReference } from "../DocumentReference";
import { MEDICATION_REQUEST } from "../MedicationRequest";

export class PrescriptionRecord extends Composition implements Records {
  create = async (options: {
    composition: COMPOSITOIN;
    medicationRequest: any;
    diagnosis?: any;
  }) => {
    if (options.diagnosis) {
      options.composition.section.push({
        reference: `Condition/${options.diagnosis.id}`,
        type: "Condition",
      });
      options.composition.documentDatahtml = `${options.diagnosis.text.div}`;
    }

    options.composition.section.push({
      reference: `MedicationRequest/${options.medicationRequest.id}`,
      type: "MedicationRequest",
    });
    options.composition.documentDatahtml += options.medicationRequest.text.div;

    const body = this.getFHIR(options.composition);
    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };

  update = async (options: {
    composition: COMPOSITOIN;
    medicationRequest: any;
    diagnosis?: any;
  }) => {
    if (!options.composition.id) {
      throw (new Error().message = "id of composition is required");
    }

    if (options.diagnosis) {
      options.composition.section.push({
        reference: `Condition/${options.diagnosis.id}`,
        type: "Condition",
      });
      options.composition.documentDatahtml = `${options.diagnosis.text.div}`;
    }
    options.composition.section.push({
      reference: `MedicationRequest/${options.medicationRequest.id}`,
      type: "MedicationRequest",
    });
    options.composition.documentDatahtml += options.medicationRequest.text.div;
    const body = this.getFHIR(options.composition);

    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.updateFhirResource(
      body,
      options.composition.id || "",
      "Composition"
    );
    return res;
  };
}
