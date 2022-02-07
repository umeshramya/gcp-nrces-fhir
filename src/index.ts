import GcpFhirCRUD from "./classess/gcp";
import GcpFhirSearch from "./classess/gcpSearch";
import { PATIENT, PatientResource, Patient } from "./resources/Patient";
import {
  PRACTITIONER,
  PractitionerResource,
  Practitioner,
} from "./resources/Practitioner";
import {
  ORGANIZATION,
  OrganizationResource,
  Organization,
} from "./resources/Organization";
import {
  ENCOUNTER,
  Encounter,
  EncounterResource,
  EncounterHospitalizationDischargeDispositionArray,
  EncounterStatusArray,
  EncounterClassArray,
} from "./resources/Encounter";
import {
  EncounterClass,
  EncounterStatus,
  EncounterHospitalizationDischargeDisposition,
} from "./resources/Encounter";
import { resourceType, resourceTypeArray } from "./config";

import { Condition, CONDITION } from "./resources/Condition";
import { Procedure, PROCEDURE } from "./resources/Procedure";
import {
  allergyStatusArray,
  verificationStatusArray,
  ALLERGY_INTOLERANCE,
  AllergyIntolerance,
} from "./resources/AllergyIntolerance";
import {
  APPOINTMENT,
  Appointment,
  AppointmentStatusArray,
  AppointmentActorStatusArray,
} from "./resources/Appointment";
import { DOCUMENT_BUNDLE, DocumentBundle } from "./resources/DocumentBundle";
import { COMPOSITOIN, Composition } from "./resources/Composition";
import { PrescriptionRecord } from "./resources/Composition/PrescriptionRecord";
import {
  DOCUMENT_REFERENCE,
  DocumentReference,
  documentDocStatusArrey,
  documentStatusArrey,
} from "./resources/DocumentReference";
import {
  MEDICATION_REQUEST,
  MedicatioRequestIntentArray,
  MedicatioRequestStatusArray,
  MedicationRequest,
} from "./resources/MedicationRequest";
import {
  MEDICATION_STATEMENT,
  MedicationStatement,
  MedicationStatementStatusArray,
} from "./resources/MedicationStatement";

export { GcpFhirCRUD, GcpFhirSearch, resourceTypeArray };
export type { resourceType };
export { PATIENT, PatientResource, Patient };
export { ORGANIZATION, OrganizationResource, Organization };
export { PRACTITIONER, PractitionerResource, Practitioner };

export {
  ENCOUNTER,
  Encounter,
  EncounterResource,
  EncounterHospitalizationDischargeDispositionArray,
  EncounterStatusArray,
  EncounterClassArray,
};
export type {
  EncounterClass,
  EncounterStatus,
  EncounterHospitalizationDischargeDisposition,
};

export { CONDITION, Condition };
export { Procedure, PROCEDURE };
export {
  allergyStatusArray,
  verificationStatusArray,
  ALLERGY_INTOLERANCE,
  AllergyIntolerance,
};
export {
  APPOINTMENT,
  Appointment,
  AppointmentStatusArray,
  AppointmentActorStatusArray,
};
export { DOCUMENT_BUNDLE, DocumentBundle };
export { COMPOSITOIN, Composition };
export { PrescriptionRecord };
export {
  DOCUMENT_REFERENCE,
  DocumentReference,
  documentDocStatusArrey,
  documentStatusArrey,
};
export {
  MEDICATION_STATEMENT,
  MedicationStatement,
  MedicationStatementStatusArray,
};
export {
  MEDICATION_REQUEST,
  MedicatioRequestIntentArray,
  MedicatioRequestStatusArray,
  MedicationRequest,
};
