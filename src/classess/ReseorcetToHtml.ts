import {
  CODEABLE_CONCEPT,
  CodeDisplay,
  CODING,
  EXTENSION,
  IDENTTIFIER,
  MULTI_RESOURCE,
  PERIOD,
  POSITION,
} from "../config";
import { PAYLOAD } from "../hcx/Communication";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";

export default class ResourceToHTML {
  codeableConceptToHtml(val: CODEABLE_CONCEPT[] | CODEABLE_CONCEPT): string {
    if (!Array.isArray(val)) {
      val = [val];
    }

    let ret: string = "";

    val.forEach((concept) => {
      if (concept.coding) {
        ret += concept.coding.map((el) => this.codingToHtml(el)).join("");
      }

      if (concept.text) {
        ret += `<p>${concept.text}</p>`;
      }
    });

    return `<div>${ret}</div>`;
  }

  codingToHtml(el: CODING): string {
    return `
      <p>
      ${el.code ? `<i> Code</i> ${el.code} <br/>` : ""}
      ${el.display ? `<i> Display</i> ${el.display} <br/>` : ""}
      ${
        el.system
          ? `<i> System</i> <a href="${el.system}" target="_blank" rel="noopener noreferrer">${el.system}</a><br/>`
          : ""
      }
      ${
        el.userSelected !== undefined
          ? `<i> UserSelected</i> ${el.userSelected}<br/>`
          : ""
      }
      ${el.version ? `<i> Version</i> ${el.version}<br/>` : ""}
      </p>
    `;
  }

  identifierToHtml(val: IDENTTIFIER[] | IDENTTIFIER): string {
    if (!Array.isArray(val)) {
      val = [val];
    }
    let parts: string[] = [];

    val.forEach((el) => {
      parts.push("<p>");
      if (el.system) {
        parts.push(
          `<i>System</i> <a href="${el.system}" target="_blank" rel="noopener noreferrer">Right Click Open in new tab</a>`
        );
      }
      if (el.value) {
        parts.push(`<i> Value</i> ${el.value}`);
      }
      if (el.period) {
        parts.push(`<i> Period</i> ${this.periodtoHtml(el.period, false)}`);
      }
      if (el.assigner) {
        try {
          const resourceMain = new ResourceMain();
          parts.push(
            `<i> Assigner Organization ID</i> ${resourceMain.getIdFromReference({
              resourceType: "Organization",
              ref: el.assigner.Reference,
            })}`
          );
        } catch (error) {
          console.error("Error processing assigner:", error);
        }
      }
      if (el.type) {
        parts.push(this.codeableConceptToHtml(el.type));
      }

      if (el.use) {
        parts.push(`<i>Use</i> ${el.use}`);
      }

      parts.push("</p>");
    });

    return `<div>${parts.join("")}</div>`; // Join all parts on a single line with "|"
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

  extensionToHtml(val: EXTENSION): string {
    let ret = "";
    if (val.url) {
      ret += `<i>URL</i> : <a href=${val.url} target="_blank" rel="noopener noreferrer">${val.url}</a>
      <br\>`;
    }

    if (val.valueString) {
      ret += `<i>Value</i> : ${val.valueString}`;
    }

    return ret;
  }

  codeDiplaytoHtml(val: CodeDisplay): string {
    let ret: string = "";
    if (val.system) {
      ret += `<i>System</i> <a href="${
        val.system
      }" target="_blank" rel="noopener noreferrer">
        ${val.code || ""} ${val.display || ""}
      </a><br/>`;
    } else {
      ret += `${val.code || ""} ${val.display || ""}`;
    }

    return ret;
  }

  codingtoHtml(val: CODING): string {
    let ret: string = "";
    ret += this.codeDiplaytoHtml(val);

    if (val.userSelected) {
      ret += `<i>User Selected</i> : ${val.userSelected}<br/>`;
    }

    if (val.version) {
      ret += `<i>Version</i> : ${val.version}<br/>`;
    }

    return ret;
  }

  positionToHtml(val: POSITION): string {
    let ret: string = "";

    if (val.altitude) {
      ret += `<i>Altitude</i> : ${val.altitude}<br/> `;
    }

    if (val.latitude) {
      ret += `<i>Latitude</i> : ${val.latitude}<br/>`;
    }

    if (val.longitude) {
      ret += `<i>Longitude</i> : ${val.longitude}<br/>`;
    }
    return ret;
  }

  multiResourceToHtml(
    val: MULTI_RESOURCE[] | MULTI_RESOURCE,
    name: string
  ): string {
    if (!Array.isArray(val)) {
      val = [val];
    }

    if (val.length === 0) {
      return `<p>${name}</p><p>No resources available</p>`;
    }

    let ret: string = `<p>${name}</p>`;

    try {
      ret += val
        .map((el) => {
          const fields = [
            "<p>",
            el.display ? `<i>Display</i> ${el.display}` : "",
            el.type ? `<i>Type</i> ${el.type}` : "",
            el.resource ? `<i>Resource</i> ${el.resource}` : "",
            el.id ? `<i>Resource ID</i> ${el.id}` : "",
            "</p>",
          ].join("");

          return fields
            ? `<div>${fields}</div>`
            : `<div><i>No details available</i></div>`;
        })
        .join("<br>");
    } catch (error) {
      console.error("Error in multiResourceToHtml:", error);
      ret += "<p>Error processing resources</p>";
    }

    return ret;
  }


  payloadToHtml(val:PAYLOAD[]):string{
    const getPayloads = (val: PAYLOAD[]) => 
       val.map(p => `<li>${getPayloadContent(p)}</li>`).join('') || '';

    const getPayloadContent = (payload: PAYLOAD) => {
      if (!payload.content) return '';
      if (payload.content.contentAttachment) {
          const a = payload.content.contentAttachment;

          return `Attachment: ${a.title} 
            ${a.data && `<br/><a href="data:${a.contentType};base64,${a.data}" >Right Click Open in new tab</a>`}
            ${a.url && `<br/><a href="${a.url}" >Right Click Open in new tab</a>`}
          `;
      }
      if (payload.content.contentString) {
          return `Text: ${payload.content.contentString}`;
      }
      if (payload.content.contentReference) {
          return `Reference: ${this.multiResourceToHtml({
            ...payload.content.contentReference
          },""
        )}`;
      }
      return '';
  };

  return getPayloads(val)

  }



}
