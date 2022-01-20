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
    headerbase64Image: string;
    base64: boolean;
    qrcode: string;
    esign: { imageBase64: any; nameLine1: any; nameLine2: any };
  }): Promise<string | Buffer> {
    const gcpfhirCrud = new GcpFhirCRUD();
    const resource = (
      await gcpfhirCrud.getFhirResource(options.gcpFhirId, "Bundle")
    )

    // write code for extracting text from composition
    const html = resource.data.entry.filter(
      (el: any) => el.resource.resourceType == "Composition"
    )[0].resource.text.div
    console.log(html)

    // write code create pdf from the text;

    const pdf = new CreatePdf();
    const curPdf = await pdf.create(html, {
      paperSize: options.papersize,
      headerbase64Image: options.headerbase64Image,
      base64: options.base64,
      qrcode: options.qrcode,
      esign: options.esign
        ? {
          image: options.esign?.imageBase64,
          nameLine1: options.esign?.nameLine1,
          nameLine2: options.esign?.nameLine2 || "",
        }
        : undefined,
    });

    return curPdf;
  }
}

export interface BundleInterface {
  create(options: any): any;
  update(options: any): any;
}
