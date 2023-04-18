import { type } from "os";
import { ADDRESS, AVAILIBILITY, CODEABLE_CONCEPT, CodeDisplay, CODING, CONTACT_POINT, HOURS_OF_OPERATION, IDENTTIFIER, POSITION } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";

const locatioStatusArray = ["active" , "suspended" , "inactive"] as const
export const locationFormTypesArray = ["Site", "Building", "Wing", "Ward", "Level", "Corridor", "Room", "Bed", "Vehicle", "House","Cabinet", "Road", "Area", "Jurisdiction", "Virtual"] as const

export const bedOPertaionalStatusArray =["Closed", "Housekeeping", "Occupied", "Unoccupied", "Contaminated", "Isolated"] as const
export type BedOPertaionalStatus = typeof bedOPertaionalStatusArray[number]
export type locationFormTypes = typeof locationFormTypesArray[number]
type Status = typeof locatioStatusArray[number]
export interface LOCATION{
  id?:string;
  indentifiers?:IDENTTIFIER[],
  status ?: Status,
  operationalStatus ?: CODING,
  name ?:string
  alias ? : string[]
  description ?: string
  mode ? : CodeDisplay,
  type?:CODEABLE_CONCEPT[]
  address?:ADDRESS
  physicalType?:CODEABLE_CONCEPT
  position?:POSITION
  managingOrganizationId?:string	
  partOfLocationId?:string
  availabilityExceptions? : string
  endpointId ?: string
}

export  class Location extends ResourceMain implements ResourceMaster{
  getFHIR(options: LOCATION):any {
    const body:any={
      id:options.id,
      resourceType: "Location",
      "text": {
        "status": "generated",
        "div": `<div>${ options.description}</div>`
      },
      identifier: options.indentifiers,
      name : options.name,
      alias : options.alias,
      description: options.description,
      mode : options.mode,
      type : options.type,
      physicalType:options.physicalType,
      position:options.position,
      managingOrganization	: {
        reference: `Organization/${options.managingOrganizationId}`,
      },

  
      availabilityExceptions: options.availabilityExceptions,
     
    }

    if(options.status){
      body.status=options.status
    }

    if(options.operationalStatus){
      body.operationalStatus=options.operationalStatus
    }


    if(options.partOfLocationId){
      body.partOf = {
        reference: `Location/${options.partOfLocationId}`,
      }
    }

    if(options.endpointId){
      body.endpoint ={
        reference: `Endpoint/${options.endpointId}`
      }
    }
    return body
  }

  convertFhirToObject(options: any):LOCATION {
    const ret :LOCATION={
      id:options.id,
    }
    if(options.indentifier){
      ret.indentifiers = options.identifier
    }
    if(options.name){
      ret.name= options.name
    }
    if(options.alias){
      ret.alias=options.alias
    }
    if( options.description){
      ret.description = options.description
    }
    if(options.mode){
      ret.mode=options.mode
    }
    if(options.type){
      ret.type=options.type
    }
    if(options.physicalType){
      ret.physicalType=options.physicalType
    }
    if(options.position){
      ret.position=options.position
    }
    if(options.managingOrganization){
      ret.managingOrganizationId = this.getIdFromReference({"ref" : options.managingOrganization.reference, "resourceType" : "Organization"})

    }

    if(options.partOf){
      ret.partOfLocationId = this.getIdFromReference({"ref" : options.partOf.reference, "resourceType" : "Location"})

    }

    if(options.availabilityExceptions){
      ret.availabilityExceptions= options.availabilityExceptions
    }
    if(options.endpoint){
      ret.endpointId = this.getIdFromReference({"ref" : options.endpoint.reference, "resourceType" : "Endpoint"})
    }

    if(options.operationalStatus){
      ret.operationalStatus=options.operationalStatus
    }

    if(options.status){
      ret.status=options.status
    }

    return ret
    
  }
  statusArray = ():Status[]=>{
    return locatioStatusArray.map(el=>el)
  }

}