export const credentials = {
  type: process.env.GCP_FHIR_type,
  project_id: process.env.GCP_FHIR_project_id,
  private_key_id: process.env.GCP_FHIR_private_key_id,
  private_key: process.env.GCP_FHIR_private_key,
  client_email: process.env.GCP_FHIR_client_email,
  client_id: process.env.GCP_FHIR_client_id,
  auth_uri: process.env.GCP_FHIR_auth_uri,
  token_uri: process.env.GCP_FHIR_token_uri,
  auth_provider_x509_cert_url: process.env.GCP_FHIR_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};

export const databasePath = {
  cloudRegion: process.env.GCP_FHIR_cloudRegion,
  projectId: process.env.GCP_FHIR_projectId,
  datasetId: process.env.GCP_FHIR_datasetId,
  fhirStoreId: process.env.GCP_FHIR_fhirStoreId,
};

export const resourceTypeArray = [
  "Patient",
  "Practitioner",
  "Organization",
  "Encounter",
  "Condition",
  "Procedure",
  "AllergyIntolerance",
  "Appointment",
  "Bundle",
  "Composition",
  "ServiceRequest",
  "MedicationStatement",
  "MedicationRequest",
  "DocumentReference",
  "Binary",
  "PractitionerRole",
  "Specimen",
  "DiagnosticReport",
  "Observation",
  "Media",
  "CareTeam",
  "CarePlan",
  "ImmunizationRecommendation",
  "NutritionOrder",
  "Group",
  "Device",
  "Location",
  "DeviceRequest",
  "MedicationAdministration",
  "MedicationDispense",
  "Immunization",
  "ImagingStudy",
  "RelatedPerson",
  "MolecularSequence",
  "QuestionnaireResponse",
  "Slot",
  "Schedule",
  "Endpoint" ,
  "CoverageEligibilityRequest",
  "Coverage",
  "Contract",
  "HealthcareService",
  "CommunicationRequest",
  "Communication",
  "ValueSet",
  "Claim",
  "CoverageEligibilityResponse",
  "ClaimResponse"

] as const;

export type resourceType = typeof resourceTypeArray[number];

export interface CodeDisplay {
  code?: string;
  display: string;
  system?: "http://snomed.info/sct" | string;
}

export interface CODING extends CodeDisplay {
  // system?: string;
  version?: string; // Version of the system - if relevant
  // code?: string; // Symbol in syntax defined by the system
  // display?: string; // Representation defined by the system
  userSelected?: boolean; // If this coding was chosen directly by the user
}

export interface CODEABLE_CONCEPT {
  coding?: CODING[]; // Code defined by a terminology system
  text?: string; // Plain text representation of the concept
}
export interface PERIOD {
  start: string;
  end: string;
}
export interface IDENTTIFIER {
  use?: "usual" | "official" | "temp" | "secondary" | "old";
  type?: CODEABLE_CONCEPT; // Description of identifier
  system?: string; // The namespace for the identifier value
  value?: string; // The value that is unique
  period?: PERIOD; // Time period when id is/was valid for use
  assigner?: { Reference: `Organization/${string}`  }; // Organization that issued id (may be just text)
}

export interface ADDRESS {
  use?: "home" | "work" | "temp" | "old" | "billing"
  type?: "postal" | "physical" | "both"
  text?: string;
  line?: string[];
  city?: string;
  district: string;
  state: string;
  postalCode?: string;
  country?: string;
  period?: PERIOD
}

export interface CONTACT_POINT {
  system?: "phone" | "fax" | "email" | "pager" | "url" | "sms" | "other";
  value?: string;
  use?: "home" | "work" | "temp" | "old" | "mobile";
  rank?: number;
  period?: PERIOD
}

export interface HUMAN_NAME {
  use?: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old" | "maiden"
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[]
  suffix?: string[]
  period?: PERIOD
}
export interface COMMUNICATION {
  language: CODEABLE_CONCEPT;
  preferred?: boolean;
}



export interface MULTI_RESOURCE {
  resource: resourceType;
  id: string;
  display?: string;
}

export const LOINC_SCALE = [
  "Doc",
  "OrdQn",
  "-",
  "Nar",
  "Nom",
  "Ord",
  "Qn",
] as const;

export type LoincScale = typeof LOINC_SCALE[number];


export interface ACTOR {
  multiResource: MULTI_RESOURCE
}

export interface POSITION{
  longitude : number
  latitude : number
  altitude ?: number
}

export const DaysOfWeek =[ "mon" , "tue" , "wed" , "thu" , "fri" , "sat" , "sun" ] as const
type DaysOfWeek = typeof DaysOfWeek[number]
export  interface HOURS_OF_OPERATION{
  daysOfWeek ?: DaysOfWeek[];
  allDay ?: boolean;
  openingTime ?: string;
  closingTime ?:string

}

export  interface AVAILIBILITY{
  availableTime:AVAILABLE_TIME[]
  notAvailableTime:NOT_AVAILABLE[]

}


export interface AVAILABLE_TIME {
  daysOfWeek: DaysOfWeek[];
  allDay?: boolean;
  availableStartTime: string;
  availableEndTime: string;
}

export interface NOT_AVAILABLE {
  description: string;
  during: PERIOD;
}




export interface EXTENSION {
  url:string;
  valueString?:string
}