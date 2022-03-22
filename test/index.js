require('dotenv').config("env")
const v4 = require("uuid").v4
const { cpSync } = require('fs')
const { GcpFhirCRUD, GcpFhirSearch, Encounter, OrganizationResource, PatientResource, Patient, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle, Composition, Organization, Practitioner, MedicationRequest, PrescriptionRecord, OPConsultRecord, ResourceFactory, PrescriptionBundle } = require("gcp-nrces-fhir")



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
  console.log(res.data)
  //  '57d01804-7e13-4ca4-a5e1-25457fea2f32'
}

// createOrganization()

const getOrganization = async () => {
  const id = "57d01804-7e13-4ca4-a5e1-25457fea2f32"
  const res = await new GcpFhirCRUD().getFhirResource(id, "Organization");
  const data = organization.convertFhirToObject(res.data)
  console.log(data)
}
// getOrganization();


const patient = new Patient();

const createPatient = async () => {
  const body = patient.getFHIR({
    "name": "UMESH R BILAGI New",
    "gender": "Male",
    "mobile": "9343403620",
    "healthNumber": "23-3457-234",
    "dob": "1969-09-29",
    "MRN": "5002",
    "organizationId": '87166aa1-c5a6-468b-92e9-7b1628b77957'
  })


  const res = await new GcpFhirCRUD().createFhirResource(body, "Patient")
  console.log(res)

  // [
  //   '11752440-b821-4173-9a69-ee585a0b281a',
  //   '19232530-6024-40f7-9b15-7f62928d1428',
  //   '9ed490b2-ef07-4da1-a0c0-fb3f3dd58c94' 
  // ]

}

// createPatient()

