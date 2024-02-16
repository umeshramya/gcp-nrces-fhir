import { IDENTTIFIER } from "../../config"
import { LOCATION, Location } from "../../resources/Location"
import { ORGANIZATION, Organization } from "../../resources/Organization"
import { PATIENT, Patient } from "../../resources/Patient"
import { PRACTITIONER, Practitioner } from "../../resources/Practitioner"
import { COVERAGE, Coverage } from "../Coverage"
import { COVERAGE_ELIGIBILITY_REQUEST, CoverageEligibilityRequest } from "../CoverageEligibilityRequest"

export class createCoverelibiltyRequestBundle {


getFhir (options:{
    id?:string,
    indentfier:IDENTTIFIER[]
    dateTime: string
    CoverageEligibilityRequest:COVERAGE_ELIGIBILITY_REQUEST
    patient : PATIENT
    practitioner ?: PRACTITIONER
    organization:ORGANIZATION
    location?:LOCATION
    coverage:COVERAGE

}):any
{
    const CoverageEligibilityRequestResource = new CoverageEligibilityRequest().getFHIR(options.CoverageEligibilityRequest)
    const patientResource = new Patient().getFHIR(options.patient)
    const OrganizationResource = new Organization().getFHIR(options.organization)
    const  CoverageResource = new Coverage().getFHIR(options.coverage)

    const body = {
        "resourceType" : "Bundle",
        "id" : options.id || undefined,
        "meta" : {
          "versionId" : "1",
          "profile" : ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/CoverageEligibilityRequestBundle"]
        },
        "identifier" : options.indentfier,
        "type" : "collection",
        "timestamp" : options.dateTime || new Date().toUTCString(),
        "entry" : [{
          "fullUrl" : options.CoverageEligibilityRequest.id,
          "resource" : CoverageEligibilityRequestResource
        },
        {
          "fullUrl" : options.CoverageEligibilityRequest.id,
          "resource" : patientResource
        },
        {
          "fullUrl" : options.organization.id,
          "resource" : OrganizationResource
        },

        {
          "fullUrl" :options.coverage.id,
          "resource" : CoverageResource
        }]
      }

      if(options.practitioner){
        body.entry.push(
            {
                fullUrl : options.practitioner.id,
                resource : new Practitioner().getFHIR(options.practitioner)
            }
        )
      }
      if(options.location){
        body.entry.push({
            fullUrl : options.location.id,
            resource :  new Location().getFHIR(options.location)
        })
      }



      return body

}

}
