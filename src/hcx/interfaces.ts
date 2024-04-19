import { COMMUNICATION } from "../config";
import { ORGANIZATION } from "../resources/Organization";
import { PATIENT } from "../resources/Patient";
import { CLAIM } from "./Claim";
import { COVERAGE } from "./Coverage";
import { COVERAGE_ELIGIBILITY_REQUEST } from "./CoverageEligibilityRequest";
import { COVERAGE_ELIGIBILITY_RESPONSE } from "./CoverageEligibilityResponse";

export interface TO_HTML_HCX_OPTIONS{
    addResourceType: boolean;
    body: COVERAGE_ELIGIBILITY_RESPONSE | COVERAGE_ELIGIBILITY_REQUEST | CLAIM | COVERAGE | COMMUNICATION 
    patinet?: PATIENT
    insurance?: ORGANIZATION
    coverages?:COVERAGE[]
}