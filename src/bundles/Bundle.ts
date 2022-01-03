import { resourceType } from "..";
interface IDENTITY { patientId: string; practionerId: string; encounterId: string; organizationId: string; }

export class Bundle {
  private _entries: resourceType[] = [];
  protected get entries(): resourceType[] {
    return this._entries;
  }
  protected set entries(value: resourceType[]) {
    this._entries = value;
  }
  private _identity!: IDENTITY;
  protected get identity(): IDENTITY {
    return this._identity;
  }
  protected set identity(value: IDENTITY) {
    this._identity = value;
  }

}


export interface BundleInterface {
  create(): any
  update(): any
  delete(): any
}

