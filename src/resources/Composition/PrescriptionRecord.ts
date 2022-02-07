import { Composition, COMPOSITOIN } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { DocumentReference } from "../DocumentReference";
import { MEDICATION_REQUEST } from "../MedicationRequest";

export class PrescriptionRecord extends Composition {
  create = async (options: {
    compositionObj: COMPOSITOIN;
    medicationRequest: any;
  }) => {
    options.compositionObj.section.push({
      reference: `MedicationRequest/${options.medicationRequest.id}`,
      type: "MedicationRequest",
    });
    options.compositionObj.documentDatahtml =
      options.medicationRequest.text.div;
    const body = this.getFHIR(options.compositionObj);
    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };

  update = async (options: {
    compositionObj: COMPOSITOIN;
    medicationRequest: any;
  }) => {
    if (options.compositionObj.id) {
      throw (new Error().message = "id of composition is required");
    }
    options.compositionObj.section.push({
      reference: `MedicationRequest/${options.medicationRequest.id}`,
      type: "MedicationRequest",
    });
    options.compositionObj.documentDatahtml =
      options.medicationRequest.text.div;
    const body = this.getFHIR(options.compositionObj);
    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.updateFhirResource(
      body,
      options.compositionObj.id || "",
      options.medicationRequest
    );
    return res;
  };
}
