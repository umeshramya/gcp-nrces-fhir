import { credentials, databasePath } from "./config/index";
import { htmlToText } from "html-to-text";
import GcpFhirCRUD from "./classess/gcp";
import GcpFhirSearch from "./classess/gcpSearch";
import ResourceFactory from "./classess/ResourceFactory";
import { PATIENT, PatientResource, Patient } from "./resources/Patient";
import { RelatedPerson, RELATED_PERSON } from "./resources/RelatedPerson"
import {
  PRACTITIONER,
  PractitionerResource,
  Practitioner,
} from "./resources/Practitioner";

import {
  PRACTITIONER_ROLE,
  PractitionerRole,
  NOT_AVAILABLE,
  AVAILABLE_TIME,
} from "./resources/PractitionerRole";
import {
  ORGANIZATION,
  OrganizationResource,
  Organization,
} from "./resources/Organization";
import {
  ENCOUNTER,
  ENCOUNTER_PARTICIPANT,
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
  allergyClinicalStatusArray,
  allergyVerificationStatusArray,
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
import { COMPOSITOIN, Composition } from "./resources/Composition/index";
import { PrescriptionRecord } from "./resources/Composition/PrescriptionRecord";
import { OPConsultRecord } from "./resources/Composition/OPConsultRecord";
import {DischargeSUmmery} from "./resources/Composition/DischargeSummary"
import { DiagnosticReportComp } from "./resources/Composition/DiagnosticReportComp";
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

import { ServiceRequest, SERVICE_REQUEST } from "./resources/ServiceRequest";
import { SCHEDULE, Schedule } from "./resources/Schedule"
import { SLOT, Slot } from "./resources/Slot"
import { PrescriptionBundle } from "./resources/Bundle/Prescription";
import { DiagnsoticReportBundle } from "./resources/Bundle/DiagnsoticReport"
import { OPConsultationBundle } from "./resources/Bundle/OPConsutation"
import {
  DiagnosticReport,
  DIAGNOSTIC_REPORT,
} from "./resources/DiagnosticReport";
import { Media, MEDIA } from "./resources/Media";
import { Observation, OBSERVATION } from "./resources/Observation";

export { GcpFhirCRUD, GcpFhirSearch, resourceTypeArray, ResourceFactory };
export { htmlToText }
export type { resourceType };
export { PATIENT, PatientResource, Patient };
export { RelatedPerson, RELATED_PERSON }

export { ORGANIZATION, OrganizationResource, Organization };
export { PRACTITIONER, PractitionerResource, Practitioner };
export { PRACTITIONER_ROLE, PractitionerRole, NOT_AVAILABLE, AVAILABLE_TIME };

import { Specimen, SPECIMEN } from "./resources/Specimen";

export {
  ENCOUNTER,
ENCOUNTER_PARTICIPANT,
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
  allergyClinicalStatusArray as allergyStatusArray,
  allergyVerificationStatusArray as verificationStatusArray,
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
export { OPConsultRecord };
export {DischargeSUmmery}
export { DiagnosticReportComp };
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
export { ServiceRequest, SERVICE_REQUEST };
export { SCHEDULE, Schedule }
export { SLOT, Slot }
type Credentials = typeof credentials;
type DatabasePath = typeof databasePath;

export interface GcpNrcesFhirType {
  Credentials: Credentials;
  DatabasePath: DatabasePath;
}

export { PrescriptionBundle };
export { DiagnsoticReportBundle }
export { OPConsultationBundle }

export { Specimen, SPECIMEN };
export { DiagnosticReport, DIAGNOSTIC_REPORT };
export { Media, MEDIA };
export { Observation, OBSERVATION };

import { LOINC_SCALE, LoincScale } from "./config/index";
export type { LoincScale };
export { LOINC_SCALE };

import { PDF_HEADER } from "js-ts-report";
export { PDF_HEADER };
