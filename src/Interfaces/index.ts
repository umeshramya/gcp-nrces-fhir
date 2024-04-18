export interface ResourceMaster {
  getFHIR(options: any): any;
  convertFhirToObject(options: any): any;
  toHtml(option:any):Promise<string>
  statusArray?: Function;
}

export interface FhirObjectsMethods{
  setObject:(o:any)=>void
  getJson:()=>any;
  getObject:(option:any)=>any
}
