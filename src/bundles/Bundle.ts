import { Console } from "console";
import {
  Composition,
  DocumentBundle,
  DocumentReference,
  DOCUMENT_BUNDLE,
  DOCUMENT_REFERENCE,
  Encounter,
  ENCOUNTER,
  GcpFhirCRUD,
  Organization,
  ORGANIZATION,
  Patient,
  PATIENT,
  Practitioner,
  PRACTITIONER,
  resourceType,
} from "..";


type SectionEntries = {
  reference: string;
  type: resourceType;
}

type BundleEntries = {
  fullUrl: string,
  resource: any,
}
import { compositionType, COMPOSITOIN } from "../resources/Composition";
interface IDENTITY { }

export class Bundle {
  private _compositionType: compositionType;
  constructor(compositionType: compositionType) {
    this._compositionType = compositionType;
  }

  // _entries
  private _sectionEntries: SectionEntries[] = [];
  public get sectionEntries(): SectionEntries[] {
    return this._sectionEntries;
  }
  public setSectionEntries = (resourceType: resourceType, id: string) => {
    this._sectionEntries.push({ "reference": `${resourceType}/${id}`, "type": resourceType })
  }


  private _bundleEntries: BundleEntries[] = [];
  public get bundleEntries(): BundleEntries[] {
    return this._bundleEntries;
  }
  public setBundleEntries = (resourceType: resourceType, id: string, resource: any) => {
    this._bundleEntries.push({ "fullUrl": `${resourceType}/${id}`, "resource": resource })
  }



  // _indentity
  private _patient!: { Obj: PATIENT; body: any };
  public get patient(): { Obj: PATIENT; body: any } {
    return this._patient;
  }

  public setPatient = async (id: string) => {
    let curClass = new Patient();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Patient");
    this._patient = {
      Obj: curClass.convertFhirToObject(res.data),
      body: res.data,
    };
  };

  private _encounter!: { Obj: ENCOUNTER; body: any };
  public get encounter(): { Obj: ENCOUNTER; body: any } {
    return this._encounter;
  }

  public setEncounter = async (id: string) => {
    let curClass = new Encounter();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Encounter");
    this._encounter = {
      Obj: curClass.convertFhirToObject(res.data),
      body: res.data,
    };
  };

  private _organization!: { Obj: ORGANIZATION; body: any };
  public get organization(): { Obj: ORGANIZATION; body: any } {
    return this._organization;
  }

  public setOrganization = async (id: string) => {
    let curClass = new Organization();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Organization");
    this._organization = {
      Obj: curClass.convertFhirToObject(res.data),
      body: res.data,
    };
  };

  private _practioners: { Obj: PRACTITIONER; body: any }[] = [];
  public get practioners(): { Obj: PRACTITIONER; body: any }[] {
    return this._practioners;
  }

  public setPractioner = async (id: string) => {
    let curClass = new Practitioner();
    const res = await new GcpFhirCRUD().getFhirResource(id, "Practitioner");
    this._practioners.push({
      Obj: curClass.convertFhirToObject(res.data),
      body: res.data,
    });
  };

  // composition
  private _composition: any;

  public get composition(): any {
    return this._composition;
  }

  protected createComposition = async (
    compositionObj: COMPOSITOIN
  ): Promise<any> => {
    const comp = new Composition();
    comp.mapCompositionType(this._compositionType);
    const body = comp.getFHIR(compositionObj);
    this._composition = await new GcpFhirCRUD().createFhirResource(
      body,
      "Composition"
    );
    this.setBundleEntries("Composition", this._composition.data.id, this.composition.data)
    this.setBundleEntries("Patient", this.patient.Obj.id || "", this.patient.body);
    this.setBundleEntries("Organization", this.organization.Obj.id || "", this.organization.body);
    this.setBundleEntries("Encounter", this.encounter.Obj.id || "", this.encounter.body)
    this.practioners.forEach((el) => {
      this.setBundleEntries("Practitioner", el.Obj.id || "", el.body)
    })
    
  };



  // Bundle
  private _bundle: any;
  public get bundle(): any {
    return this._bundle;
  }
  
  protected createBundle = async(document:DOCUMENT_BUNDLE)=>{
    document.entry=this.bundleEntries;
    const documentBundle = new DocumentBundle();
    const body = documentBundle.getFHIR(document);
    this._bundle = await new GcpFhirCRUD().createFhirResource(body, "Bundle")
  }



  // _documentReference
  private _documentReference: any;
  public get documentReference(): any {
    return this._documentReference;
  }

  protected createDocumentRefernce =async(resource:DOCUMENT_REFERENCE)=>{
    const docRef= new DocumentReference().getFHIR(resource);
    this._documentReference = await new GcpFhirCRUD().createFhirResource(docRef, "DocumentReference")
  }
  


}

export interface BundleInterface {
  create(options: any): any;
  update(): any;
  delete(): any;
}

