import { Composition, Encounter, ENCOUNTER, GcpFhirCRUD, Organization, ORGANIZATION, Patient, PATIENT, Practitioner, PRACTITIONER, resourceType } from "..";
import { compositionType, COMPOSITOIN } from "../resources/Composition";
interface IDENTITY { }

export class Bundle {
  private _compositionType: compositionType;
  constructor(compositionType: compositionType) {
    this._compositionType = compositionType
  }


  // _entries
  private _entries: resourceType[] = [];
  protected get entries(): resourceType[] {
    return this._entries;
  }
  protected set entries(value: resourceType[]) {
    this._entries = value;
  }

  // _indentity
  private _patient!: { Obj: PATIENT; body: any };
  public get patient(): { Obj: PATIENT; body: any } {
    return this._patient;
  }

  public setPatient = async (id: string) => {
    let curClass = new Patient();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Patient")
    this._patient = { "Obj": curClass.convertFhirToObject(res.data), "body": res.data }
  }

  private _encounter!: { Obj: ENCOUNTER; body: any; };
  public get encounter(): { Obj: ENCOUNTER; body: any; } {
    return this._encounter;
  }

  public setEncounter = async (id: string) => {
    let curClass = new Encounter();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Encounter")
    this._encounter = { "Obj": curClass.convertFhirToObject(res.data), "body": res.data }
  }

  private _organization!: { Obj: ORGANIZATION; body: any; };
  public get organization(): { Obj: ORGANIZATION; body: any; } {
    return this._organization;
  }

  public setOrganization = async (id: string) => {
    let curClass = new Organization();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Organization")
    this._organization = { "Obj": curClass.convertFhirToObject(res.data), "body": res.data }
  }



  private _practioners: { Obj: PRACTITIONER; body: any; }[] =[]
  public get practioners(): { Obj: PRACTITIONER; body: any; }[] {
    return this._practioners;
  }

  public setPractioner = async (id: string) => {
    let curClass = new Practitioner();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Practitioner")
    this._practioners.push({ "Obj": curClass.convertFhirToObject(res.data), "body": res.data })
  }



  // composition
  private _composition: any;
  public get composition(): any {
    return this._composition;
  }

  protected createComposition = async (compositionObj: COMPOSITOIN): Promise<any> => {
    const comp = new Composition();
    comp.mapCompositionType(this._compositionType)
    const body = comp.getFHIR(compositionObj);
    this._composition = await new GcpFhirCRUD().createFhirResource(body, "Composition")

  }



}


export interface BundleInterface {
  create(options: any): any
  update(): any
  delete(): any
}

// const encounterId = "e2eaa172-20a0-42f1-83d0-de371dad3c74"
// const patientId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
// const orgId = "87166aa1-c5a6-468b-92e9-7b1628b77957"
// const practId = "877f1236-63fd-4827-a3da-636a4f2c5739"
// const curEncounter = await gcpFhirCRUD.getFhirResource(encounterId, "Encounter")
// let curPatinet = await gcpFhirCRUD.getFhirResource(patientId, "Patient");
// const curOrganizatio = await gcpFhirCRUD.getFhirResource(orgId, "Organization")
// const curPractinioer = await gcpFhirCRUD.getFhirResource(practId, "Practitioner")
// const MedicationRequestId = "d5a2ec9f-50da-4700-8c46-b48cff292414"

// const pract = new Practitioner()
// const practObj = pract.convertFhirToObject(curPractinioer.data)