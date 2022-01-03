import { Composition, resourceType } from "..";
import { compositionType } from "../resources/Composition";
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
  private _composition = new Composition();
  protected createComposition = async (): Promise<any> => {
    this._composition.mapCompositionType(this._compositionType)
  }



}


export interface BundleInterface {
  create(): any
  update(): any
  delete(): any
}

