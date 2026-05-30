import { ResourceMaster } from "../../Interfaces";
import { IDENTTIFIER } from "../../config";
import { BundelMain } from ".";
import GcpFhirCrud from "../../classess/gcp";
import ResourceFactory from "../../classess/ResourceFactory";

export class WellnessRecordBundle
  extends BundelMain
  implements ResourceMaster
{
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async getFHIR(options: {
    id?: string;
    identifier?: IDENTTIFIER;
    composition: any;
    pdfData: string;
  }) {
    if (options.identifier) {
      let ret: IDENTTIFIER = {
        system: "http://www.nicehms.com",
        value: options.identifier.value,
      };
    }
    options.composition.title = "Wellness Record Document";

    const bundlemain = await new BundelMain(
      this.gcpCredetials,
      this.gcpPath
    ).getentries(options.composition, options.pdfData);

    this.entry = bundlemain.entry;

    // Extract observation IDs and non-observation entries from all sections
    const observationIds: string[] = [];
    const nonObsEntries: any[] = [];
    const sections = options.composition.section || [];
    for (const section of sections) {
      if (section.entry) {
        for (const entry of section.entry) {
          if (entry.type === "Observation" && entry.reference) {
            const refParts = entry.reference.split("/");
            if (refParts.length === 2) {
              observationIds.push(refParts[1]);
            }
          } else if (entry.reference) {
            nonObsEntries.push(entry);
          }
        }
      }
    }

    if (observationIds.length > 0) {
      await this.getObservations(0, observationIds);
    }

    if (nonObsEntries.length > 0) {
      await this.getEntriesPerSection(0, nonObsEntries);
    }

    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        lastUpdated: new Date().toISOString(),
      },
      identifier: {
        system: "https://www.nicehms.com/bundle",
        value: options.id,
      },
      type: "document",
      timestamp: options.composition.date,
      entry: this.entry,
    };

    return body;
  }

  private getObservations = async (
    index: number,
    observationids: string[]
  ) => {
    if (index >= observationids.length) {
      return;
    }
    const observation = (
      await new GcpFhirCrud(this.gcpCredetials, this.gcpPath).getFhirResource(
        observationids[index],
        "Observation"
      )
    ).data;
    this.entry.push({
      fullUrl: `Observation/${observationids[index]}`,
      resource: new ResourceFactory("Observation").bundlefy(observation),
    });
    index = index + 1;
    await this.getObservations(index, observationids);
  };

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }

  statusArray?: Function | undefined;
}
