import { TimeZone } from "../../TimeZone";
import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { databasePath } from "../../config";
interface Args {
  composition: COMPOSITOIN;
  PresentingProblems: any;
  allergies?: any;
  PhysicalExamination?: any[];
  investigationAdvice?: any;
  medicationStatement?: any;
  medicationRequest?: any;
  procedure?: any;
  carePlan?: any;
  followUp?: any;
}
export class DischargeSUmmery extends Composition implements Records {
  /**
   * 
   * @param options 
   * @param Credentials 
   * @param DatabasePath 
   * @returns 
   */
  create = async (options: Args, Credentials?: any, DatabasePath?:any) => {
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;

    let gcpFhirCrud:GcpFhirCRUD;
    if(Credentials){
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath)
    }else{
      gcpFhirCrud= new GcpFhirCRUD()
    }
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };
  update = async (options: Args, Credentials?: any, DatabasePath?:any) => {
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;
    let gcpFhirCrud:GcpFhirCRUD
    if(Credentials){
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath)
    }else{
      gcpFhirCrud= new GcpFhirCRUD()
    }
    const res = await gcpFhirCrud.updateFhirResource(
      body,
      options.composition.id || "",
      "Composition"
    );
    return res;
  };
  getOptions = async (options: Args): Promise<Args> => {
    let docHtml = "";
    docHtml += `<h3 style="text-align: center;">Discharge Summary</h3>`
    docHtml += `<table  style="border-collapse: collapse; width: 99.9739%;" border="0">`;
    docHtml += `<tbody style="display: table-header-group"><tr>`;
    // const dateOfAddmission = `<div><b>Date of Admission : </b></div><div>${new Date(options.composition.encounter.startDate).toLocaleString()}</div>`
    // const dateOfDischarge = `<div><b>Date Of Discharge : </b></div><div>${options.composition.encounter.endDate?  new Date(options.composition.encounter.endDate).toLocaleString() : ""}</div>`
    
    const dateOfAddmission = `<div><b>Date of Admission : </b></div><div>${new TimeZone().convertTZ(options.composition.encounter.startDate, process.env.TZ as any, false)}</div>`
    const dateOfDischarge = `<div><b>Date Of Discharge : </b></div><div>
    ${options.composition.encounter.endDate?  new TimeZone().convertTZ(options.composition.encounter.endDate, process.env.TZ as any, false) : ""}
    </div>`
    
    docHtml += `<td style="width: 50%;"  border="0" >${dateOfAddmission}</td>`;
    docHtml += `<td style="width: 50%;"  border="0" >${dateOfDischarge}</td>`;
    docHtml += `</tr>`;
    const getFollowup=():string=>{
      let ret:string=""
      if (options.followUp) {
        options.composition.section.push({
          title: "Follow Up",
          code: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "736271009",
                display: "Outpatient care plan",
              },
            ],
          },
          entry: [
            {
              reference: `Appointment/${options.followUp.id}`,
            },
          ],
        });

          ret =
          `<div"><span><b>Follow up:-</b>${
            new TimeZone().convertTZ(options.followUp.start, process.env.TZ as any, true) ||
            new TimeZone().convertTZ(options.followUp.end, process.env.TZ as any, true)
          }${options.followUp.text.div}</br>`;
      }
       return ret;
    }

    const getAllergy=():string=>{
      let ret:string=""
      if (options.allergies) {
        options.composition.section.push({
          title: "Allergies",
          code: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "722446000",
                display: "Allergy record",
              },
            ],
          },
          entry: [
            {
              reference: `AllergyIntolerance/${options.allergies.id}`,
            },
          ],
        });
  
        ret =  `<b>Allergies</b>${options.allergies.text.div}</br>`;
      }
      return ret;
    }


    docHtml +=`<tr>`
    docHtml += `<td style="width: 50%;"  border="0" >${getFollowup()}</td>`;
    docHtml += `<td style="width: 50%;"  border="0" >${getAllergy()}</td>`;
    docHtml += `</tr>`;
    docHtml += `</tbody>`;
    docHtml += `</table>`;

    let diagnosis:string[] = []
    await this.getDiagnosisFromEnconter(options.composition.encounter.diagnosis, 0, diagnosis)
    if(diagnosis && diagnosis.length > 0){
     let diagnosisString=""
     diagnosis.forEach((el, i)=> diagnosisString +=`(${i+1}). ${el} `)
     docHtml += `<p><b>Diagnosis :- </b>${diagnosisString}</p><p></p>`
 
    }


    


    if (options.PresentingProblems) {
      options.composition.section.push({
        title: "Presenting Problems",
        code: {
          coding: [
            {
              system: "https://projecteka.in/sct",
              code: "422843007",
              display: "Chief Complaint Section",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.PresentingProblems.id}`,
          },
        ],
      });
      docHtml =
        docHtml +
        `${options.PresentingProblems.text.div}<br/>`;
    }

    if (options.PhysicalExamination && options.PhysicalExamination.length > 0) {
      options.composition.section.push({
        title: "Physical Examination",
        code: {
          coding: [
            {
              system: "https://projecteka.in/sct",
              code: "425044008",
              display: "Physical exam section",
            },
          ],
        },
        entry: options.PhysicalExamination.map((el) => {
          return {
            reference: `Observation/${el.id}`,
          };
        }),
      });

      docHtml = docHtml + `<b>Physical examination</b>`;
      options.PhysicalExamination.forEach((el) => {
        docHtml = docHtml + `${el.text.div}<br/>`;
      });
    }

    if (options.medicationRequest || options.medicationStatement) {
      let entry = [];
      if (options.medicationStatement) {
        entry.push({
          reference: `MedicationStatement/${options.medicationStatement.id}`,
        });

        docHtml =
          docHtml +
          `<b>Medication Statement</b>${options.medicationStatement.text.div}`;
      }
      if (options.medicationRequest) {
        entry.push({
          reference: `MedicationRequest/${options.medicationRequest.id}`,
        });
        docHtml =
          docHtml + `<b>Prescription</b>${options.medicationRequest.text.div}`;
      }

      options.composition.section.push({
        title: "Medications",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "721912009",
              display: "Medication summary document",
            },
          ],
        },
        entry: entry,
      });
    }
    options.composition.documentDatahtml =docHtml
    return options;
  };
}

// const test = {
//   resourceType: "Composition",
//   id: "fb8c668f-8e53-47dd-802b-aa2ff4763e8c",
//   identifier: {
//     system: "https://www.max.in/document",
//     value: "fb8c668f-8e53-47dd-802b-aa2ff4763e8c",
//   },
//   status: "final",
//   type: {
//     coding: [
//       {
//         system: "https://projecteka.in/sct",
//         code: "373942005",
//         display: "Discharge Summary Record",
//       },
//     ],
//   },
//   subject: {
//     reference: "Patient/NCC1543",
//   },
//   encounter: {
//     reference: "Encounter/ece47f53-28dc-48bf-9232-79efa964defd",
//   },
//   date: "2019-04-19T00:00:00.605+05:30",
//   author: [
//     {
//       reference: "Practitioner/MAX191101",
//       display: "Dr Akshatha M K",
//     },
//   ],
//   title: "Discharge Summary Document",
//   custodian: {
//     reference: "Organization/MaxSaket01",
//   },
//   section: [
//     {
//       title: "Presenting Problems",
//       code: {
//         coding: [
//           {
//             system: "https://projecteka.in/sct",
//             code: "422843007",
//             display: "Chief Complaint Section",
//           },
//         ],
//       },
//       entry: [
//         {
//           reference: "Condition/194208f1-a058-4b21-88bd-7ca38bbfe68f",
//         },
//       ],
//     },

//     {
//       title: "Allergy Section",
//       code: {
//         coding: [
//           {
//             system: "https://projecteka.in/sct",
//             code: "722446000",
//             display: "Allergy Record",
//           },
//         ],
//       },
//       entry: [
//         {
//           reference: "AllergyIntolerance/example",
//         },
//         {
//           reference: "AllergyIntolerance/medication",
//         },
//       ],
//     },
//     {
//       title: "Physical Examination",
//       code: {
//         coding: [
//           {
//             system: "https://projecteka.in/sct",
//             code: "425044008",
//             display: "Physical exam section",
//           },
//         ],
//       },
//       entry: [
//         {
//           reference: "Observation/5d4cf222-76d0-4da1-9beb-c44d676db85c",
//         },
//         {
//           reference: "Observation/3e1db0b3-46bb-4f23-a5ea-6ed3b3a34cf2",
//         },
//       ],
//     },
//     {
//       title: "Prescribed medications during Admission",
//       code: {
//         coding: [
//           {
//             system: "https://projecteka.in/sct",
//             code: "440545006",
//             display: "Prescription",
//           },
//         ],
//       },
//       entry: [
//         {
//           reference: "MedicationRequest/b07e48bc-1554-4eaa-bee3-0370982eb8f0",
//         },
//         {
//           reference: "MedicationRequest/27e444a7-379d-44b8-9e4b-24a52a29ff8e",
//         },
//       ],
//     },
//     {
//       title: "Clinical consultation",
//       code: {
//         coding: [
//           {
//             system: "https://projecteka.in/sct",
//             code: "371530004",
//             display: "Clinical consultation report",
//           },
//         ],
//       },
//       entry: [
//         {
//           reference: "DocumentReference/4c641e52-0d59-4835-8752-e380e89c694c",
//         },
//       ],
//     },
//     {
//       title: "Procedures",
//       code: {
//         coding: [
//           {
//             system: "https://projecteka.in/sct",
//             code: "371525003",
//             display: "Clinical procedure report",
//           },
//         ],
//       },
//       entry: [
//         {
//           reference: "Procedure/e6c5e7fd-c22a-4d5a-a568-270753e51249",
//         },
//       ],
//     },
//     {
//       title: "Care Plan",
//       code: {
//         coding: [
//           {
//             system: "https://projecteka.in/sct",
//             code: "734163000",
//             display: "Care Plan",
//           },
//         ],
//       },
//       entry: [
//         {
//           reference: "CarePlan/00bc7230-101b-4339-bbed-89be3918663c",
//         },
//       ],
//     },
//     {
//       title: "Follow up",
//       code: {
//         coding: [
//           {
//             system: "https://projecteka.in/sct",
//             code: "736271009",
//             display: "Follow up",
//           },
//         ],
//       },
//       entry: [
//         {
//           reference: "Appointment/4976fe22-7475-4545-a11b-5160b4950878",
//         },
//       ],
//     },
//   ],
//   attester: [
//     {
//       mode: "official",
//       time: "2019-01-04T09:10:14Z",
//       party: {
//         reference: "Organization/MaxSaket01",
//         display: "Max Super Speciality Hospital, Saket",
//       },
//     },
//   ],
// };
