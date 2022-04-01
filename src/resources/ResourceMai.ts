import { resourceType } from "..";

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
}
