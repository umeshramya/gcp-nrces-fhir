import { credentials, databasePath } from "./config/index";
import { htmlToText } from "html-to-text";
import GcpFhirCRUD from "./classess/gcp";
import GcpFhirSearch from "./classess/gcpSearch";
import ResourceFactory from "./classess/ResourceFactory";
import { PATIENT, PatientResource, Patient } from "./resources/Patient";
import { RelatedPerson, RELATED_PERSON } from "./resources/RelatedPerson"
import {resourceType as ResourceType} from "./config/index"
import { GOAL, Goal } from "./resources/Goal";
import { CARE_PLAN, CarePlan, careplanActivityDetailStatusArray } from "./resources/CarePlan";
import { PaymentNoctice, PAYMENT_NOTICE } from "./hcx/PaymentNotice";

export type {
  ResourceType
}
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
import { COMPOSITOIN, Composition, emptySign } from "./resources/Composition/index";
import { PrescriptionRecord } from "./resources/Composition/PrescriptionRecord";
import { OPConsultRecord } from "./resources/Composition/OPConsultRecord";
import {InitialAssessment} from "./resources/Composition/InitialAssessment"
import {DischargeSUmmery} from "./resources/Composition/DischargeSummary"
import { DiagnosticReportComp } from "./resources/Composition/DiagnosticReportComp";
import { HealthDocumentRecord } from "./resources/Composition/HealthDocumentRecord";
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
import {LOCATION, Location, bedOPertaionalStatusArray, BedOPertaionalStatus, locationFormTypesArray, locationFormTypes} from "./resources/Location"

import { ServiceRequest, SERVICE_REQUEST, serviceRequestCategoryArray } from "./resources/ServiceRequest";
import { SCHEDULE, Schedule } from "./resources/Schedule"
import { SLOT, Slot } from "./resources/Slot"
import { PrescriptionBundle } from "./resources/Bundle/Prescription";
import { DiagnsoticReportBundle } from "./resources/Bundle/DiagnsoticReport"
import { OPConsultationBundle } from "./resources/Bundle/OPConsultation"
import {DischargeSummaryBundle} from "./resources/Bundle/DischargeSummary"
import { HealthDocumentBundle } from "./resources/Bundle/HealthDocumnet";
import {
  DiagnosticReport,
  DIAGNOSTIC_REPORT,
} from "./resources/DiagnosticReport";
import { Media, MEDIA } from "./resources/Media";
import { Observation, OBSERVATION } from "./resources/Observation";
import { Specimen, SPECIMEN } from "./resources/Specimen";
import {Coverage, COVERAGE } from "./hcx/Coverage";
import {COVERAGE_ELIGIBILITY_REQUEST, CoverageEligibilityRequest} from "./hcx/CoverageEligibilityRequest"
import {CoverageEligibilityRequestBundle} from "./hcx/bundle/CoverageEligibiltyRequestBundle"
import {COVERAGE_ELIGIBILITY_REQUEST_PRIORITY} from "./hcx/CoverageEligibilityRequest"
import {COVERAGE_ELIGIBILITY_RESPONSE, CoverageEligibiltyResponse} from "./hcx/CoverageEligibilityResponse"

import {TASK,Task } from "./hcx/Task"

import { Immunization , IMMUNIZATION } from "./resources/Immunization";
import { ImmunizationRecommendation, IMMUNIZATION_RECOMMENDATION } from "./resources/ImmunizationRecommendation";
import {CreatePdf} from "js-ts-report"
import { Claim, CLAIM } from "./hcx/Claim";
import { ClaimRequestBundle } from "./hcx/bundle/ClaimRequestBundle";
import { ClaimResponse } from "./hcx/ClaimResponse";

import {COMMUNICATION, Communication} from "./hcx/Communication"
import { PaymentReconciliation, PAYMENT_RECONCILIATION } from "./hcx/PaymentReconciliation";
import {CommunicationRequest} from "./hcx/CommunicationRequest"

import {InsurancePlan, INSURANCE_PLAN} from "./hcx/Insuranceplan"

import { TaskBundle } from "./hcx/bundle/TaskBundle";

export { GcpFhirCRUD, GcpFhirSearch, resourceTypeArray, ResourceFactory };
export { htmlToText }
export type { resourceType };
export { PATIENT, PatientResource, Patient };
export { RelatedPerson, RELATED_PERSON }

export { ORGANIZATION, OrganizationResource, Organization };
export { PRACTITIONER, PractitionerResource, Practitioner };
export { PRACTITIONER_ROLE, PractitionerRole, NOT_AVAILABLE, AVAILABLE_TIME };
export {COVERAGE_ELIGIBILITY_RESPONSE, CoverageEligibiltyResponse}





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
export { COMPOSITOIN, Composition , emptySign};
export { PrescriptionRecord };
export {HealthDocumentRecord}
export { OPConsultRecord };
export {DischargeSUmmery}
export { DiagnosticReportComp };

export {InitialAssessment}
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
export { ServiceRequest, SERVICE_REQUEST, serviceRequestCategoryArray };
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
export {DischargeSummaryBundle} 
export { Specimen, SPECIMEN };
export { DiagnosticReport, DIAGNOSTIC_REPORT };
export { Media, MEDIA };
export { Observation, OBSERVATION };

import { LOINC_SCALE, LoincScale } from "./config/index";
export type { LoincScale };
export { LOINC_SCALE };

import { PDF_HEADER } from "js-ts-report";
export { PDF_HEADER };

export {Coverage, COVERAGE }
export {COVERAGE_ELIGIBILITY_REQUEST, CoverageEligibilityRequest} 

export {CoverageEligibilityRequestBundle}

export { Immunization , IMMUNIZATION }
export { ImmunizationRecommendation, IMMUNIZATION_RECOMMENDATION }
export {CreatePdf}
export {LOCATION, Location, bedOPertaionalStatusArray, BedOPertaionalStatus, locationFormTypesArray, locationFormTypes} 
export {HealthDocumentBundle}
export {COVERAGE_ELIGIBILITY_REQUEST_PRIORITY}
export { Claim, CLAIM }
export { ClaimRequestBundle }
export {COMMUNICATION, Communication} 
export { ClaimResponse }
export {CommunicationRequest}
export { GOAL, Goal }
export { CARE_PLAN, CarePlan, careplanActivityDetailStatusArray }

export  {TASK,Task }
export { PaymentNoctice, PAYMENT_NOTICE }
export { PaymentReconciliation, PAYMENT_RECONCILIATION }
export { TaskBundle }

export {InsurancePlan, INSURANCE_PLAN}