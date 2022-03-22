import ResourceFactory from "../../classess/ResourceFactory";
import { COMPOSITOIN } from "../Composition";
import GcpFhirCrud from "../../classess/gcp";
import ResourceMain from "../ResourceMai";
import { Binary, BINARY } from "../Binary";

export class BundelMain extends ResourceMain {
  async getentries(
    composition: any,
    pdfData: string
  ): Promise<{ entry: any[]; compositionObj: COMPOSITOIN }> {
    const compositionObj = new ResourceFactory(
      "Composition"
    ).convertFhirToObject<COMPOSITOIN>(composition);
    const gcpGcpFhir = new GcpFhirCrud();

    const authors: any = await Promise.all(
      compositionObj.author.map(async (el) => {
        const id = this.getIdFromReference({
          ref: el.reference,
          resourceType: "Practitioner",
        });
        const url = el.reference;
        const resource = await gcpGcpFhir
          .getFhirResource(id, "Practitioner")
          .then((res) => res.data);
        return {
          fullUrl: url,
          resource: resource,
        };
      })
    ).then((res) => res);

    const entry = [
      {
        fullUrl: `Composition/${compositionObj.id}`,
        resource: composition,
      },
      {
        fullUrl: `Patient/${compositionObj.patientId}`,
        resource: await gcpGcpFhir.getFhirResource(
          compositionObj.patientId,
          "Patient"
        ),
      },
      {
        fullUrl: `Encounter/${compositionObj.encounterId}`,
        resource: await gcpGcpFhir.getFhirResource(
          compositionObj.encounterId,
          "Encounter"
        ),
      },

      {
        fullUrl: `Organization/${compositionObj.organizationId}`,
        resource: await gcpGcpFhir.getFhirResource(
          compositionObj.organizationId,
          "Organization"
        ),
      },
      {
        fullUrl: "Binary/1",
        resource: new Binary().getFHIR({
          id: "1",
          data: pdfData,
        }),
      },
    ];

    authors.forEach((el: { fullUrl: string; resource: any }) => {
      entry.push(el);
    });

    return { entry, compositionObj };
  }
}
