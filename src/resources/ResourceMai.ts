import { resourceType } from "..";

export default class ResourceMain {
  protected getDivText = (divtext: string) => {
    const len = divtext.length;
    return divtext.substring(42, len - 6)
  }

  public getIdFromReference = (options: { ref: string, resourceType: resourceType }) => {
    return `${options.ref}`.substring(options.resourceType.length + 1)
  }


}