const getPatient = async () => {
  const id = "00ce344c-244e-4162-ad99-8c52726f6fe1"
  const res = await new GcpFhirCRUD().getFhirResource(id, "Patient");
  console.log(res.data)
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
  const credetials = {
    type: "service_account",
    project_id: "psychic-city-328609",
    private_key_id: "ee846f7190460c96d7a77258cfdc1b138813aa1a",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHZ1TZSsS5Dpwt\nf4A164lKN1BfYCchj/WORPXmvKKWZ2TBg7SQgkoy5vBzD4ySzT4DodSzFzKdLg2h\nEMztviNfW687mRmdw6Vf8UgLXoVcL0O301fkDTFAflYLX/B5uxCtvj7lLJHxO4gp\nLKuPXFXU/vna6b3XeokEG9cI/KBtMt2cyVdWLanr1WE2bhdh5E3oH/IrMNyOBsao\nwjRenw/OtCJ1+fP+z+AZtvAjFSXJ3JGo9YY9nm/Wsnk6R84SXPg6WiWhyVGxlCK6\ndlHcGBOk9Ozan59eiDkRk6KE7PikCxZrS1nY9ReyE9T8lPKijlE587ArWWO4okVa\niyuVqO9nAgMBAAECggEAKKabqRqxhSqB01KxYAyu9ebV50OyZoizHjhXyxy8pp3Y\ncAz6FBXDq6Hh9gr+9PSLhnEI7CO4CUwYsjO7G2KOUoPd8u/wxXVbsvX84nh4BoWK\nMCERQ2gfGM9ImlQKMb7dlRX6O309GWkyBnbZWMYRp3T9mc/aCGIuKZzFV0stJ2WB\nFWTQFlnm3O2VWLGAVmQbiqwi64zcIwQHWmUfF2fbr908jySZ/HEHnAg6yBgMqW4/\ndvgydU7XDjABGOZ8JkurOPnMnzjwT8rKFkMeTdzukga2S1Q+e7SBjU+/oOzh4vQC\np43aQ1LnMyZ46h7zrK9tUpS2RelU7YW/ZC7SffOnAQKBgQD8BfbNaEJY7sroyMej\n21VTbFJkceBHPU1qFnsACq4ZIQdOQe6PWmg93JvqRwtwM+j2+7Yrq5P/9oBmmFv2\n9zKDzHCqPFHaNDgDYz9UIDdCgfPnFdRD/Z3Xvon7fcWLxaQ1FKgsOjP9RCcA0Upe\n99x0+wk8F4TiBe2CjCdnR7zdAQKBgQDKjNATs/7u3lE8dXOd3SNrcRHDzVeaJ+YC\nWAn055PSBO0O1ByxaOZwo61gu9dW/4BfSH79HOAYCpkAABOeEXH0HX46B0BF4KZm\n9p7Xn4P0YlXLR3PEJtRNRC6k0jPV6YvDVMTixifYBqxIqnv8viuA58L0tlKWvVZK\nHNcVbTgEZwKBgQDaFTMfRjP7jw+I5o1TLm4klVyqzJveKZ7+yVtAiv1ig2E2B/mu\nlPYVafyFe1rbih/y8ZgPLBcS7LTpkrgp+nj88gEgXrgZ0QwTamOXoZUP+TIc6pfX\nCfT3h0sRlCFItQtGX4yzUN5CMCJsI69uhJ+BnuW72UJE8Ao56JwEVGCLAQKBgA9S\nw9MZxOmRTBgE0rBYsHtKXIuxlzUEW7RFsMskUdyLntuGVH1fcD+JQm6VB19/iNis\nhV7ktldbRePoHZPRwgszx/7f2Y7vxeb4NWAeoz7zyYXNbAak4V7PD7BMbrt6Jaar\nXRHC5/TB3HrK2wJt6KCh5+/XczwQKt0EfYkTcC91AoGBAKXUmNp7pLreYdl/4KYk\nMNpMDb0tsQuY30+pH4pLKkB4DILwIUIPMrzK1he0XiWpDcSyjiNTcjs2dqw+lmQ/\nHQU+OyVVKB6XI9OxFC3pu6P0zGvh5MLfOOGvI3wtuTU/HSNiSz+ldrFqKlVDCC5G\nbDLzI45aXJqKGhYMqYxvkLM/\n-----END PRIVATE KEY-----\n",
    client_email: "fhir-837@psychic-city-328609.iam.gserviceaccount.com",
    client_id: "110676463377216897633",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/fhir-837%40psychic-city-328609.iam.gserviceaccount.com"
  }
  const databasePath = {
    cloudRegion: "asia-south1",
    projectId: "psychic-city-328609",
    datasetId: "dataset1",
    fhirStoreId: "fhir_store",

  }
  const gcpFhirSearch = new GcpFhirSearch(credetials, databasePath)


  // const res = await gcpFhirSearch.searchFhirResourcesGet("Encounter", [{ "key": "subject", "value": "Patient/e101abe6-11ae-403d-8c2e-a34f97ceccae" },
  // { "key": "status", "value": "cancelled,finished" }
  // ])

  // const res = await gcpFhirSearch.searchFhirResourcesGet("Patient", [{ "key": "identifier[0].type.coding[0].display", value: "38" }])
  // const res = await gcpFhirSearch.search("Patient", `identifier=https://healthid.ndhm.gov.in|23-3457-234`)
  const res = await gcpFhirSearch.search("Patient", `identifier=https://www.nicehms.com|5002&phone=9343403620&_revinclude=Encounter:patient`)

  // const res = await gcpFhirSearch.search("Patient", `phone=9343403621`)
  // const res = await gcpFhirSearch.search("Patient", `gender=female`)
  // const res = await gcpFhirSearch.search("Patient", `gender=male`)
  console.log(res.data.entry.map(el => {
    return el.resource
  }))
  // console.log(res.data.entry.map(el => {
  //   return el.resource.name
  // }))

}

// search()

