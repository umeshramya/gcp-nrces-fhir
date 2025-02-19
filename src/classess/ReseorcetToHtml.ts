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
import { COVERAGE,  TO_HTML_HCX_OPTIONS_COVERAGE } from "../hcx/Coverage";
import { INSURANCE } from "../hcx/CoverageEligibilityRequest";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import GcpFhirCRUD from "./gcp";

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



  async insuranceToHtml(option: {
    val: INSURANCE[];
    patient: any;
    payerCode: string;
    payerName: string;
  }): Promise<string> {
    let ret = "";
  
    if (option.val.length > 0) {
      ret += `<h4>Insurances</h4>`;
      ret += `<table data-pdfmake="{'widths':['50%','25%', '25%']}">
        <tr>
          <th>Coverage</th>
          <th>Extension</th>
          <th>Focal</th>
        </tr>`;
  
      for (const el of option.val) {
        ret += `<tr><td>`;
        
        // Coverages
        if (el.coverage?.reference) {
          try {
          
            const id = `${el.coverage?.reference}`.substring("Coverage".length + 1);

            const coverageRes = (await new GcpFhirCRUD().getFhirResource(id, "Coverage")).data;
            ret += await this.coverageToHtml({
              addResourceType: false,
              patient: option.patient,
              payerCode: option.payerCode,
              payerName: option.payerName,
              body: coverageRes,
              showInsuranceCompany: false,
              showPatient: false,
            });
          } catch (error) {
            console.error("Error fetching coverage:", error);
          }
        }
        ret += `</td>`;
  
        // Extension
        ret += `<td>`;
        if (el.extension) {
          ret += el.extension.map(ex => this.extensionToHtml(ex)).join(`<br/>`);
        }
        ret += `</td>`;
  
        // Focal
        ret += `<td>${el.focal || ""}</td>`;
        ret += `</tr>`;
      }
  
      ret += `</table>`;
    }
  
    return ret;
  }
  


    async coverageToHtml(option: TO_HTML_HCX_OPTIONS_COVERAGE): Promise<string> {
      const body= option.body
      let ret = "";
      if (option.addResourceType) {
        ret += `<h1>Coverage</h1>`;
      }
      if (body.div && body.div.text != "") {
        ret += `<h2>Text</h2>`;
        ret += `${body.div.text}`;
      }
  
      if (option.showPatient) {
            ret += `<h3>Patient</h3>`;
          ret += `<p>UHID ${option.patient.MRN} Name ${option.patient.name} ${option.patient.mobile || ""}</p>`
      }
  
      if (option.showInsuranceCompany && option.body.insurerOrganizationId) {
        ret += `<h3>Insurance</h3>`;
        ret +=  `<p>${option.payerName}  ${option.payerCode}</p>`
        ret += `<hr/>`;
      }
  
  
      if(option.body.payor && option.body.payor.length >0){
        ret +=`<h3>Payor</h3>`
        option.body.payor.forEach((el:any)=>{
          if(el.display){
            ret += `<i>Display</i> : ${el.display}<br/>`
          }
          if(el.resource){
            ret +=`<i>Resource Type</i> : ${el.resource} `
          }
          if(el.id){
            ret += `<i>Id</i> : ${el.id}`
          }
        })
      }
  
      ret += `<hr/>`;
  
      if(option.body.status){
        ret += `<b>Coverage Status</b> : ${option.body.status}<br/>`
      }
  
      if (option.body.policyHolder && option.body.policyHolder.id) {
        ret += `<b>PolicyHolder</b> : ${option.body.policyHolder.id}<br/>`;
      }
  
      if(option.body.subscriberId){
        ret += `<b>Policy Subscriber</b> : ${option.body.subscriberId}<br/>`
      }
  
      if(option.body.relationship){
        ret += `<b>Subscriber Relationship</b> : ${this.codeableConceptToHtml(option.body.relationship)}<br/>`
      }
  
      if (option.body.period) {
        ret += `Coverage Period : Start : ${new TimeZone().convertTZ(
          option.body.period.start,
          "Asia/Kolkata",
          true
        )} - End : ${new TimeZone().convertTZ(
          option.body.period.end,
          "Asia/Kolkata",
          true
        )}<br/>`;
      }
  
  
  
      return ret;
    }


    


}
