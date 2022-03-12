require('dotenv').config("env")
const v4 = require("uuid").v4
const console = require('console')
const { cpSync } = require('fs')
const { GcpFhirCRUD, GcpFhirSearch, Encounter, OrganizationResource, PatientResource, Patient, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle, Composition, Organization, Practitioner, MedicationRequest, PrescriptionRecord, OPConsultRecord, ResourceFactory } = require("gcp-nrces-fhir")



const ifNull = (val) => {
  if (val == "NULL") {
    return undefined
  } else {
    return `${val}`
  }
}

const excuteOrganization = async () => {

  const curJson = require("./testData/organizationjson.json")
  const resources = curJson.map(el => {
    const curEl = new Organization().getFHIR({
      "email": ifNull(el.email),
      "name": ifNull(el.orgName),
      "ndhmFacilityNumber": ifNull(el.ndhmFaciltyId),
      "phone": ifNull(el.tel),
      "providerNumber": ifNull(el.id),
    })

    return {
      "resource": curEl, "request": {
        "method": "POST",
        "url": "Organization"
      }
    }

  })


  const bundle = {
    "resourceType": "Bundle",
    "id": "bundle-transaction",
    "meta": {
      "lastUpdated": new Date().toISOString()
    },
    "type": "transaction",
    "entry": resources
  }




  const res = await new GcpFhirCRUD().excuteBundle(bundle)

  console.log(res)
}


// excuteOrganization();



const excutePractinior = async () => {

  const curJson = require("./testData/doctor.json")
  const resources = curJson.map(el => {

    const curEl = new Practitioner().getFHIR({
      "medicalLicenseNumber": ifNull(el.registration),
      "name": ifNull(el.name),
      "ndhmProfessionalId": ifNull(el.ndhmProfessionalId),
      "providerNumber": el.id,
      "qualification": ifNull(el.qualification),
    })

    return {
      "resource": curEl, "request": {
        "method": "POST",
        "url": "Practitioner"
      }
    }

  })

  const bundle = {
    "resourceType": "Bundle",
    "id": "bundle-transaction",
    "meta": {
      "lastUpdated": new Date().toISOString()
    },
    "type": "transaction",
    "entry": resources.map(el => el)
  }

  const res = await new GcpFhirCRUD().excuteBundle(bundle)

  console.log(res)
}


// excutePractinior();




// select  patientDetails.id, patientDetails.firstName, patientDetails.middleName, patientDetails.dob, patientDetails.dor,  patientDetails.lastName, patientDetails.gender, patientDetails.mobile, patientDetails.orgId, organization.gcpFhirId  from patientDetails inner join organization on patientDetails.orgId = organization.id limit 10000

const excutePatinet = async () => {

  const curJson = require("./testData/Patient_1_to_1000.json")
  const resources = curJson.map(el => {

    const curEl = new Patient().getFHIR({
      "MRN": ifNull(el.id),
      "dob": `${el.dob.substring(6)}-${el.dob.substring(3, 5)}-${el.dob.substring(0, 2)}`,
      "gender": ifNull(el.gender),
      "mobile":  ifNull(el.mobile == "Not Mentioned"? "9999999999" : el.mobile),
      "name": ifNull(`${el.firstName} ${el.middleName} ${el.lastName}`),
      "organizationId": '87166aa1-c5a6-468b-92e9-7b1628b77957'

    })

    return {
      "resource": curEl, "request": {
        "method": "POST",
        "url": "Patient"
      }
    }

  })




  const bundle = {
    "resourceType": "Bundle",
    "id": "bundle-transaction",
    "meta": {
      "lastUpdated": new Date().toISOString()
    },
    "type": "transaction",
    "entry": resources
  }

  // console.log(bundle)
  // return

  const res = await new GcpFhirCRUD().excuteBundle(bundle)

  console.log(res)
}


// excutePatinet();


const updateOrganization = async () => {
  const res = await new GcpFhirSearch().search("Organization")
  let str1=" "
  let str2=""
  res.data.entry.forEach((el, i)=> {
    const resource = el.resource
    const org = new Organization().convertFhirToObject(resource);


    
    str1 += `WHEN ${org.providerNumber} THEN "${org.id}" `
    str2 += `${org.providerNumber}, `

    
  });

  // let sql = `UPDATE organization set gcpFhirId = (CASE id WHEN 1 THEN 11123 END) WHERE id in(1)`
  let sql = `UPDATE organization set gcpFhirId = (CASE id ${str1} END) WHERE id in(${str2})`
  console.log(sql)
}

// updateOrganization()


const updatePatient = async ()=>{
  
  let str1=" "
  let str2=""



const data = require("./testData/Patient1.json")



  data.forEach(el=>{
    let mrn
    if(el.identifier){
      mrn = el.identifier.filter(e=>e.system == "https://www.nicehms.com")[0]
    }
    if(mrn){
      str2 +=  `${mrn.value}, `
      str1 += `WHEN ${mrn.value} THEN "${el.id}" `
    }
    

  })



  let sql = `UPDATE patientDetails set gcpFhirId = (CASE id ${str1} END) WHERE id in(${str2})`;

console.log(sql)

}


// updatePatient()



const deletePatient = async(index)=>{
  if(index > 4000){
    return
  }

  const pat = await new GcpFhirSearch().search("Patient");
  console.log(pat)
}


deletePatient(0)

