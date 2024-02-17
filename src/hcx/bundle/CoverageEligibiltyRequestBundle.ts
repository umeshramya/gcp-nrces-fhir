import { ResourceMaster } from "../../Interfaces"
import { IDENTTIFIER } from "../../config"
import { LOCATION, Location } from "../../resources/Location"
import { ORGANIZATION, Organization } from "../../resources/Organization"
import { PATIENT, Patient } from "../../resources/Patient"
import { PRACTITIONER, Practitioner } from "../../resources/Practitioner"
import ResourceMain from "../../resources/ResourceMai"
import { COVERAGE, Coverage } from "../Coverage"
import { COVERAGE_ELIGIBILITY_REQUEST, CoverageEligibilityRequest } from "../CoverageEligibilityRequest"

export class CoverageEligibilityRequestBundle extends ResourceMain implements ResourceMaster{

convertFhirToObject(options: any) {
  throw new Error("Method not implemented.")
}
statusArray?: Function | undefined


getFHIR (options:{
    id?:string,
    indentfier:IDENTTIFIER
    dateTime: string
    CoverageEligibilityRequest:COVERAGE_ELIGIBILITY_REQUEST
    patient : PATIENT
    practitioner ?: PRACTITIONER
    organization:ORGANIZATION
    location?:LOCATION
    coverage:COVERAGE

}):any
{

  
    
    const CoverageEligibilityRequestResource = new CoverageEligibilityRequest().removeUndefinedKeys(new CoverageEligibilityRequest().getFHIR(options.CoverageEligibilityRequest))
    
    
    const patientResource = new Patient().removeUndefinedKeys(new Patient().getFHIR(options.patient))
    const OrganizationResource = new Organization().removeUndefinedKeys(new Organization().getFHIR(options.organization))
    const  CoverageResource = new Coverage().removeUndefinedKeys(new Coverage().getFHIR(options.coverage))

    const body = {
        "resourceType" : "Bundle",
        "id" : options.id || undefined,
        "meta" : {
          "versionId" : "1",
          "profile" : ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/CoverageEligibilityRequestBundle"]
        },
        "identifier" : options.indentfier ,
        "type" : "collection",
        "timestamp" : options.dateTime || new Date().toISOString(),
        "entry" : [{
          "fullUrl" : `CoverageEligibilityRequest/${options.CoverageEligibilityRequest.id}`,
          "resource" : CoverageEligibilityRequestResource
        },
        {
          "fullUrl" : `Patient/${options.patient.id}`,
          "resource" : patientResource
        },
        {
          "fullUrl" : `Organization/${options.organization.id}`,
          "resource" : OrganizationResource
        },

        {
          "fullUrl" :`Coverage/${options.coverage.id}`,
          "resource" : CoverageResource
        }]
      }

      if(options.practitioner){
        body.entry.push(
            {
                fullUrl : `Practitioner/${options.practitioner.id}`,
                resource : new Practitioner().getFHIR(options.practitioner)
            }
        )
      }
      if(options.location){
        body.entry.push({
            fullUrl : `Location/${options.location.id}`,
            resource :  new Location().getFHIR(options.location)
        })
      }



      return body

}

}
