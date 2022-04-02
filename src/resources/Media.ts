import { type } from "os";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

const mediaStatusArray = [
  "preparation",
  "in-progress",
  "not-done",
  "on-hold ",
  "stopped",
  "completed",
  "entered-in-error",
  "unknown",
] as const;
type MediaStatus = typeof mediaStatusArray[number];
export interface MEDIA {
  id?: string;
  status: MediaStatus;
}

export class Media extends ResourceMain implements ResourceMaster {
  getFHIR(options: MEDIA) {
    const body = {
      resourceType: "Media",
      id: options.id || undefined,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Media"],
      },
      text: {
        status: "generated",
        div: '<div xmlns="http://www.w3.org/1999/xhtml">HEAD and NECK CT DICOM imaging study</div>',
      },
      status: options.status,
      modality: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "429858000",
            display: "CT of head and neck",
          },
        ],
      },
      subject: { reference: "Patient/1" },
      createdDateTime: "2020-07-10",
      bodySite: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "774007",
            display: "Structure of head and/or neck",
          },
        ],
      },
      content: {
        contentType: "image/jpeg",
        language: "en-IN",
        data: "",
        title: "Computed tomography (CT) of head and neck",
        creation: "2020-07-09T11:46:09+05:30",
      },
    };

    return body;
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray(): MediaStatus[] {
    return mediaStatusArray.map((el) => el);
  }
}
