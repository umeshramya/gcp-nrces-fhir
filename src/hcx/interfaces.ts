// import { COMMUNICATION } from "../";
import { COMMUNICATION } from "./Communication";
import { ORGANIZATION } from "../resources/Organization";
import { PATIENT } from "../resources/Patient";
import { CLAIM } from "./Claim";
import { COVERAGE } from "./Coverage";
import { COVERAGE_ELIGIBILITY_REQUEST } from "./CoverageEligibilityRequest";
import { COVERAGE_ELIGIBILITY_RESPONSE } from "./CoverageEligibilityResponse";
import { INSURANCE_PLAN } from "./Insuranceplan";
import { PAYMENT_NOTICE } from "./PaymentNotice";
import { PAYMENT_RECONCILIATION } from "./PaymentReconciliation";

export interface TO_HTML_HCX_OPTIONS{
    addResourceType: boolean;
    body: COVERAGE_ELIGIBILITY_RESPONSE | COVERAGE_ELIGIBILITY_REQUEST | CLAIM | COVERAGE | COMMUNICATION | INSURANCE_PLAN | PAYMENT_NOTICE | PAYMENT_RECONCILIATION
    patinet?: PATIENT
    insurance?: ORGANIZATION
    coverages?:COVERAGE[]
}