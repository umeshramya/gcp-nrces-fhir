import { CODEABLE_CONCEPT, EXTENSION, IDENTTIFIER, PERIOD } from "../config";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";

export default class ResourceToHTML {

  codebleConceptToHtml(val: CODEABLE_CONCEPT): string {
    let ret: string = "";
    if (val.coding) {
      val.coding.forEach((el) => {
        ret += `<br/>`;
        if (el.code) {
          ret += `<i>Code</i> : ${el.code} <br/>`;
        }

        if (el.display) {
          ret += `<i>Display</i> : ${el.display} <br/>`;
        }

        if (el.system) {
          ret += `<i>System</i> : <a href=${el.system} target="_blank" rel="noopener noreferrer">${el.system}</a>
                    <br\>`;
        }

        if (el.userSelected) {
          ret += `<i>UserSelected<i/> : ${el.userSelected}<br/>`;
        }
        if (el.version) {
          ret += `<i>Version</i> : ${el.version}<br/>`;
        }
      });
    }

    if (val.text) {
      ret += `${val.text}<br/>`;
    }

    return ret;
  }

  identifierToHtml(val: IDENTTIFIER): string {
    let ret: string = "";
    if (val.system) {
      ret += `<i>System</i>  : ${val.system}<br/>`;
    }

    if (val.value) {
        const resourceMaiin = new ResourceMain()
      ret += `<i>Value</i> : ${val.value}<br/>`;
    }

    if (val.period) {
      ret += `<i>Peirod</i> : ${this.periodtoHtml(val.period, false)}<br/>`;
    }

    if (val.assigner) {
        const resourceMaiin = new ResourceMain()
      ret += `Assigner Organization Id : ${resourceMaiin.getIdFromReference(
        { resourceType: "Organization", ref: val.assigner.Reference }
      )}<br/>`;
    }

    if (val.type) {
      ret += `${this.codebleConceptToHtml(val.type)}<br/>`;
    }

    if (val.use) {
      ret += `<i>Use</i> : ${val.use}<br/>`;
    }

    return ret;
  }

  periodtoHtml(val: PERIOD, onlyDate: boolean): string {
    let ret: string = "";

    if (val.start) {
      ret += `Start : ${new TimeZone().convertTZ(
        val.start,
        "Asia/Kolkata",
        onlyDate
      )} `;
    }

    if (val.end) {
      ret += `End : ${new TimeZone().convertTZ(
        val.end,
        "Asia/Kolkata",
        onlyDate
      )} `;
    }

    return ret;
  }

  extensionToHtml(val:EXTENSION):string{
    let ret =""
    if(val.url){
      ret += `<i>URL</i> : <a href=${val.url} target="_blank" rel="noopener noreferrer">${val.url}</a>
      <br\>`;
    }

    if(val.valueString){
      ret += `<i>Value</i> : ${val.valueString}`
    }

    return ret;
  }
}
