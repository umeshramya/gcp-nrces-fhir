import { Composition, GcpFhirCRUD, resourceType } from "..";
import { compositionType, COMPOSITOIN } from "../resources/Composition";
interface IDENTITY { patientId: string; practionerId: string; encounterId: string; organizationId: string; }

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
  private _identity!: IDENTITY;
  protected get identity(): IDENTITY {
    return this._identity;
  }
  protected set identity(value: IDENTITY) {
    this._identity = value;
  }
  


  // composition
  private _composition: any;
  public get composition(): any {
    return this._composition;
  }

  protected createComposition = async (compositionObj:COMPOSITOIN): Promise<any> => {
    const comp = new Composition();
    comp.mapCompositionType(this._compositionType)
    const body = comp.getFHIR(compositionObj);
    this._composition = await new GcpFhirCRUD().createFhirResource(body, "Composition")
    
  }



}


export interface BundleInterface {
  create(): any
  update(): any
  delete(): any
}

