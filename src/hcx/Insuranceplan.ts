import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MONEY,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import { QUANTITY } from "../resources/Observation";
import ResourceMain from "../resources/ResourceMai";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

interface OwnedBy extends MULTI_RESOURCE {
  resource: "Organization";
}

interface AdministeredBy extends MULTI_RESOURCE {
  resource: "Organization";
}

interface Network extends MULTI_RESOURCE {
  resource: "Organization";
}

interface CoverageArea extends MULTI_RESOURCE {
  resource: "Location";
}
interface Coverage {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  type: CODEABLE_CONCEPT;
  requirement?: string;
  benefit: {
    extension?: EXTENSION[];
    modifierExtension?: EXTENSION[];
    type: CODEABLE_CONCEPT;
    requirement?: string;
    limit?: {
      id?: string;
      extension?: EXTENSION[];
      modifierExtension?: EXTENSION[];
      value?: QUANTITY;
      code?: CODEABLE_CONCEPT;
    }[];
  }[];
  network?: Network[];
}

interface Plan {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  identifier?: IDENTTIFIER[];
  coverageArea?: CoverageArea[];
  type: CODEABLE_CONCEPT;
  generalCost?: {
    id?: string;
    extension?: EXTENSION[];
    modifierExtension?: EXTENSION[];
    type?: CODEABLE_CONCEPT;
    groupSize?: number;
    cost?: MONEY;
    comment?: string;
  }[];
  network?: Network[];
}

export interface INSURANCE_PLAN {
  id?: string;
  text: string;
  resourceType: "InsurancePlan";
  identifier: IDENTTIFIER[];
  extension: EXTENSION[];
  status: "draft" | "active" | "retired" | "unknown";
  type: CODEABLE_CONCEPT;
  period: PERIOD;
  name: string;
  ownedBy: OwnedBy;
  administeredBy?: AdministeredBy;
  alias?: string[];
  coverage: Coverage[];
  plan: Plan[];
}

export interface TO_HTML_HCX_OPTIONS_INSURANCE_PLAN
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: INSURANCE_PLAN;
}
export class InsurancePlan extends ResourceMain implements ResourceMaster {
  getFHIR(options: INSURANCE_PLAN) {
    const body = {
      resourceType: "InsurancePlan",
      id: options.id,
      meta: {
        versionId: "1",
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/InsurancePlan",
        ],
      },
      text: {
        status: "extensions",
        div: options.text,
      },
      alias: options.alias,
      extension: options.extension,
      identifier: options.identifier,
      status: options.status,
      type: options.type,
      name: options.name,
      period: options.period,
      ownedBy: options.ownedBy && {
        reference:
          options.ownedBy.resource &&
          options.ownedBy.id &&
          `${options.ownedBy.resource}/${options.ownedBy.id}`,
        identifier: options.ownedBy.identifier,
        display: options.ownedBy.display,
        type: options.ownedBy.type,
      },
      administeredBy: options.administeredBy && {
        reference:
          options.administeredBy.resource &&
          options.administeredBy.id &&
          `${options.administeredBy.resource}/${options.administeredBy.id}`,
        identifier: options.administeredBy.identifier,
        display: options.administeredBy.display,
        type: options.administeredBy.type,
      },
      coverage: options.coverage,
      plan: options.plan,
    };

