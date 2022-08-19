import { resourceType } from "..";
import { CodeDisplay, MULTI_RESOURCE } from "../config";

export default class ResourceMain {
  /**
   * this return the tex div by subcratig first 42 charceters and last 6 s=charecters
   * @param divtext
   * @returns
   */
  protected getDivText = (divtext: string) => {
    const len = divtext.length;
    return divtext.substring(42, len - 6);
  };

  /**
   * this retuen the id of the reference in a resource
   * @param options
   * @returns
   */
  public getIdFromReference = (options: {
    ref: string;
    resourceType: resourceType;
  }) => {
    return `${options.ref}`.substring(options.resourceType.length + 1);
  };

  /**
   * This returns the identifers from identeries by flters the systems
   * @param system
   * @param identifiers
   * @returns
   */
  public getIdentifers = (system: string, options: any): any => {
    let ret: any;
    const mrn: any[] = options.identifier.filter(
      (el: any) => el.system == system
    );

    if (mrn.length > 0) {
      ret = mrn[0].value;
    }
    return ret;
  };

  /**
   * This is when more than one type resource is under reference
   * @param multiResource
   * @returns
   */
  public getFromMultResource = (multiResource: {
    reference: string;
    display?: string;
  }): MULTI_RESOURCE => {
    const resource = `${multiResource.reference}`.substring(
      0,
      `${multiResource.reference}`.indexOf("/")
    ) as any;

    const id = this.getIdFromReference({
      ref: multiResource.reference,
      resourceType: resource,
    });

    let ret: MULTI_RESOURCE = {
      id: id,
      resource: resource,
    };

    if (multiResource.display) {
      ret.display = multiResource.display;
    }
    return ret;
  };

  /**
   * this will return copy of resource modified
   * @param resource
   */
  public bundlify(resource: any): any {
    const copyComposoition = Object.assign({}, resource);
    delete copyComposoition.extension;
    delete copyComposoition.language;
    delete copyComposoition.meta;
    delete copyComposoition.text;

    let codedisplay: CodeDisplay[] = copyComposoition.code as any

    if(codedisplay && codedisplay.length >0){
      codedisplay = codedisplay.map((el) => {
        if (el.system == "" && el.system == null) {
          el.system = "https://www.nicehms.com/system";
        }
        return el;
      });
    }

    copyComposoition.code=codedisplay;
    return copyComposoition;
  }
}
