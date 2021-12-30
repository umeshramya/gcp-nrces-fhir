require('dotenv').config("env")
const { GcpFhirCRUD, GcpFhirSearch, Encounter, OrganizationResource, PatientResource, Patient, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle, Composition, Organization, Practitioner, MakeDocumentBundle } = require("gcp-nrces-fhir")




const organization = new Organization()
const createOrganization = async () => {
    const body = organization.getFHIR({
        "email": "jjhhubli@gmail.com",
        "name": "Jeevan jyotoi hospital",
        "ndhmFacilityNumber": "JJH_123",
        "phone": "08362260624",
        "providerNumber": "123"
    })

    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(body, "Organization")
    console.log(res)
    //  '87166aa1-c5a6-468b-92e9-7b1628b77957'
}

// createOrganization()

const getOrganization = async () => {
    const id = "87166aa1-c5a6-468b-92e9-7b1628b77957"
    const res = await new GcpFhirCRUD().getFhirResource(id, "Organization");
    const data = organization.convertFhirToObject(res.data)
    console.log(data)
}
// getOrganization();


const patient = new Patient();

const createPatient = async () => {
    const body = patient.getFHIR({
        "name": "UMESH R BILAGI",
        "gender": "Male",
        "mobile": "9343403620",
        "healthNumber": "23-3457-234",
        "dob": "1969-09-29",
        "MRN": "2345",
        "organizationId": '87166aa1-c5a6-468b-92e9-7b1628b77957'
    })

    const res = await new GcpFhirCRUD().createFhirResource(body, "Patient")
    console.log(res)

    // 'e101abe6-11ae-403d-8c2e-a34f97ceccae'

}

// createPatient()

const getPatient = async () => {
    const id = "b7665b47-2356-493f-bae4-4710f16eeb7b";
    const res = await new GcpFhirCRUD().getFhirResource(id, "Patient");

    const body = patient.convertFhirToObject(res.data);
    console.log(body)
}


// getPatient();





const practitioner = new Practitioner()
const createPractinioner = async () => {
    const body = practitioner.getFHIR({
        "medicalLicenseNumber": "KMC 35167",
        "name": "Dr Umesh R Bilagi",
        "ndhmProfessionalId": "123456",
        "qualification": "MD DM Cardiology"
    })

    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(body, "Practitioner")
    console.log(res)
    // 'ed05c338-7570-4159-a38d-4fe88fc9c761'
}

// createPractinioner()


const getPractinioner = async () => {
    const id = "ed05c338-7570-4159-a38d-4fe88fc9c761"
    const res = await new GcpFhirCRUD().getFhirResource(id, "Practitioner")
    const body = practitioner.convertFhirToObject(res.data)
    console.log(body)
}

// getPractinioner()

const search = async () => {
    const gcpFhirSearch = new GcpFhirSearch()
    const res = await gcpFhirSearch.searchFhirResourcesGet("Encounter", [{ "key": "subject", "value": "Patient/e101abe6-11ae-403d-8c2e-a34f97ceccae" },
    { "key": "status", "value": "cancelled,finished" }
    ])
    console.log(res.data.entry)
}

// search()

// console.log(EncounterStatusArray.map(el=>{
//     return el
// }))




// const getdata = async () => {
//     const gcpFhirCRUD = new GcpFhirCRUD(,)
//     const res = await gcpFhirCRUD.getFhirResource("e101abe6-11ae-403d-8c2e-a34f97ceccae", "Patient").then(res => res
//     return res,
// }

// const getdata = async () => {
//     const gcpFhirCRUD = new GcpFhirCRUD();
//     const res = await gcpFhirCRUD.getFhirResource("e101abe6-11ae-403d-8c2e-a34f97ceccae", "Patient")

//     console.log(res.data)
// }


// const enCounter = EncounterResource({
//     "class": { "code": "IMP", "display": "in-patient" },
//     "dischargeDisposition": { "code": "home", "display": "home" },
//     "endDate": new Date().toISOString(),
//     "startDate": new Date().toISOString(),
//     "identifier": new Date().getTime().toString(),
//     "patientId": "e101abe6-11ae-403d-8c2e-a34f97ceccae",
//     "text": "discherged Home",
//     "status": "finished"
// })



const createEncounter = async () => {
    const encounter = new Encounter();
    const body = encounter.getFHIR({
        "class": { "code": "IMP", "display": "in-patient" },
        "dischargeDisposition": { "code": "home", "display": "home" },
        "endDate": new Date().toISOString(),
        "startDate": new Date().toISOString(),
        "identifier": new Date().getTime().toString(),
        "patientId": 'e101abe6-11ae-403d-8c2e-a34f97ceccae',
        "text": "discherged Home",
        "status": "finished"
    })

    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(body, "Encounter")
    console.log(res)

    // 'e2eaa172-20a0-42f1-83d0-de371dad3c74'
}