    return body;
  }
  convertFhirToObject(options: any): INSURANCE_PLAN {
    const ret: INSURANCE_PLAN = {
      id: options.id,
      text: options.text && options.text.div,
      resourceType: "InsurancePlan",
      identifier: options.identifier,
      extension: options.extension,
      status: options.status,
      type: options.type,
      period: options.period,
      name: options.name,
      ownedBy:
        options.oownedBy &&
        ((options.ownedBy.reference &&
          this.getFromMultResource(options.ownedBy)) ||
          options.ownedBy),
      administeredBy:
        options.administeredBy &&
        ((options.administeredBy.reference &&
          this.getFromMultResource(options.administeredBy)) ||
          options.administeredBy),
      alias: options.alias,
      coverage: options.coverage,
      plan: options.plan,
    };

    // Remove keys with null or undefined values
    Object.keys(ret).forEach((key) => {
      if (
        ret[key as keyof INSURANCE_PLAN] === null ||
        ret[key as keyof INSURANCE_PLAN] === undefined
      ) {
        delete ret[key as keyof INSURANCE_PLAN];
      }
    });

    return ret;
  }
  async toHtml(option: TO_HTML_HCX_OPTIONS_INSURANCE_PLAN): Promise<string> {
    option.body = this.convertFhirToObject(option.body)
    const getLimit = (
      limit: INSURANCE_PLAN["coverage"][number]["benefit"][number]["limit"]
    ): string => {
      const limitRet =
        limit &&
        limit.map((el) => {
          let ret = `<tr><td>${
            el.code && this.codeableConceptToHtml(el.code)
          }</td>`;
          ret += `<td>${el.value && el.value.value || ""}</td></tr>`;

          return ret;
        });

      let tablest = `<table data-pdfmake="{'widths':['60%','40%']}">
        <tr>
          <th>
            Item
          </th>
          <th>
            Value
          </th>
        </tr>
          ${limitRet?.join("")}
        
      </table>
      `;
      return tablest;
    };

    const getBenfit = (
      benefit: INSURANCE_PLAN["coverage"][number]["benefit"]
    ) => {
      const benefitRet = benefit.map((el) => {
        let ret = `<b>${el.type && this.codeableConceptToHtml(el.type)}</b>`;
        ret += el.requirement && `<p>${el.requirement}</p>`;
        ret += getLimit(el.limit);
        return ret;
      });

      return benefitRet.join("</br/>");
    };

    const getCoverage = (): string => {
      const coveragedstr =
        data.coverage &&
        data.coverage.map((el) => {
          let ret = `<h3>${this.codeableConceptToHtml(el.type)}</h3>`;
          ret += el.requirement && `<p>${el.requirement}</p>`;
          ret += getBenfit(el.benefit);
          return ret;
        });

      return coveragedstr.join("</br/>");
    };

    const data = option.body;
    return `
      <div>
        <h1>Insurance Plan</h1>
        <p><strong>Resource Type:</strong> ${data.resourceType}</p>
        <p><strong>ID:</strong> ${data.id || "N/A"}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Text:</strong> ${data.text || "N/A"}</p>
        <p><strong>Type:</strong> ${data.type?.text || "N/A"}</p>
        <p><strong>Period:</strong> ${
          data.period?.start
            ? new Date(data.period.start).toLocaleDateString()
            : "N/A"
        } to ${
      data.period?.end ? new Date(data.period.end).toLocaleDateString() : "N/A"
    }</p>
        <p><strong>Owned By:</strong> ${data.ownedBy?.display || "N/A"} (${
      data.ownedBy?.reference || "N/A"
    })</p>
        <p><strong>Administered By:</strong> ${
          data.administeredBy?.display || "N/A"
        } (${data.administeredBy?.reference || "N/A"})</p>
        <p><strong>Alias:</strong> ${data.alias?.join(", ") || "None"}</p>
  
        <h2>Identifiers</h2>
        <ul>
          ${
            data.identifier
              ?.map(
                (id) => `
            <li>
              <strong>System:</strong> ${id.system || "N/A"}, 
              <strong>Value:</strong> ${id.value || "N/A"}
            </li>
          `
              )
              .join("") || "<li>None</li>"
          }
        </ul>
  
        <h2>Coverage</h2>
          ${getCoverage()}
        <h2>Plans</h2>
        <table border="1" cellspacing="0" cellpadding="5">
          <thead>
            <tr>
              <th>Type</th>
              <th>Coverage Areas</th>
              <th>General Costs</th>
              <th>Networks</th>
            </tr>
          </thead>
          <tbody>
            ${
              data.plan
                ?.map(
                  (plan) => `
              <tr>
                <td>${plan.type?.text || "N/A"}</td>
                <td>
                  <ul>
                    ${
                      plan.coverageArea
                        ?.map(
                          (area) => `
                      <li>
                        <strong>Resource:</strong> ${area.resource || "N/A"}<br>
                        <strong>Reference:</strong> ${area.reference || "N/A"}
                      </li>
                    `
                        )
                        .join("") || "<li>None</li>"
                    }
                  </ul>
                </td>
                <td>
                  <ul>
                    ${
                      plan.generalCost
                        ?.map(
                          (cost) => `
                      <li>
                        <strong>Type:</strong> ${cost.type?.text || "N/A"}<br>
                        <strong>Group Size:</strong> ${
                          cost.groupSize || "N/A"
                        }<br>
                        <strong>Cost:</strong> ${cost.cost?.value || "N/A"} ${
                            cost.cost?.currency || ""
                          }<br>
                        <strong>Comment:</strong> ${cost.comment || "N/A"}
                      </li>
                    `
                        )
                        .join("") || "<li>None</li>"
                    }
                  </ul>
                </td>
                <td>
                  <ul>
                    ${
                      plan.network
                        ?.map(
                          (network) => `
                      <li>
                        <strong>Resource:</strong> ${
                          network.resource || "N/A"
                        }<br>
                        <strong>Display:</strong> ${network.display || "N/A"}
                      </li>
                    `
                        )
                        .join("") || "<li>None</li>"
                    }
                  </ul>
                </td>
              </tr>
            `
                )
                .join("") || "<tr><td colspan='4'>No Plans Available</td></tr>"
            }
          </tbody>
        </table>
      </div>
    `;
  }

  statusArray?: Function | undefined;
}


