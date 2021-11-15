import GcpFhirCRUD from "./classess/gcp"
import GcpFhirSerach from "./classess/gspSearch"
import { PATIENT, PatientResource } from "./resources/Patient"
import { PRACTITIONER, PractitionerResource } from "./resources/Practitioner"
import { ORGANIZATION, OrganizationResource } from "./resources/Organization"
import { ENCOUNTER, EncounterResource, EncounterHospitalizationDischargeDispositionArray, EncounterStatusArray, EncounterClassArray } from "./resources/Encounter"
import { EncounterClass, EncounterStatus, EncounterHospitalizationDischargeDisposition } from "./resources/Encounter"
import { resourceType, resourceTypeArray } from "./config"


export { GcpFhirCRUD, GcpFhirSearch, resourceTypeArray }
export type { resourceType }

export { PATIENT, ORGANIZATION, PRACTITIONER, PatientResource, PractitionerResource, OrganizationResource }

export { ENCOUNTER, EncounterResource, EncounterHospitalizationDischargeDispositionArray, EncounterStatusArray, EncounterClassArray }
export type { EncounterClass, EncounterStatus, EncounterHospitalizationDischargeDisposition }