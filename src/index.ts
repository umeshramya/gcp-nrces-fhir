import GcpFhirCRUD from "./classess/gcp"
import GcpFhirSerach from "./classess/gspSearch"
import { PatientResource } from "./resources/Patient"
import { PractitionerResource } from "./resources/Practitioner"
import { OrganizationResource } from "./resources/Organization"
import { EncounterResource, EncounterHospitalizationDischargeDispositionArray, EncounterStatusArray, EncounterClassArray } from "./resources/Encounter"
import { EncounterClass, EncounterStatus, EncounterHospitalizationDischargeDisposition } from "./resources/Encounter"
import { resourceType, resourceTypeArray } from "./config"


export { GcpFhirCRUD, GcpFhirSerach, resourceTypeArray }
export type { resourceType }

export { PatientResource, PractitionerResource, OrganizationResource }

export { EncounterResource, EncounterHospitalizationDischargeDispositionArray, EncounterStatusArray, EncounterClassArray }
export type { EncounterClass, EncounterStatus, EncounterHospitalizationDischargeDisposition }