// createEncounter()

const getEnconter =async ()=>{
    const encounter = new Encounter();
    const id = 'e2eaa172-20a0-42f1-83d0-de371dad3c74';
    const gcpFhirCRUD = new GcpFhirCRUD()
    const res = await gcpFhirCRUD.getFhirResource(id, "Encounter")
    const data =  encounter.convertFhirToObject(res.data)
    console.log(data)
}

// getEnconter()



// create()


// procedure

const procedure = new Procedure()
const createProceure = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(procedure.getFHIR({
        "patientID": "e101abe6-11ae-403d-8c2e-a34f97ceccae",
        "procedure": [{ "display": "Coronary stenting", "system": "http://snomed.info/sct" }],
        "procedureDate": "2021-11-03T15:32:26.605+05:30",
        "status": "in-progress",
        "text": "Coronary stenting",
        "complication": [{ "display": "bleeding", "system": "http://snomed.info/sct" }],
    }), "Procedure")


    // 

    console.log(res)
}



// createProceure()


const getProcedure = async () => {
    let id = "87555651-bb59-4d3b-8cc5-b5e73cf2599c";
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "Procedure")
    const data = res.data

    const obj = procedure.convertFhirToObject(data)

    console.log(obj)

}

// getProcedure()



// Condtion

const condition = new Condition()
const createCondition = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(condition.getFHIR({
        "condtion": [{ "display": "Chest Pain", "system": "http://snomed.info/sct" }],
        "patientId": "e101abe6-11ae-403d-8c2e-a34f97ceccae",
        "text": "Chest Pain for Evaluvation"
    }), "Condition")


    // 80cde551-455e-4e7d-8190-02296903aebf

    console.log(res)
}

// createCondition()


const getCondtiopn = async () => {
    const id = "80cde551-455e-4e7d-8190-02296903aebf"
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "Condition")
    const data = res.data

    const obj = condition.convertFhirToObject(data)

    console.log(obj)

}


// getCondtiopn()

// AllergyIntolrence

const allergyIntolerance = new AllergyIntolerance()

const createAllergyIntolerance = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD();
    const body = allergyIntolerance.getFHIR({
        "allergyIntolerance": [{ "display": "Asprin" }],
        "clinicalStatus": "active",
        "verificationStatus": "unconfirmed",
        "date": new Date().toISOString(),
        "note": [{ "text": "patient developed rash" }],
        "patientId": "e101abe6-11ae-403d-8c2e-a34f97ceccae",
        "practitionerId": "877f1236-63fd-4827-a3da-636a4f2c5739",
        "text": "Allergic to Asprin"
    })

    const res = await gcpFhirCRUD.createFhirResource(body, "AllergyIntolerance")


    // 689439d7-bfd1-436a-b8cb-43533698baad

    console.log(res)
}

// createAllergyIntolerance()


const getAllergyIntolerance = async () => {
    const id = "e7f1d6ad-34e7-41d5-b1f5-ba45024be438"
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "AllergyIntolerance")
    // console.log(res)
    const data = res.data;

    const ret = allergyIntolerance.convertFhirToObject(data)
    console.log(ret)
}

// getAllergyIntolerance()


// Appointment
const appointment = new Appointment();
const createAppointment = async () => {
    const body = appointment.getFHIR({
        "patientId": "e101abe6-11ae-403d-8c2e-a34f97ceccae",
        "practitionerId": "877f1236-63fd-4827-a3da-636a4f2c5739",
        "practitionerStatus": "accepted",
        "patientStatus": "accepted",
        "reasonReferenceConditionId": "80cde551-455e-4e7d-8190-02296903aebf",
        "serviceCategory": [{ "display": "Consultation", "system": "http://snomed.info/sct" }],
        "serviceType": [{ "display": "Consulataion", "system": "http://snomed.info/sct" }],
        "appointmentType": [{ "display": "consulaltion", "system": "http://snomed.info/sct" }],
        "status": "booked",
        "text": "Apponiment",
        "startDate": new Date().toISOString(),
        "endDate": new Date().toISOString(),
        "createdDate": new Date().toISOString(),
        "description" : "this is description appointment"
    })
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(body, "Appointment")
    // cd33d0e1-62b3-4589-95bf-bb75b498ae88
    console.log(res)
}


