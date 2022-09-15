import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";
import { MedicationRequest } from "../MedicationRequest";
import { Condition } from "../Condition";

export class PrescriptionBundle extends BundelMain implements ResourceMaster {
  // async getFHIR(options: {
  //   id?: string;
  //   identifier?: IDENTTIFIER;
  //   composition: any;
  //   pdfData: string;
  // }) {
  //   if (options.identifier) {
  //     let ret: IDENTTIFIER = {
  //       system: "http://www.nicehms.com/bundle",
  //       value: options.identifier.value,
  //     };
  //   }

  //   const bundlemain = await new BundelMain(this.gcpCredetials, this.gcpPath).getentries(
  //     options.composition,
  //     options.pdfData
  //   );

  //   const entry = bundlemain.entry;
   
  //   const sectionEntries = bundlemain.compositionObj.section[0].entry as {
  //     reference: string;
  //     type: resourceType;
  //   }[];

  //    // write code to pusj medication trequest here
  //   const medicationRequestId = this.getIdFromReference({
  //     ref: sectionEntries.filter((el) => el.type == "MedicationRequest")[0]
  //       .reference,
  //     resourceType: "MedicationRequest",
  //   });

  //   const gcpFhirCrud = new GcpFhirCrud(this.gcpCredetials, this.gcpPath)
  //   const medicationRequest = new MedicationRequest().bundlify(await gcpFhirCrud
  //     .getFhirResource(medicationRequestId, "MedicationRequest")
  //     .then((res) => res.data));
  //     medicationRequest.forEach((el:any, i:number)=>{
  //      entry.push(el)
  //       if(i!=0){
  //         entry[0].resource.section[0].entry.push( {
  //           "reference": el.fullUrl
  //         })
  //       }
  //     })

  //   // Get Condition
  //   const conditionArray = sectionEntries.filter(el=> el.type == "Condition")
  //   if(conditionArray.length >0){
  //     const conditionId = this.getIdFromReference({
  //       "ref" : conditionArray[0].reference,
  //       resourceType : "Condition"
  //     })

      
  //     const condition = await gcpFhirCrud.getFhirResource(conditionId, "Condition").then(res=>res.data)
  //     entry.push({
  //       fullUrl: `Condition/${conditionId}`,
  //       resource: new Condition().bundlify(condition),
  //     })
  //   }

  //   // Binary
  //   const binaryArray = sectionEntries.filter(el=> el.type == "Binary")
  //   if(binaryArray.length > 0){
  //     const binaryId = this.getIdFromReference({
  //       "ref" : binaryArray[0].reference,
  //       "resourceType" : "Binary"
  //     })
  //     const binary = await gcpFhirCrud.getFhirResource(binaryId, "Binary").then(res=>res.data);
  //     entry.push({
  //       fullUrl: `Binary/${binaryId}`,
  //       resource: binary,
  //     })
  //   }


  //  const  filteredEntry = entry.filter(el =>el.resource.resourceType !== "DocumentReference")

 

  //   const body = {
  //     "resourceType": "Bundle",
  //     "id": options.id,
  //     "meta": {
  //       "lastUpdated": new Date().toISOString()
  //     },
  //     "identifier": {
  //       "system": "https://www.nicehms.com/bundle",
  //       "value": options.id
  //     },
  //     "type": "document",
  //     "timestamp": options.composition.date,
  //     "entry": filteredEntry
  //   }
  //   return body;
  // }

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
    // options.composition.title = "OP Consultation Document";

    const bundlemain = await new BundelMain(
      this.gcpCredetials,
      this.gcpPath
    ).getentries(options.composition, options.pdfData);

    this.entry = bundlemain.entry;

    const sectionEntries = options.composition.section;

    await this.getAllSectionAndAllEntries(0, sectionEntries);
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

    const medicationRef = body.entry
      .filter((el) => el.resource.resourceType == "MedicationRequest")
      .map((el) => {
        return {
          reference: `MedicationRequest/${el.resource.id}`,
        };
      });
   
      let  sectionZeroNoMedicationRequest:{reference : string, type:string}[]=[]
      sectionZeroNoMedicationRequest = body.entry[0].resource.section[0].entry.filter((el:any)=>el.type !="MedicationRequest" )

