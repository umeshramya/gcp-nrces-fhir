import { Buffer } from "buffer";
import { CreatePdf } from "js-ts-report";
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
};

type BundleEntries = {
  fullUrl: string;
  resource: any;
};
import { compositionType, COMPOSITOIN } from "../resources/Composition";

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
  // public setSectionEntries = (resourceType: resourceType, id: string) => {
  //   this._sectionEntries.push({
  //     reference: `${resourceType}/${id}`,
  //     type: resourceType,
  //   });
  // };

  public setSectionEntries = (section: any) => {
    this._sectionEntries.push(section);
  };

  private _bundleEntries: BundleEntries[] = [];
  public get bundleEntries(): BundleEntries[] {
    return this._bundleEntries;
  }
  public setBundleEntries = (
    resourceType: resourceType,
    id: string,
    resource: any
  ) => {
    this._bundleEntries.push({
      fullUrl: `${resourceType}/${id}`,
      resource: resource,
    });
  };

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
  /**
   * clears both section etries and also bundle entries
   */
  protected clearEntries = () => {
    this._sectionEntries = [];
    this._bundleEntries = [];
  };

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
    this.setBundleEntries(
      "Composition",
      this._composition.data.id,
      this.composition.data
    );
    this.setBundleEntries(
      "Patient",
      this.patient.Obj.id || "",
      this.patient.body
    );
    this.setBundleEntries(
      "Organization",
      this.organization.Obj.id || "",
      this.organization.body
    );
    this.setBundleEntries(
      "Encounter",
      this.encounter.Obj.id || "",
      this.encounter.body
    );
    this.practioners.forEach((el) => {
      this.setBundleEntries("Practitioner", el.Obj.id || "", el.body);
    });
  };

  /**
   * Updates composition by id
   * @param compositionObj : COMPOSITOIN
   */
  protected updateComposition = async (
    compositionObj: COMPOSITOIN
  ): Promise<any> => {
    const comp = new Composition();
    comp.mapCompositionType(this._compositionType);
    const body = comp.getFHIR(compositionObj);
    this._composition = await new GcpFhirCRUD().updateFhirResource(
      body,
      compositionObj.id || "",
      "Composition"
    );
    this.setBundleEntries(
      "Composition",
      this._composition.data.id,
      this.composition.data
    );
    this.setBundleEntries(
      "Patient",
      this.patient.Obj.id || "",
      this.patient.body
    );
    this.setBundleEntries(
      "Organization",
      this.organization.Obj.id || "",
      this.organization.body
    );
    this.setBundleEntries(
      "Encounter",
      this.encounter.Obj.id || "",
      this.encounter.body
    );
    this.practioners.forEach((el) => {
      this.setBundleEntries("Practitioner", el.Obj.id || "", el.body);
    });
  };

  /**
   * returns composition
   * @param id string
   * @returns resource documentreference
   */
  protected getComposition = async (id: string): Promise<any> => {
    return await new GcpFhirCRUD().getFhirResource(id, "Composition");
  };

  /**
   * delete Composition
   * @param id string
   * @returns
   */
  protected deleteComposition = async (id: string): Promise<any> => {
    return await new GcpFhirCRUD().deleteFhirResource(id, "Composition");
  };

  // _documentReference
  private _documentReference: any;
  public get documentReference(): any {
    return this._documentReference;
  }

  protected createDocumentRefernce = async (options: {
    resource: DOCUMENT_REFERENCE;
  }) => {
    const docRef = new DocumentReference().getFHIR(options.resource);
    this._documentReference = await new GcpFhirCRUD().createFhirResource(
      docRef,
      "DocumentReference"
    );
  };

  /**
   * This updates the document refernce
   * @param options
   */
  protected updateDocumentRefernce = async (options: {
    resource: DOCUMENT_REFERENCE;
  }) => {

    const docRef = new DocumentReference().getFHIR(options.resource);
    this._documentReference = await new GcpFhirCRUD().updateFhirResource(
      docRef,
      options.resource.id || "",
      "DocumentReference"
    );
  };

  /**
   * returns document reference
   * @param id string
   * @returns resource documentreference
   */
  protected getDocumentRefernce = async (id: string): Promise<any> => {
    return await new GcpFhirCRUD().getFhirResource(id, "DocumentReference");
  };
  /**
   * delete doumentreference
   * @param id string
   * @returns
   */
  protected deleteDocumentRefernce = async (id: string): Promise<any> => {
    return await new GcpFhirCRUD().deleteFhirResource(id, "DocumentReference");
  };

  // Bundle
  private _bundle: any;
  protected get bundle(): any {
    return this._bundle;
  }
  /**
   * Creats new Bundle
   * @param document
   */
  protected createBundle = async (document: DOCUMENT_BUNDLE) => {
    document.entry = this.bundleEntries;
    const documentBundle = new DocumentBundle();
    const body = documentBundle.getFHIR(document);
    this._bundle = await new GcpFhirCRUD().createFhirResource(body, "Bundle");
  };

  /**
   * Creats new Bundle
   * @param document
   */
  protected updateBundle = async (document: DOCUMENT_BUNDLE) => {
    document.entry = this.bundleEntries;
    const documentBundle = new DocumentBundle();
    const body = documentBundle.getFHIR(document);
    this._bundle = await new GcpFhirCRUD().updateFhirResource(
      body,
      document.id || "",
      "Bundle"
    );
  };

  /**
   * This gets the document bundle by id
   * @param id id of bundle
   * @returns resource
   */
  async get(id: string): Promise<any> {
    return await new GcpFhirCRUD().getFhirResource(id, "Bundle");
  }

  /**
   * This deletes the document bundle
   * @param id id of
   * @returns
   */
  async delete(id: string): Promise<any> {
    return await new GcpFhirCRUD().deleteFhirResource(id, "Bundle");
  }

  /**
   *This return pdf in base64 string or buffer
   * @param gcpFhirId fhir id of bundle
   */
  async getBundlePdf(options: {
    gcpFhirId: string;
    papersize: any;
    headerbase64Image?: string;
    base64: boolean;
    qrcode: string;
    esignbase64?: string
  }): Promise<string | Buffer> {
    const gcpfhirCrud = new GcpFhirCRUD();
    const resource = (
      await gcpfhirCrud.getFhirResource(options.gcpFhirId, "Bundle")

    )

    const  practitioner = resource.data.entry.filter(
      (el: any) => el.resource.resourceType == "Practitioner"
    )[0].resource

    const practitionerObj = new Practitioner().convertFhirToObject(practitioner);
    // write code for extracting text from composition
    const  composition = resource.data.entry.filter(
      (el: any) => el.resource.resourceType == "Composition"
    )[0].resource
      let sign!:string
    if(composition.status === "final"){
      sign = options.esignbase64 || emptySign;
    }
    const html = composition.text.div



    // write code create pdf from the text;

    const pdf = new CreatePdf();
    const curPdf = await pdf.create(html, {
      paperSize: options.papersize,
      headerbase64Image: options.headerbase64Image,
      base64: options.base64,
      qrcode: options.qrcode,
      esign:  {
          image: sign || emptySign,
          nameLine1: `${practitionerObj.name} ${practitionerObj.qualification}`,
          nameLine2: practitionerObj.medicalLicenseNumber || "",
        }
        
    });

    return curPdf;
  }
}

export interface BundleInterface {
  create(options: any): any;
  update(options: any): any;
}

export const emptySign =`data:image/gif;base64,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`
