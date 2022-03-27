const { setMedicationRequest } = require("./medication")
const { callFunction, resources } = require("./index");
const { setCondition } = require("./condion");
const { PrescriptionRecord,OPConsultRecord, GcpFhirCRUD } = require("gcp-nrces-fhir");
const gcpFhirCRUD = new GcpFhirCRUD();

class excute {


    /**
     * 
     */
    medicationrequest = async () => {
        await callFunction();
        await setMedicationRequest();
    }
    /**
     * 
     */
    conditon = async ()=>{
        await callFunction();
        await setCondition();
    }

    precsriptinComposition = async()=>{

        await callFunction();
        await setMedicationRequest();
        await setCondition()
        const gcpFhirCRUD = new GcpFhirCRUD()
        const medciationResource = (await gcpFhirCRUD.getFhirResource(resources.medicationsRequest.id, "MedicationRequest")).data;
        const condionResource = (await gcpFhirCRUD.getFhirResource(resources.conditon.id, "Condition")).data;

        const prescription = new PrescriptionRecord();
        const res = await prescription.create({
            "composition" : {
                "author" : [{"display" : resources.practioner.name, "reference" : `Practitioner/${resources.practioner.id}`}],
                "date" : new Date().toISOString(),
                "encounter" : resources.encounter,
                "encounterId" : resources.encounter.id,
                "organization" : resources.organizarion,
                "organizationId" : resources.organizarion.id,
                "patient" : resources.patient,
                "patientId" : resources.patient.id,
                "section" : [],
                "status" : "final",
                "type" : "Prescription"
            },
            "diagnosis" : condionResource,
            "medicationRequest" : medciationResource
        })

        console.log(res)
    }


    OpCunsulatationComposition = async()=>{
        await callFunction();
        await setMedicationRequest();
        await setCondition()
        const gcpFhirCRUD = new GcpFhirCRUD()
        const medciationResource = (await gcpFhirCRUD.getFhirResource(resources.medicationsRequest.id, "MedicationRequest")).data;
        const condionResource = (await gcpFhirCRUD.getFhirResource(resources.conditon.id, "Condition")).data;

        const OpConsultation = new OPConsultRecord();

       const res= await OpConsultation.create({
            composition :  {
                "author" : [{"display" : resources.practioner.name, "reference" : `Practitioner/${resources.practioner.id}`}],
                "date" : new Date().toISOString(),
                "encounter" : resources.encounter,
                "encounterId" : resources.encounter.id,
                "organization" : resources.organizarion,
                "organizationId" : resources.organizarion.id,
                "patient" : resources.patient,
                "patientId" : resources.patient.id,
                "section" : [],
                "status" : "final",
                "type" : "Prescription"
            },
            chiefComplaints : condionResource,
            medicationRequest : medciationResource
         })

         console.log(res)

    }



}




// new excute().medicationrequest();
// new excute().conditon()
// new excute().precsriptinComposition();
new excute().OpCunsulatationComposition()

