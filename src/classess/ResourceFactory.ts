import { resourceType } from "../config";
import { ResourceMaster } from "../Interfaces";
import { AllergyIntolerance } from "../resources/AllergyIntolerance";
import { Appointment } from "../resources/Appointment";
import { Composition } from "../resources/Composition";
import { Condition } from "../resources/Condition";
import { DocumentBundle } from "../resources/DocumentBundle";
import { DocumentReference } from "../resources/DocumentReference";
import { Encounter } from "../resources/Encounter";
import { MedicationRequest } from "../resources/MedicationRequest";
import { MedicationStatement } from "../resources/MedicationStatement";
import { Organization } from "../resources/Organization";
import { Patient } from "../resources/Patient";
import { Practitioner } from "../resources/Practitioner";
import { Binary } from "../resources/Binary";
import { Procedure } from "../resources/Procedure";
import ResourceMain from "../resources/ResourceMai";
import GcpFhirCRUD from "./gcp";
import { Specimen } from "../resources/Specimen";
import { PractitionerRole } from "../resources/PractitionerRole";
import { DiagnosticReport } from "../resources/DiagnosticReport";
import { Media } from "../resources/Media";
import { Observation } from "../resources/Observation";
import { ServiceRequest } from "../resources/ServiceRequest";
import { Schedule } from "../resources/Schedule";
import { Slot } from "../resources/Slot";
import { CoverageEligibilityRequest } from "../hcx/CoverageEligibilityRequest";
import { EndPoint } from "../resources/Endpoint";
import { Coverage } from "../hcx/Coverage";
import { Communication } from "../hcx/Communication";
import { Claim } from "../hcx/Claim";
import { ClaimResponse } from "../hcx/ClaimResponse";
import { CommunicationRequest } from "../hcx/CommunicationRequest";
import {CoverageEligibiltyResponse} from "../hcx/CoverageEligibilityResponse"
import { CarePlan } from "../resources/CarePlan";
import { Goal } from "../resources/Goal";
import { InsurancePlan } from "../hcx/Insuranceplan";
import { PaymentNoctice } from "../hcx/PaymentNotice";
import { PaymentReconciliation } from "../hcx/PaymentReconciliation";

export default class ResourceFactory
  extends ResourceMain
  implements ResourceMaster
{
  private resourceType: resourceType;
  private resource: any;

  constructor(_resourceType: resourceType) {
    super();
    this.resourceType = _resourceType;
    // "Patient" | "Practitioner" | "Organization" | "Encounter" | "Condition" | "Procedure" | "AllergyIntolerance" | "Appointment" | "Bundle" | "Composition" | "ServiceRequest" | "MedicationStatement" | "MedicationRequest" | "DocumentReference"
    if (this.resourceType === "Patient") {
      this.resource = new Patient();
    } else if (this.resourceType === "Practitioner") {
      this.resource = new Practitioner();
    } else if (this.resourceType === "Organization") {
      this.resource = new Organization();
    } else if (this.resourceType === "Encounter") {
      this.resource = new Encounter();
    } else if (this.resourceType === "Condition") {
      this.resource = new Condition();
    } else if (this.resourceType === "Procedure") {
      this.resource = new Procedure();
    } else if (this.resourceType === "AllergyIntolerance") {
      this.resource = new AllergyIntolerance();
    } else if (this.resourceType === "Appointment") {
      this.resource = new Appointment();
    } else if (this.resourceType === "Bundle") {
      this.resource = new DocumentBundle();
    } else if (this.resourceType === "Composition") {
      this.resource = new Composition();
    } else if (this.resourceType === "DocumentReference") {
      this.resource = new DocumentReference();
    } else if (this.resourceType === "MedicationRequest") {
      this.resource = new MedicationRequest();
    } else if (this.resourceType === "MedicationStatement") {
      this.resource = new MedicationStatement();
    } else if (this.resourceType === "Binary") {
      this.resource = new Binary();
    } else if (this.resourceType === "Specimen") {
      this.resource = new Specimen();
    } else if (this.resourceType === "PractitionerRole") {
      this.resource = new PractitionerRole();
    } else if (this.resourceType === "DiagnosticReport") {
      this.resource = new DiagnosticReport();
    } else if (this.resourceType === "Media") {
      this.resource = new Media();
    } else if (this.resourceType === "Observation") {
      this.resource = new Observation();
    } else if (this.resourceType == "ServiceRequest") {
      this.resource = new ServiceRequest();
    } else if (this.resourceType == "Schedule") {
      this.resource = new Schedule();
    }else if (this.resourceType == "Slot") {
      this.resource = new Slot();
    }else if(this.resourceType== "CoverageEligibilityRequest"){
      this.resource= new CoverageEligibilityRequest()
    }else if(this.resourceType== "Location"){
      this.resource = new Location()
    }else if(this.resourceType== "Endpoint"){
      this.resource= new EndPoint()
    }else if(this.resourceType== "Coverage"){
      this.resource= new Coverage()
    }else if(this.resourceType == "Communication"){
      this.resource = new Communication()
    }else if(this.resourceType == "Claim"){
      this.resource = new Claim()
    }else if(this.resourceType == "CoverageEligibilityResponse"){
      this.resource = new CoverageEligibiltyResponse()
    }else if(this.resourceType == "ClaimResponse"){
      this.resource = new ClaimResponse()
    }else if(this.resourceType == "CommunicationRequest"){
      this.resource = new CommunicationRequest()
    }else if(this.resourceType == "CarePlan"){
      this.resource = new CarePlan()
    }else if(this.resourceType == "Goal"){
      this.resource = new Goal()
    }else if(this.resourceType == "InsurancePlan"){
      this.resource = new InsurancePlan()
    }else if(this.resourceType == "PaymentNotice"){
      this.resource = new PaymentNoctice()
    }else if(this.resourceType == "PaymentReconciliation"){
      this.resource = new PaymentReconciliation()
    }

    else {
      const errMessage = `Not Implimented resourceType ${this.resourceType}`;
      console.log(errMessage);
      throw (new Error().message = errMessage);
    }
  }
  async toHtml<T>(options:T):Promise<string>{
    return this.resource.toHtml(options)
  }
  statusArray?: Function | undefined;

  getFHIR<T>(options: T): any {
    return this.resource.getFHIR(options);
  }
  convertFhirToObject<T>(options: any): T {
    return this.resource.convertFhirToObject(options);
  }
  bundlefy(resource:any):any{
    return this.resource.bundlify(resource)
  }

 /**
   * This  methois create or updates the respources depending id property
   * @param resource resource object
   * @param resourceType type off resource
   * @returns the creeate or updated resource depending on id
   */
 static async setResource<T>(
  resource: T,
  resourceType: resourceType
): Promise<any> {
  // check resource has id;
  const gcpFhirCrud = new GcpFhirCRUD();
  let ret: any;
  // @ts-ignore
  if (resource.id) {
    ret = await gcpFhirCrud.updateFhirResource(
      resource,
      // @ts-ignore
      resource.id,
      resourceType
    );
  } else {
    ret = await gcpFhirCrud.createFhirResource(resource, resourceType);
  }
  return ret;
}
}