const searchsimple = async () => {
  const gcpFhirSearch = new GcpFhirSearch()
  // const res = await gcpFhirSearch.searchFhirResourcesGet("Bundle", [{"key" : "data.entry[0].subject" , "value" : "ca4ba5b2-e6f5-4e5d-a982-57f63cedf666" }])
  // id: 'e101abe6-11ae-403d-8c2e-a34f97ceccae',
  // name: 'UMESH R BILAGI'
  // Patient = e101abe6-11ae-403d-8c2e-a34f97ceccae
  // bundleid=96b9dd5b-beaa-438f-a74d-cab816a05309
  // compositionid =43213a09-d546-4e44-8759-4a6ce4fa2087
  // 'MedicationRequest/496912d9-6846-43ac-a63e-e27841af167d',
  // const res = await gcpFhirSearch.search("Patient", `_id=ca4ba5b2-e6f5-4e5d-a982-57f63cedf666&_revinclude=Composition:patient`)
  // const res = await gcpFhirSearch.search("Encounter", `_id=e2eaa172-20a0-42f1-83d0-de371dad3c74&_include=Encounter:patient`)


  // const  res =await gcpFhirSearch.search("Composition" ,`_id=43213a09-d546-4e44-8759-4a6ce4fa2087&_revinclude=Bundle:composition`)

  // const res = await gcpFhirSearch.search("Composition", `_id=43213a09-d546-4e44-8759-4a6ce4fa2087&_include=Composition:author&_include=Composition:entry`)
  // const res = await new Composition().getWithIncludes(`43213a09-d546-4e44-8759-4a6ce4fa2087`)
  // const res = await new Composition().getCompositionsByPatient(`e101abe6-11ae-403d-8c2e-a34f97ceccae`)
  // // console.log(res.data.entry)
  // res.data.entry.map(el => {
  //   console.log(el.resource.subject)
  // })
  // res.data.entry.map(el => {
  //   console.log(el.resource.author)
  //   // console.log(el)
  // })
  let patinetId = "37"
  let id="00ce344c-244e-4162-ad99-8c52726f6fe1"
  let mobile = "9343403620"
  // const fhirRes = await gcpFhirSearch.search(
  //   "Patient",
  //   `_id=${id}&_revinclude=Encounter:patient`

  // );
  const fhirRes = await gcpFhirSearch.search(
    "Patient",
    `identifier=https://www.nicehms.com|${patinetId}&phone=${mobile}&_revinclude=Encounter:patient`
  );

  // name: [ { text: 'UMESH RAMACHANDRA BILAGI' } ],
  // resourceType: 'Patient',
  // telecom: [ { system: 'phone', use: 'mobile', value: '9343403620' } ],
  console.log(fhirRes.data.entry)

}

// searchsimple()

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
    "patientId": '05e7188b-dc93-4f9b-bfab-41b348ea140e',
    "text": "discherged Home",
    "status": "finished"
  })

  const gcpFhirCRUD = new GcpFhirCRUD();
  const res = await gcpFhirCRUD.createFhirResource(body, "Encounter")
  console.log(res)

  // 'e2eaa172-20a0-42f1-83d0-de371dad3c74'
}

// createEncounter()

