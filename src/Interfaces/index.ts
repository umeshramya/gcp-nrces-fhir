export interface ResourceMaster {
  getFHIR(options: any): any;
  convertFhirToObject(options: any): any;
  statusArray?: Function;
}
