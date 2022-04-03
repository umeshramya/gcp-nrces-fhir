import { type } from "os";
import { CodeDisplay, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

interface Subject extends MULTI_RESOURCE {
  resource:
    | "Group"
    | "Device"
    | "Location"
    | "Patient"
    | "Specimen"
    | "Practitioner"
    | "PractitionerRole";
}

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
const mediaMimeType = [
  "image/jpeg",
  "image/png",
  "image/bmp",
  "audio/mpeg",
  "video/mp4",
  "video/mpeg",
] as const;
type MediaMimeType = typeof mediaMimeType[number];

export interface MEDIA {
  id?: string;
  status: MediaStatus;
  subject: Subject;
  createdDate: string;
  bodySite: CodeDisplay[];
  /**
   * device used to get  image like Ct scan camery etc
   */
  modality: CodeDisplay[];
  mimeType: MediaMimeType;
  title: string;
  base64Data: string;
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
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${options.title}</div>`,
      },
      status: options.status,
      modality: {
        coding: options.modality,
      },
      subject: {
        reference: `${options.subject.resource}/${options.subject.id}`,
      },
      createdDateTime: options.createdDate,
      bodySite: {
        coding: options.bodySite,
      },
      content: {
        contentType: options.mimeType,
        language: "en-IN",
        data: options.base64Data,
        title: options.title,
        creation: options.createdDate,
      },
    };

    return body;
  }
  convertFhirToObject(options: any): MEDIA {
    let ret: MEDIA = {
      status: options.status,
      subject: this.getFromMultResource(options.subject) as any,
      createdDate: options.createdDateTime,
      bodySite: options.bodySite.coding,
      modality: options.modality.coding,
      mimeType: options.content.contentType,
      title: options.content.title,
      base64Data: options.content.data,
    };

    return ret;
  }
  statusArray(): MediaStatus[] {
    return mediaStatusArray.map((el) => el);
  }

  mimeTypeArray(): MediaMimeType[] {
    return mediaMimeType.map((el) => el);
  }
}
