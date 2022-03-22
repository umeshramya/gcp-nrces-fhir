import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER } from "../../config";
import { COMPOSITOIN } from "../Composition";
import ResourceFactory from "../../classess/ResourceFactory";
import GcpFhirCrud from "../../classess/gcp";
import { Url } from "url";
import { BINARY } from "../Binary";
import { BundelMain } from ".";

export class PrescriptionBundle extends ResourceMain implements ResourceMaster {
  async getFHIR(options: {
    id?: string;
    identifier?: IDENTTIFIER;
    /**
     * pass the compostoin with converting as .data
     */
    composition: any;
    pdfData: string;
  }) {
    if (options.identifier) {
      let ret: IDENTTIFIER = {
        system: "http://www.nicehms.com",
        value: options.identifier.value,
      };
    }

    const entry = await new BundelMain().getentries(
      options.composition,
      options.pdfData
    );

    // const compositionObj = new ResourceFactory(
    //   "Composition"
    // ).convertFhirToObject<COMPOSITOIN>(options.composition);
    // const gcpGcpFhir = new GcpFhirCrud();

    // const authors: any = await Promise.all(
    //   compositionObj.author.map(async (el) => {
    //     const id = this.getIdFromReference({
    //       ref: el.reference,
    //       resourceType: "Practitioner",
    //     });
    //     const url = el.reference;
    //     const resource = await gcpGcpFhir
    //       .getFhirResource(id, "Practitioner")
    //       .then((res) => res.data);
    //     return {
    //       fullUrl: url,
    //       resource: resource,
    //     };
    //   })
    // ).then((res) => res);

    // const entry = [
    //   {
    //     fullUrl: `Composition/${options.composition.id}`,
    //     resource: options.composition,
    //   },
    //   {
    //     fullUrl: `Patient/${compositionObj.patientId}`,
    //     resource: await gcpGcpFhir.getFhirResource(
    //       compositionObj.patientId,
    //       "Patient"
    //     ),
    //   },
    //   {
    //     fullUrl: `Encounter/${compositionObj.encounterId}`,
    //     resource: await gcpGcpFhir.getFhirResource(
    //       compositionObj.encounterId,
    //       "Encounter"
    //     ),
    //   },
    //   {
    //     fullUrl: "Binary/1",
    //     resource: new ResourceFactory("Binary").getFHIR<BINARY>({
    //       id: "1",
    //       data: options.pdfData,
    //     }),
    //   },
    // ];

    // authors.forEach((el: { fullUrl: string; resource: any }) => {
    //   entry.push(el);
    // });

    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        versionId: "1",
        lastUpdated: "2020-07-09T15:32:26.605+05:30",
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
  statusArray?: Function | undefined;
}

// {
//   patient: undefined,
//   patientId: '9474c98a-789f-4dd4-981b-d6a59534f063',
//   encounter: undefined,
//   encounterId: '927e05c9-5686-4d28-8a3a-d10f830ad90d',
//   date: '2022-03-22T03:17:42.121Z',
//   organization: undefined,
//   organizationId: 'fd6464c1-a8ef-4e95-aa2a-d5eac433b85d',
//   status: 'final',
//   type: 'Prescription',
//   section: [ { code: [Object], entry: [Array], title: 'Prescription' } ],
//   id: 'bfb6a47a-58a9-4ce1-98ba-7a66c8876eb9',
//   identifier: '2601e29a-44d6-4014-b377-8bccaef63fbb',
//   author: [
//     {
//       display: 'Dr U R  Bilagi',
//       reference: 'Practitioner/cf4a6ab1-3f32-4b92-adc5-89489da6ca14'
//     }
//   ]
// }

// {
//   "fullUrl": "MedicationRequest/1",
//   "resource": {
//     "resourceType": "MedicationRequest",
//     "id": "1",
//     "meta": {
//       "profile": [
//         "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest"
//       ]
//     },
//     "text": {
//       "status": "generated",
//       "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative</b></p><p><b>status</b>: active</p><p><b>intent</b>: order</p><p><b>medication</b>: <span title=\"Codes: {http://snomed.info/sct 324252006}\">Azithromycin (as azithromycin dihydrate) 250 mg oral capsule</span></p><p><b>subject</b>: <a href=\"#Patient_1\">ABC. Generated Summary: Medical record number: 22-7225-4829-5255; ABC; Phone: +919818512600; gender: male; birthDate: 1981-01-12</a></p><p><b>authoredOn</b>: 2020-07-09</p><p><b>requester</b>: <a href=\"#Practitioner_1\">Dr. DEF. Generated Summary: Medical License number: 21-1521-3828-3227; Dr. DEF</a></p><p><b>reasonCode</b>: <span title=\"Codes: {http://snomed.info/sct 11840006}\">Traveler's diarrhea</span></p><p><b>reasonReference</b>: <a href=\"#Condition_1\">See above (Condition/1)</a></p></div>"
//     },
//     "status": "active",
//     "intent": "order",
//     "medicationCodeableConcept": {
//       "coding": [
//         {
//           "system": "http://snomed.info/sct",
//           "code": "324252006",
//           "display": "Azithromycin (as azithromycin dihydrate) 250 mg oral capsule"
//         }
//       ]
//     },
//     "subject": { "reference": "Patient/1", "display": "ABC" },
//     "authoredOn": "2020-07-09",
//     "requester": { "reference": "Practitioner/1", "display": "Dr. DEF" },
//     "reasonCode": [
//       {
//         "coding": [
//           {
//             "system": "http://snomed.info/sct",
//             "code": "11840006",
//             "display": "Traveler's diarrhea"
//           }
//         ]
//       }
//     ],
//     "reasonReference": [{ "reference": "Condition/1" }],
//     "dosageInstruction": [
//       {
//         "text": "One tablet at once",
//         "additionalInstruction": [
//           {
//             "coding": [
//               {
//                 "system": "http://snomed.info/sct",
//                 "code": "311504000",
//                 "display": "With or after food"
//               }
//             ]
//           }
//         ],
//         "timing": {
//           "repeat": { "frequency": 1, "period": 1, "periodUnit": "d" }
//         },
//         "route": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "26643006",
//               "display": "Oral Route"
//             }
//           ]
//         },
//         "method": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "421521009",
//               "display": "Swallow"
//             }
//           ]
//         }
//       }
//     ]
//   }
// },
// {
//   "fullUrl": "MedicationRequest/2",
//   "resource": {
//     "resourceType": "MedicationRequest",
//     "id": "2",
//     "meta": {
//       "profile": [
//         "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest"
//       ]
//     },
//     "text": {
//       "status": "generated",
//       "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative</b></p><p><b>status</b>: active</p><p><b>intent</b>: order</p><p><b>medication</b>: <span title=\"Codes: \">Paracetemol 500mg Oral Tab</span></p><p><b>subject</b>: <a href=\"#Patient_1\">ABC. Generated Summary: Medical record number: 22-7225-4829-5255; ABC; Phone: +919818512600; gender: male; birthDate: 1981-01-12</a></p><p><b>authoredOn</b>: 2020-07-09</p><p><b>requester</b>: <a href=\"#Practitioner_1\">Dr. DEF. Generated Summary: Medical License number: 21-1521-3828-3227; Dr. DEF</a></p><p><b>reasonCode</b>: <span title=\"Codes: {http://snomed.info/sct 602001}\">Ross river fever</span></p><p><b>reasonReference</b>: <a href=\"#Condition_1\">See above (Condition/1)</a></p></div>"
//     },
//     "status": "active",
//     "intent": "order",
//     "medicationCodeableConcept": { "text": "Paracetemol 500mg Oral Tab" },
//     "subject": { "reference": "Patient/1", "display": "ABC" },
//     "authoredOn": "2020-07-09",
//     "requester": { "reference": "Practitioner/1", "display": "Dr. DEF" },
//     "reasonCode": [
//       {
//         "coding": [
//           {
//             "system": "http://snomed.info/sct",
//             "code": "602001",
//             "display": "Ross river fever"
//           }
//         ]
//       }
//     ],
//     "reasonReference": [{ "reference": "Condition/1" }],
//     "dosageInstruction": [
//       { "text": "Take two tablets orally with or after meal once a day" }
//     ]
//   }
// },
// {
//   "fullUrl": "Condition/1",
//   "resource": {
//     "resourceType": "Condition",
//     "id": "1",
//     "meta": {
//       "profile": [
//         "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
//       ]
//     },
//     "text": {
//       "status": "generated",
//       "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Abdominal pain on 09-July 2020</div>"
//     },
//     "code": {
//       "coding": [
//         {
//           "system": "http://snomed.info/sct",
//           "code": "21522001",
//           "display": "Abdominal pain"
//         }
//       ],
//       "text": "Abdominal pain"
//     },
//     "subject": { "reference": "Patient/1" }
//   }
// },
// {
//   "fullUrl": "Binary/1",
//   "resource": {
//     "resourceType": "Binary",
//     "id": "1",
//     "meta": {
//       "profile": [
//         "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Binary"
//       ]
//     },
//     "contentType": "application/pdf",
//     "data": ""
//   }
// }