      medicationRef.forEach(el=>{
        sectionZeroNoMedicationRequest.push({
          "reference" : el.reference,
          "type" : "MedicationRequest"
        })
      })

      body.entry[0].resource.section[0].entry=sectionZeroNoMedicationRequest

    // const  filteredEntry =body.entry.filter(el =>el.resource.resourceType !== "DocumentReference")
    // body.entry=filteredEntry;
    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}




const dem0={
  "resourceType": "Bundle",
  "id": "3739707e-1123-46fe-918f-b52d880e4e7f",
  "meta": {
    "lastUpdated": "2016-08-07T00:00:00.000+05:30"
  },
  "identifier": {
    "system": "https://www.max.in/bundle",
    "value": "3739707e-1123-46fe-918f-b52d880e4e7f"
  },
  "type": "document",
  "timestamp": "2016-08-07T00:00:00.000+05:30",
  "entry": [
    {
      "fullUrl": "Composition/c63d1435-b6b6-46c4-8163-33133bf0d9bf",
      "resource": {
        "resourceType": "Composition",
        "id": "c63d1435-b6b6-46c4-8163-33133bf0d9bf",
        "identifier": {
          "system": "https://www.max.in/document",
          "value": "c63d1435-b6b6-46c4-8163-33133bf0d9bf"
        },
        "status": "final",
        "type": {
          "coding": [
            {
              "system": "https://projecteka.in/sct",
              "code": "440545006",
              "display": "Prescription record"
            }
          ]
        },
        "subject": {
          "reference": "Patient/RVH9999"
        },
        "encounter": {
          "reference": "Encounter/dab7fd2b-6a05-4adb-af35-bcffd6c85b81"
        },
        "date": "2016-08-07T00:00:00.605+05:30",
        "author": [
          {
            "reference": "Practitioner/MAX5001",
            "display": "Dr Laxmikanth J"
          }
        ],
        "title": "Prescription",
        "section": [
          {
            "title": "OPD Prescription",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "440545006",
                  "display": "Prescription record"
                }
              ]
            },
            "entry": [
              {
                "reference": "MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0"
              }
            ]
          }
        ]
      }
    },
    {
      "fullUrl": "Practitioner/MAX5001",
      "resource": {
        "resourceType": "Practitioner",
        "id": "MAX5001",
        "identifier": [
          {
            "system": "https://www.mciindia.in/doctor",
            "value": "MAX5001"
          }
        ],
        "name": [
          {
            "text": "Laxmikanth J",
            "prefix": [
              "Dr"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "fullUrl": "Patient/RVH9999",
      "resource": {
        "resourceType": "Patient",
        "id": "RVH9999",
        "name": [
          {
            "text": "Keith David"
          }
        ],
        "gender": "male"
      }
    },
    {
      "fullUrl": "Encounter/dab7fd2b-6a05-4adb-af35-bcffd6c85b81",
      "resource": {
        "resourceType": "Encounter",
        "id": "dab7fd2b-6a05-4adb-af35-bcffd6c85b81",
        "status": "finished",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "AMB",
          "display": "Outpatient visit"
        },
        "subject": {
          "reference": "Patient/RVH9999"
        },
        "period": {
          "start": "2016-08-07T00:00:00+05:30"
        }
      }
    },
    {
      "fullUrl": "Medication/54ab5657-5e79-4461-a823-20e522eb337d",
      "resource": {
        "resourceType": "Medication",
        "id": "54ab5657-5e79-4461-a823-20e522eb337d",
        "code": {
          "coding": [
            {
              "system": "https://projecteka.in/act",
              "code": "R05CB02",
              "display": "bromhexine 24 mg"
            }
          ]
        }
      }
    },
    {
      "fullUrl": "MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0",
      "resource": {
        "resourceType": "MedicationRequest",
        "id": "68d9667c-00c3-455f-b75d-d580950498a0",
        "status": "active",
        "intent": "order",
        "medicationReference": {
          "reference": "Medication/54ab5657-5e79-4461-a823-20e522eb337d"
        },
        "subject": {
          "reference": "Patient/RVH9999"
        },
        "authoredOn": "2016-08-07T00:00:00+05:30",
        "requester": {
          "reference": "Practitioner/MAX5001"
        },
        "dosageInstruction": [
          {
            "text": "1 capsule 2 times a day"
          }
        ]
      }
    }
  ]
}