// createAppointment()

const getAppontment = async () => {
    const id = "cd33d0e1-62b3-4589-95bf-bb75b498ae88"
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "Appointment")
    const data = res.data;
    const ret = appointment.convertFhirToObject(data)
    console.log(ret)
}


// getAppontment();


// DocumentBundle
const documentBundle = new DocumentBundle()

const createDocumentBumdle = async () => {
    const body = documentBundle.getFHIR({
        "date": new Date().toISOString(),
        "practitionerId": "877f1236-63fd-4827-a3da-636a4f2c5739",
        "signJpegbase64": "",
        "entry": []

    })


    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.createFhirResource(body, "Bundle")
    console.log(res)

    // d563a017-2ee7-4af8-a36d-77f19987745e

}


// createDocumentBumdle()

const getDocumentBundle = async () => {
    const id = "d563a017-2ee7-4af8-a36d-77f19987745e"
    const gcpFhirCRUD = new GcpFhirCRUD();
    const res = await gcpFhirCRUD.getFhirResource(id, "Bundle");
    const data = documentBundle.convertFhirToObject(res.data);
    console.log(data)

}

// getDocumentBundle();


// Composition
const composition = new Composition()

// const createComposition = async () => {
//     const body = composition.getFHIR({
//         "date": new Date().toISOString(),
//         "encounterId": "f5a387db-f093-4885-a86f-107377e14c86",
//         "patientId": "e101abe6-11ae-403d-8c2e-a34f97ceccae",
//         "practitionerId": "877f1236-63fd-4827-a3da-636a4f2c5739",
//         "organizationId": "a15a0e31-3b72-4d48-bae8-c3000c97786f",
//         "status": "final",
//         "type": { "type": "OPConsultRecord", "code": "371530004", "url": "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord", "text": "Clinical consultation report" },
//         "patientName": "Mr patil",
//         "organizationName": "JJH",
//         "practitionerName": "DR James Bond"

//     })

//     // console.log(body)

//     const res = await new GcpFhirCRUD().createFhirResource(body, "Composition")

//     console.log(res);
// }


const createComposition = async () => {
    const gcpFhirCRUD = new GcpFhirCRUD()
    const encounterId = "e2eaa172-20a0-42f1-83d0-de371dad3c74"
    const patientId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
    const orgId = "87166aa1-c5a6-468b-92e9-7b1628b77957"
    const practId = "877f1236-63fd-4827-a3da-636a4f2c5739"
    const curEncounter = await gcpFhirCRUD.getFhirResource(encounterId, "Encounter")
    let curPatinet = await gcpFhirCRUD.getFhirResource(patientId, "Patient");
    const curOrganizatio = await gcpFhirCRUD.getFhirResource(orgId, "Organization")
    const curPractinioer = await gcpFhirCRUD.getFhirResource(practId, "Practitioner")

    const pract = new Practitioner()
    const practObj = pract.convertFhirToObject(curPractinioer.data)

    const body = composition.getFHIR({
        "date": new Date().toISOString(),
        "encounter": curEncounter.data,
        "patient": new Patient().convertFhirToObject(curPatinet.data),
        "organization": new Organization().convertFhirToObject(curOrganizatio.data),
        "author": [{ "reference": `Practitioner/877f1236-63fd-4827-a3da-636a4f2c5739`, "display": practObj.name }],
        "status": "final",
        "type": "OPConsultRecord",
        "section": [],
        "encounterId": encounterId,
        "patientId": patientId,
        "organizationId": orgId,
        "section" : (await setSection()).section
    })
    console.dir( body)
    // const res = await gcpFhirCRUD.createFhirResource(body, "Composition")
    // console.log(res)
}

createComposition()


const opConsulatation = new MakeDocumentBundle()
const setSection = async () => {
    const ProcedureId = "87555651-bb59-4d3b-8cc5-b5e73cf2599c"
    const AppointmentId = "cd33d0e1-62b3-4589-95bf-bb75b498ae88"
    const AllergyId = "689439d7-bfd1-436a-b8cb-43533698baad"
    const gcpFhirCrud = new GcpFhirCRUD()

    let res;

    res = await gcpFhirCrud.getFhirResource(AllergyId, "AllergyIntolerance")
    opConsulatation.setEntries({ "allergyIntolerance": res.data })

    // res = await gcpFhirCrud.getFhirResource(ProcedureId, "Procedure")
    // opConsulatation.setEntries({ "procedure": res.data })

    // res = await gcpFhirCrud.getFhirResource(AppointmentId, "Appointment")
    // // console.log(res)
    // opConsulatation.setEntries({ "appointment": res.data })
    // opConsulatation.setEntries({ "appointment": res.data })


    return opConsulatation


    // opConsulatation.section.map(el => {
    //     console.log(el)
    //     console.log(el.code)
    // })


    // opConsulatation.bundleEntry.map(el => console.log(el))

}

