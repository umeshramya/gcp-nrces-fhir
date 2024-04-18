import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, MULTI_RESOURCE, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";
import { DiagnosticReport } from "../DiagnosticReport";

export class DiagnsoticReportBundle
  extends BundelMain
  implements ResourceMaster
{
 async toHtml():Promise<string> {
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

    const bundlemain = await new BundelMain(this.gcpCredetials,this.gcpPath).getentries(
      options.composition,
      options.pdfData
    );

    const entry = bundlemain.entry;
    // write code to pusj diagnosticreport here
    const sectionEntries = bundlemain.compositionObj.section[0].entry as {
      reference: string;
      type: resourceType;
    }[];

    const diagnosticReportId = this.getIdFromReference({
      ref: sectionEntries.filter((el) => el.type == "DiagnosticReport")[0]
        .reference,
      resourceType: "DiagnosticReport",
    });

    const gcpCrud = new GcpFhirCrud(this.gcpCredetials, this.gcpPath);
    const diagnsoticReport = await gcpCrud
      .getFhirResource(diagnosticReportId, "DiagnosticReport")
      .then((res) => res.data);

    const diagnosticReportObj = new DiagnosticReport().convertFhirToObject(
      diagnsoticReport
    );
    const mediaIds = diagnosticReportObj.mediaId;
    const specimenIDs = diagnosticReportObj.specimenId || [];
   

    entry.push({
      fullUrl: `DiagnosticReport/${diagnosticReportId}`,
      resource: diagnsoticReport,
    });

    await this.getMedia(0, mediaIds, entry);
    if (specimenIDs?.length > 0) {
      await this.getSpecimen(0, specimenIDs, entry);
    }
    if (diagnosticReportObj.basedOn) {
      await this.getBasedOn(0, diagnosticReportObj.basedOn, entry);
    }
    if (diagnosticReportObj.observationResultid){
      await this.getObservations(0, diagnosticReportObj.observationResultid, entry)
    }

    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle",
        ],
        security: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
            code: "V",
            display: "very restricted",
          },
        ],
      },
      identifier: options.identifier,
      type: "document",
      timestamp: new Date().toISOString,
      entry: entry,
    };

    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }

  private getMedia = async (
    index: number,
    mediaids: string[],
    entry: any[]
  ) => {
    if (index >= mediaids.length) {
      return;
    }
    const media = (
      await new GcpFhirCrud(this.gcpCredetials, this.gcpPath).getFhirResource(mediaids[index], "Media")
    ).data;
    entry.push({
      fullUrl: `Media/${mediaids[index]}`,
      resource: media,
    });
    index = index + 1;
    this.getMedia(index, mediaids, entry);
  };

  private getSpecimen = async (
    index: number,
    specimenids: string[],
    entry: any[]
  ) => {
    if (index >= specimenids.length) {
      return;
    }
    const specimen = (
      await new GcpFhirCrud(this.gcpCredetials, this.gcpPath).getFhirResource(specimenids[index], "Specimen")
    ).data;
    entry.push({
      fullUrl: `Specimen/${specimenids[index]}`,
      resource: specimen,
    });
    index = index + 1;
    this.getSpecimen(index, specimenids, entry);
  };

    private getObservations = async (
    index: number,
    observationids: string[],
    entry: any[]
  ) => {
    if (index >= observationids.length) {
      return;
    }
    const observation = (
      await new GcpFhirCrud(this.gcpCredetials, this.gcpPath).getFhirResource(observationids[index], "Observation")
    ).data;
    entry.push({
      fullUrl: `Observation/${observationids[index]}`,
      resource: observation,
    });
    index = index + 1;
    this.getObservations(index, observationids, entry);
  };

  private getBasedOn = async (
    index: number,
    basedOnRefs: MULTI_RESOURCE[],
    entry: any[]
  ) => {
    if (index >= basedOnRefs.length) {
      return;
    }
    const basedOn = await new GcpFhirCrud(this.gcpCredetials, this.gcpPath).getFhirResource(
      basedOnRefs[index].id,
      basedOnRefs[index].resource
    );
    entry.push({
      fullUrl: `${basedOnRefs[index].resource}/${basedOnRefs[index].id}`,
      resource: basedOn.data,
    });
    index = index + 1;
    this.getBasedOn(index, basedOnRefs, entry);
  };

  statusArray?: Function | undefined;
}
