export interface ResourceMaster {
  getFHIR(options: any): any;
  convertFhirToObject(options: any): any;
  statusArray?: Function;
}

export interface FhirObjectsMethods{
  getJson:()=>any;
  getObject:(option:any)=>any
}