// setSection()




const testCom = async()=>{
    const body = {
        "resourceType": "Composition",
        "id": undefined,
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t\t<p>Consultation note for Henry Levin the 7th</p>\n\t\t\t<p>Managed by Good Health Clinic</p>\n\t\t</div>"
        },
        "identifier": {
          "system": "http://healthintersections.com.au/test",
          "value": "1"
        },
        "status": "final",
        "type": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "11488-4",
              "display": "Consult note"
            }
          ]
        },

        // "category": [
        //   {
        //     "coding": [
        //       {
        //         "system": "http://loinc.org",
        //         "code": "LP173421-1",
        //         "display": "Report"
        //       }
        //     ]
        //   }
        // ],


        "subject": {
          "reference": "Patient/e101abe6-11ae-403d-8c2e-a34f97ceccae",
          "display": "Henry Levin the 7th"
        },
        "encounter": {
          "reference": "Encounter/e2eaa172-20a0-42f1-83d0-de371dad3c74"
        },
        "date": "2012-01-04T09:10:14Z",
        "author": [
          {
            "reference": "Practitioner/xcda-author",
            "display": "Harold Hippocrates, MD"
          }
        ],
        "title": "Consultation Note",
        "confidentiality": "N",
        "attester": [
          {
            "mode": "legal",
            "time": "2012-01-04T09:10:14Z",
            "party": {
              "reference": "Practitioner/xcda-author",
              "display": "Harold Hippocrates, MD"
            }
          }
        ],
        "custodian": {
          "reference": "Organization/2.16.840.1.113883.19.5",
          "display": "Good Health Clinic"
        },
        "relatesTo": [
          {
            "code": "replaces",
            "targetReference": {
              "reference": "Composition/old-example"
            }
          },
          {
            "code": "appends",
            "targetIdentifier": {
              "system": "http://example.org/fhir/NamingSystem/document-ids",
              "value": "ABC123"
            }
          }
        ],
        "event": [
          {
            "code": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                    "code": "HEALTHREC",
                    "display": "health record"
                  }
                ]
              }
            ],
            "period": {
              "start": "2010-07-18",
              "end": "2012-11-12"
            },
            "detail": [
              {
                "reference": "Observation/example"
              }
            ]
          }
        ],
        "section": [
          {
            "title": "History of present illness",
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "11348-0",
                  "display": "History of past illness Narrative"
                }
              ]
            },
            "text": {
              "status": "generated",
              "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t\t\t<table>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<b>Code</b>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<b>Date</b>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<b>Type</b>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<b>BodySite</b>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<b>Severity</b>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Stroke</td>\n\t\t\t\t\t\t<td>2010-07-18</td>\n\t\t\t\t\t\t<td>Diagnosis</td>\n\t\t\t\t\t\t<td/>\n\t\t\t\t\t\t<td/>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Burnt Ear</td>\n\t\t\t\t\t\t<td>2012-05-24</td>\n\t\t\t\t\t\t<td>Diagnosis</td>\n\t\t\t\t\t\t<td>Left Ear</td>\n\t\t\t\t\t\t<td/>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Asthma</td>\n\t\t\t\t\t\t<td>2012-11-12</td>\n\t\t\t\t\t\t<td>Finding</td>\n\t\t\t\t\t\t<td/>\n\t\t\t\t\t\t<td>Mild</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</table>\n\t\t\t</div>"
            },
            "mode": "snapshot",
            "orderedBy": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/list-order",
                  "code": "event-date",
                  "display": "Sorted by Event Date"
                }
              ]
            },
            "entry": [
              {
                "reference": "Condition/stroke"
              },
              {
                "reference": "Condition/example"
              },
              {
                "reference": "Condition/example2"
              }
            ]
          },
          {
            "title": "History of family member diseases",
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "10157-6",
                  "display": "History of family member diseases Narrative"
                }
              ]
            },
            "text": {
              "status": "generated",
              "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t\t\t<p>History of family member diseases - not available</p>\n\t\t\t</div>"
            },
            "mode": "snapshot",
            "emptyReason": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/list-empty-reason",
                  "code": "withheld",
                  "display": "Information Withheld"
                }
              ]
            }
          }
        ]
      }
}