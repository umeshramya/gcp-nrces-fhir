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
  benefit:{
    extension?:EXTENSION[];
    modifierExtension?:EXTENSION[]
    type:CODEABLE_CONCEPT;
    requirement?:string
    limit?: {
      id?: string;
      extension?: EXTENSION[];
      modifierExtension?: EXTENSION[];
      value?: QUANTITY;
      code?: CODEABLE_CONCEPT;
    }[];
  }[]
  network?: Network[];
}

interface Plan {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?:EXTENSION[]
  identifier?:IDENTTIFIER[]
  coverageArea?:CoverageArea[]
  type: CODEABLE_CONCEPT;
  generalCost?:{
    id?:string;
    extension?:EXTENSION[];
    modifierExtension?: EXTENSION[];
    type?:CODEABLE_CONCEPT;
    groupSize?:number
    cost?:MONEY;
    comment?:string
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
      plan: [
        {
          identifier: [
            {
              use: "official",
              value: "Active Assure Silver",
            },
          ],
          type: {
            coding: [
              {
                system:
                  "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-plan-type",
                code: "01",
                display: "Individual",
              },
            ],
          },
          generalCost: [
            {
              cost: {
                value: 200000,
                currency: "INR",
              },
            },
          ],
          specificCost: [
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "49122002",
                    display: "Ambulance, device (physical object)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "49122002",
                        display: "Ambulance, device (physical object)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 2000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "224663004",
                    display: "Single room (environment)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "224663004",
                        display: "Single room (environment)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 2000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "309904001",
                    display: "Intensive care unit (environment)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "309904001",
                        display: "Intensive care unit (environment)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 4000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "60689008",
                    display: "Home care of patient",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "60689008",
                        display: "Home care of patient",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 20000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          identifier: [
            {
              use: "official",
              value: "Active Assure Silver",
            },
          ],
          type: {
            coding: [
              {
                system:
                  "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-plan-type",
                code: "01",
                display: "Individual",
              },
            ],
          },
          generalCost: [
            {
              cost: {
                value: 700000,
                currency: "INR",
              },
            },
          ],
          specificCost: [
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "49122002",
                    display: "Ambulance, device (physical object)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "49122002",
                        display: "Ambulance, device (physical object)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 2000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "224663004",
                    display: "Single room (environment)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "224663004",
                        display: "Single room (environment)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 7000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "309904001",
                    display: "Intensive care unit (environment)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "309904001",
                        display: "Intensive care unit (environment)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 14000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "60689008",
                    display: "Home care of patient",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "60689008",
                        display: "Home care of patient",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 70000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
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
    const data = option.body;
  
    return `
      <div>
        <h1>Insurance Plan</h1>
        <p><strong>Resource Type:</strong> ${data.resourceType}</p>
        <p><strong>ID:</strong> ${data.id || "N/A"}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Text:</strong> ${data.text}</p>
        <p><strong>Type:</strong> ${data.type?.text || "N/A"}</p>
        <p><strong>Period:</strong> 
          ${data.period?.start ? new Date(data.period.start).toLocaleDateString() : "N/A"} 
          to 
          ${data.period?.end ? new Date(data.period.end).toLocaleDateString() : "N/A"}
        </p>
        <p><strong>Owned By:</strong> 
          ${data.ownedBy?.display || "N/A"} 
          (${data.ownedBy?.reference || "N/A"})
        </p>
        <p><strong>Administered By:</strong> 
          ${data.administeredBy?.display || "N/A"} 
          (${data.administeredBy?.reference || "N/A"})
        </p>
        <p><strong>Alias:</strong> ${data.alias?.join(", ") || "None"}</p>
  
        <h2>Identifiers</h2>
        <ul>
          ${data.identifier
            ?.map(
              (id) => `
              <li>
                <strong>System:</strong> ${id.system || "N/A"}, 
                <strong>Value:</strong> ${id.value || "N/A"}
              </li>`
            )
            .join("") || "<li>None</li>"}
        </ul>
  
        <h2>Coverage</h2>
        ${data.coverage
          ?.map(
            (coverage, index) => `
            <div>
              <h3>Coverage ${index + 1}</h3>
              <p><strong>Type:</strong> ${coverage.type?.text || "N/A"}</p>
              <p><strong>Requirement:</strong> ${coverage.requirement || "N/A"}</p>
              <h4>Benefits</h4>
              <ul>
                ${coverage.benefit
                  ?.map(
                    (benefit) => `
                    <li>
                      <p><strong>Type:</strong> ${benefit.type?.text || "N/A"}</p>
                      <p><strong>Requirement:</strong> ${benefit.requirement || "N/A"}</p>
                      <h5>Limits</h5>
                      <ul>
                        ${benefit.limit
                          ?.map(
                            (limit) => `
                            <li>
                              <p><strong>Value:</strong> ${limit.value?.value || "N/A"} ${
                              limit.value?.unit || ""
                            }</p>
                              <p><strong>Code:</strong> ${limit.code?.text || "N/A"}</p>
                            </li>`
                          )
                          .join("") || "<li>None</li>"}
                      </ul>
                    </li>`
                  )
                  .join("") || "<li>None</li>"}
              </ul>
              <h4>Network</h4>
              <ul>
                ${coverage.network
                  ?.map(
                    (network) => `
                    <li>
                      <strong>Resource:</strong> ${network.resource || "N/A"}, 
                      <strong>Display:</strong> ${network.display || "N/A"}
                    </li>`
                  )
                  .join("") || "<li>None</li>"}
              </ul>
            </div>`
          )
          .join("") || "<p>No Coverage Available</p>"}
  
        <h2>Plans</h2>
        ${data.plan
          ?.map(
            (plan, index) => `
            <div>
              <h3>Plan ${index + 1}</h3>
              <p><strong>Type:</strong> ${plan.type?.text || "N/A"}</p>
              <h4>Coverage Areas</h4>
              <ul>
                ${plan.coverageArea
                  ?.map(
                    (area) => `
                    <li>
                      <strong>Resource:</strong> ${area.resource || "N/A"}, 
                      <strong>Reference:</strong> ${area.reference || "N/A"}
                    </li>`
                  )
                  .join("") || "<li>None</li>"}
              </ul>
              <h4>General Costs</h4>
              <ul>
                ${plan.generalCost
                  ?.map(
                    (cost) => `
                    <li>
                      <p><strong>Type:</strong> ${cost.type?.text || "N/A"}</p>
                      <p><strong>Group Size:</strong> ${cost.groupSize || "N/A"}</p>
                      <p><strong>Cost:</strong> ${cost.cost?.value || "N/A"} ${
                      cost.cost?.currency || ""
                    }</p>
                      <p><strong>Comment:</strong> ${cost.comment || "N/A"}</p>
                    </li>`
                  )
                  .join("") || "<li>None</li>"}
              </ul>
              <h4>Network</h4>
              <ul>
                ${plan.network
                  ?.map(
                    (network) => `
                    <li>
                      <strong>Resource:</strong> ${network.resource || "N/A"}, 
                      <strong>Display:</strong> ${network.display || "N/A"}
                    </li>`
                  )
                  .join("") || "<li>None</li>"}
              </ul>
            </div>`
          )
          .join("") || "<p>No Plans Available</p>"}
      </div>
    `;
  }
  

  statusArray?: Function | undefined;
}