const getEnconter = async () => {
  const encounter = new Encounter();
  const id = '7f889790-db13-4f7b-93ea-f5d3166e412d';
  const gcpFhirCRUD = new GcpFhirCRUD()
  const res = await gcpFhirCRUD.getFhirResource(id, "Encounter")
  const data = encounter.convertFhirToObject(res.data)
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
  const gcpFhirCRUD = new GcpFhirCRUD();
  const patinetId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
  const practitionerId = "877f1236-63fd-4827-a3da-636a4f2c5739"
  const reseonReferenceCondtionId = "80cde551-455e-4e7d-8190-02296903aebf"

  let res = await gcpFhirCRUD.getFhirResource(patinetId, "Patient")
  const patient = new ResourceFactory("Patient").convertFhirToObject(res.data)
  res = await gcpFhirCRUD.getFhirResource(practitionerId, "Practitioner")
  const practitioner = new ResourceFactory("Practitioner").convertFhirToObject(res.data)
  res = await gcpFhirCRUD.getFhirResource(reseonReferenceCondtionId, "Condition")
  const condtion = new ResourceFactory("Condition").convertFhirToObject(res.data)



  const body = appointment.getFHIR({
    "patient": patient,
    "practitioner": practitioner,
    "practitionerStatus": "accepted",
    "patientStatus": "accepted",
    // "reasonReferenceConditionId": condition,
    "serviceCategory": [{ "display": "Consultation", "system": "http://snomed.info/sct" }],
    "serviceType": [{ "display": "Consulataion", "system": "http://snomed.info/sct" }],
    "appointmentType": [{ "display": "consulaltion", "system": "http://snomed.info/sct" }],
    "status": "booked",
    "text": "Apponiment",
    "startDate": new Date().toISOString(),
    "endDate": new Date().toISOString(),
    "createdDate": new Date().toISOString(),
    "description": "this is description appointment"
  })

  const resource = await gcpFhirCRUD.createFhirResource(body, "Appointment")
  // cd33d0e1-62b3-4589-95bf-bb75b498ae88
  console.log(resource)
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
const CreateMedicationRequest = async () => {
  try {


    const gcpFhirCRUD = new GcpFhirCRUD()
    const practioner = await gcpFhirCRUD.getFhirResource("877f1236-63fd-4827-a3da-636a4f2c5739", "Practitioner");

    const practionerObj = new Practitioner().convertFhirToObject(practioner.data);

    const patient = await gcpFhirCRUD.getFhirResource("e101abe6-11ae-403d-8c2e-a34f97ceccae", "Patient")
    const patientObj = new Patient().convertFhirToObject(patient.data);


    const medicationRequest = new MedicationRequest()
    let dosageInstruction = new Array()
    dosageInstruction.push(medicationRequest.createDosageInstrction({
      "method": [{ "display": "After Food", "system": "http://snomed.info/sct" }],
      "route": [{ "display": "Oral", "system": "http://snomed.info/sct" }],
      "text": "For 5 Days",
      "timing": "1-1-1",
      "additionalInstruction": [{ "display": "watch for skin erruption", "system": "http://snomed.info/sct" }]
    }))
    let dosageObj = new Array()
    dosageObj.push(medicationRequest.convertDosageInstructionToObject(dosageInstruction[0]));

    dosageInstruction.push(medicationRequest.createDosageInstrction({
      "method": [{ "display": "Before Food", "system": "http://snomed.info/sct" }],
      "route": [{ "display": "Oral", "system": "http://snomed.info/sct" }],
      "text": "For 15 Days",
      "timing": "1-0-1",
      "additionalInstruction": [{ "display": "watch for skin erruption", "system": "http://snomed.info/sct" }]
    }))
    dosageObj.push(medicationRequest.convertDosageInstructionToObject(dosageInstruction[1]))


    const body = medicationRequest.getFHIR({
      "Practitioner": practionerObj,
      "patient": patientObj,
      "date": new Date().toISOString(),
      "intent": "order",
      "status": "active",
      "medicationCodeableConcept": [{ "display": "Tab Pantop 40mg", "system": "http://snomed.info/sct" }, { "display": "Tab DOLO 650mg", "system": "http://snomed.info/sct" }],
      "reasonCode": [{ "display": "LRTI", "system": "http://snomed.info/sct" }],
      "DOSAGE_INSTRUCTION": dosageObj

    })
    // 4e9a3b1c-2c25-4206-8ea6-7b795659ce0e

    const res = await new GcpFhirCRUD().createFhirResource(body, "MedicationRequest");
    const obj = medicationRequest.convertFhirToObject(res.data)

    // console.log(obj)
    return res.data.id

  } catch (error) {
    console.log(error)
  }

}







// Composition
const composition = new Composition()


const createComposition = async () => {
  try {
    const gcpFhirCRUD = new GcpFhirCRUD()
    const encounterId = "e2eaa172-20a0-42f1-83d0-de371dad3c74"
    const patientId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
    const orgId = "87166aa1-c5a6-468b-92e9-7b1628b77957"
    const practId = "877f1236-63fd-4827-a3da-636a4f2c5739"
    const curEncounter = await gcpFhirCRUD.getFhirResource(encounterId, "Encounter")
    let curPatinet = await gcpFhirCRUD.getFhirResource(patientId, "Patient");
    const curOrganizatio = await gcpFhirCRUD.getFhirResource(orgId, "Organization")
    const curPractinioer = await gcpFhirCRUD.getFhirResource(practId, "Practitioner")
    const MedicationRequestId = "4e9a3b1c-2c25-4206-8ea6-7b795659ce0e"

    const pract = new Practitioner()
    const practObj = pract.convertFhirToObject(curPractinioer.data)



    const body = composition.getFHIR({
      "date": new Date().toISOString(),
      "encounter": curEncounter.data,
      "patient": new Patient().convertFhirToObject(curPatinet.data),
      "organization": new Organization().convertFhirToObject(curOrganizatio.data),
      "author": [{ "reference": `Practitioner/877f1236-63fd-4827-a3da-636a4f2c5739` }],
      "status": "final",
      "type": "PrescriptionRecord",
      "section": [{
        "reference": `MedicationRequest/${MedicationRequestId}`,
        "type": "MedicationRequest"
      }],
      "encounterId": encounterId,
      "patientId": patientId,
      "organizationId": orgId,
    })
    console.log(body)
    return
    const res = await gcpFhirCRUD.createFhirResource(body, "Composition")
    console.log(res)

  } catch (error) {
    console.log(error)
  }



}


// createComposition()




const prescriptionDoc = async () => {
  try {

    const gcpFhirCRUD = new GcpFhirCRUD()
    const encounterId = "e2eaa172-20a0-42f1-83d0-de371dad3c74"
    const patientId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
    const orgId = "87166aa1-c5a6-468b-92e9-7b1628b77957"
    const practId = "877f1236-63fd-4827-a3da-636a4f2c5739"
    const MedicationRequestId = await CreateMedicationRequest();

    const prescription = new PrescriptionBundle();

    await prescription.setEncounter(encounterId);
    await prescription.setPatient(patientId);
    await prescription.setOrganization(orgId);
    await prescription.setPractioner(practId);
    const medicationRequest = (await gcpFhirCRUD.getFhirResource(MedicationRequestId, "MedicationRequest")).data;

    await prescription.create({
      "compositionObj": {
        "author": [{ "reference": `Practitioner/${practId}`, "display": "Dr Umesh R Bilagi" }],
        "date": new Date().toISOString(),
        "encounter": prescription.encounter.Obj,
        "encounterId": encounterId,
        "patient": prescription.patient.Obj,
        "patientId": patientId,
        "organization": prescription.organization.Obj,
        "organizationId": orgId,
        "type": "PrescriptionRecord",
        "status": "entered-in-error",
        "section": []
      }, "documentBundle": {
        "date": new Date().toISOString(),
        "entry": [],
        "practitionerId": practId,
        "signedDate": new Date().toISOString(),
      },
      "medicationRequest": medicationRequest,

      // "papersize" : "A5", 
      // // "headerbase64Image" : ""
    })


    //d5dc3b16-8bc8-4ee5-a8d9-60d159787d98
    // console.log(prescription.bundle.data);
    return prescription.bundle.data.id


  } catch (error) {
    console.log(error)
  }



}
// prescriptionDoc()

const getPrescriptionDoc = async () => {

  let id = await prescriptionDoc()
  // console.log(id)
  // let id= "8428c89c-3f2f-484b-8a77-6c6a2592236a"
  const prescriptionBundle = new PrescriptionBundle();
  const bundle = await prescriptionBundle.get(id)
  console.log(bundle.data.entry.filter(el => el.resource.resourceType == "Composition")[0].resource.text.div)

  const pdf = await prescriptionBundle.getBundlePdf({
    "bundle": bundle,
    "base64": true,
    // "headerbase64Image" : "",
    "papersize": "a4",
    "qrcode": `https://wwww.nicehms.com/api/bundle/${id}`,
    // "esignbase64" : 
  })

  console.log(pdf)
}

// getPrescriptionDoc()



const updateprescriptionDoc = async () => {
  try {


    const gcpFhirCRUD = new GcpFhirCRUD()
    const encounterId = "e2eaa172-20a0-42f1-83d0-de371dad3c74"
    const patientId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
    const orgId = "87166aa1-c5a6-468b-92e9-7b1628b77957"
    const practId = "877f1236-63fd-4827-a3da-636a4f2c5739"
    const MedicationRequestId = "73b51197-7469-4d11-ae5d-268583ea47b6";

    const prescription = new PrescriptionBundle();

    await prescription.setEncounter(encounterId);
    await prescription.setPatient(patientId);
    await prescription.setOrganization(orgId);
    await prescription.setPractioner(practId);
    const medicationRequest = (await gcpFhirCRUD.getFhirResource(MedicationRequestId, "MedicationRequest")).data;

    await prescription.update({
      "bundleId": "fc47c7c5-f68e-499a-a4c9-5dec967b035d",
      "compositionObj": {
        "author": [{ "reference": `Practitioner/${practId}` }],
        "date": new Date().toISOString(),
        "encounter": prescription.encounter.Obj,
        "encounterId": encounterId,
        "patient": prescription.patient.Obj,
        "patientId": patientId,
        "organization": prescription.practioners[0].Obj,
        "organizationId": orgId,
        "type": "PrescriptionRecord",
        "status": "entered-in-error",
        "section": []
      }, "documentBundle": {
        "date": new Date().toISOString(),
        "entry": [],
        "practitionerId": practId,
        "signedDate": new Date().toISOString(),
      },
      "medicationRequest": medicationRequest,
      "papersize": "A5",
      // "headerbase64Image" : ""
    })


    // fc47c7c5-f68e-499a-a4c9-5dec967b035d
    console.log(prescription.bundle.data);


  } catch (error) {
    console.log(error)
  }



}

// updateprescriptionDoc()

const prescriptionRecord = async () => {

  const gcpFhirCRUD = new GcpFhirCRUD()
  const encounterId = "e2eaa172-20a0-42f1-83d0-de371dad3c74"
  const patientId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
  const orgId = "87166aa1-c5a6-468b-92e9-7b1628b77957"
  const practId = "877f1236-63fd-4827-a3da-636a4f2c5739"
  const MedicationRequestId = await CreateMedicationRequest();

  const prescription = new PrescriptionRecord();

  await prescription.setEncounter(encounterId);
  await prescription.setPatient(patientId);
  await prescription.setOrganization(orgId);
  await prescription.setPractitioner(practId);

  const medicationRequest = (await gcpFhirCRUD.getFhirResource(MedicationRequestId, "MedicationRequest")).data;

  const res = await prescription.create({
    "compositionObj": {
      "author": prescription.practitioner,
      "date": new Date().toISOString(),
      "encounter": prescription.encounter,
      "encounterId": encounterId,
      "patient": prescription.patient,
      "patientId": patientId,
      "organization": prescription.organization,
      "organizationId": orgId,
      "type": "PrescriptionRecord",
      "status": "entered-in-error",
      "section": []
    },
    "medicationRequest": medicationRequest,
  })

  console.log(res.data.author)

}


// prescriptionRecord();

const prescriptionRecordUpdate = async () => {

  const gcpFhirCRUD = new GcpFhirCRUD()
  const encounterId = "e2eaa172-20a0-42f1-83d0-de371dad3c74"
  const patientId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
  const orgId = "87166aa1-c5a6-468b-92e9-7b1628b77957"
  const practId = "877f1236-63fd-4827-a3da-636a4f2c5739"
  const MedicationRequestId = await CreateMedicationRequest();

  const prescription = new PrescriptionRecord();



  await prescription.setEncounter(encounterId);
  await prescription.setPatient(patientId);
  await prescription.setOrganization(orgId);
  await prescription.setPractitioner(practId);

  const medicationRequest = (await gcpFhirCRUD.getFhirResource(MedicationRequestId, "MedicationRequest")).data;

  const res = await prescription.update({
    "compositionObj": {
      "author": prescription.practitioner,
      "date": new Date().toISOString(),
      "encounter": prescription.encounter,
      "encounterId": encounterId,
      "patient": prescription.patient,
      "patientId": patientId,
      "organization": prescription.organization,
      "organizationId": orgId,
      "type": "PrescriptionRecord",
      "status": "entered-in-error",
      "section": [],
      "id": "4c0ba1f1-c7ad-430b-8f23-7d7bf3833855"
    },
    "medicationRequest": medicationRequest,
  })

  console.log(res)

}

// prescriptionRecordUpdate()


const chiefComplaints = async () => {
  const condition = new Condition();
  const body = condition.getFHIR({
    "condtion": [{ "display": "Abdomin Pain", "system": "http://snomed.info/sct" }],
    "patientId": "e101abe6-11ae-403d-8c2e-a34f97ceccae",
    "text": "<div>Pain abdomen left hypochondric region </div>",
    "title": "Chief Complints",
  })

  const res = await new GcpFhirCRUD().createFhirResource(body, "Condition")
  console.log(res)
  // '6bf71daa-7ca5-4014-a9fc-62bc9f1a1ec8'
}

// chiefComplaints()

const OPConsulation = async () => {
  const gcpFhirCRUD = new GcpFhirCRUD()
  const encounterId = "e2eaa172-20a0-42f1-83d0-de371dad3c74"
  const patientId = "e101abe6-11ae-403d-8c2e-a34f97ceccae"
  const orgId = "87166aa1-c5a6-468b-92e9-7b1628b77957"
  const practId = "877f1236-63fd-4827-a3da-636a4f2c5739"
  const MedicationRequestId = await CreateMedicationRequest();
  const chiefComplaintsId = '6bf71daa-7ca5-4014-a9fc-62bc9f1a1ec8'

  const opConsultation = new OPConsultRecord()

  await opConsultation.setEncounter(encounterId);
  await opConsultation.setPatient(patientId);
  await opConsultation.setOrganization(orgId);
  await opConsultation.setPractitioner(practId);

  const medicationRequest = (await gcpFhirCRUD.getFhirResource(MedicationRequestId, "MedicationRequest")).data;
  const chiefComplaints = (await gcpFhirCRUD.getFhirResource(chiefComplaintsId, "Condition")).data

  const res = await opConsultation.create({
    "composition": {
      "author": opConsultation.practitioner,
      "date": new Date().toISOString(),
      "encounter": opConsultation.encounter,
      "encounterId": encounterId,
      "patient": opConsultation.patient,
      "patientId": patientId,
      "organization": opConsultation.organization,
      "organizationId": orgId,
      "type": "OPConsultRecord",
      "status": "final",
      "section": []
    },
    "chiefComplinats": chiefComplaints,
    "medicationRequest": medicationRequest
  })
  // e2c2338b-31df-4704-9c2c-213bee15c932
  console.log(res)
}

// OPConsulation()

const comOPD = async () => {
  const composition = new Composition();
  const res = await composition.getWithIncludes("e2c2338b-31df-4704-9c2c-213bee15c932")
  console.log(res.data.entry)
}

// comOPD();



const getCompositoon=async()=>{
  id="bfb6a47a-58a9-4ce1-98ba-7a66c8876eb9"
  const res =await  new GcpFhirCRUD().getFhirResource(id, "Composition");
  const obj = new ResourceFactory("Composition").convertFhirToObject(res.data);
  console.log(obj)
}

// getCompositoon()

const getBundle = async()=>{
  id="bfb6a47a-58a9-4ce1-98ba-7a66c8876eb9"
  const composition = await  new GcpFhirCRUD().getFhirResource(id, "Composition");
  const bundle =await new PrescriptionBundle().getFHIR({"composition" : composition.data})

  console.log(bundle)
}


getBundle()
