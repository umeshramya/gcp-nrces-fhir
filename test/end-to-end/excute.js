const { setMedicationRequest } = require("./medication")
const { callFunction, resources } = require("./index");
const { setCondition } = require("./condion");
const { PrescriptionRecord } = require("gcp-nrces-fhir");
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
        const prescription = new PrescriptionRecord();
        const res = await prescription.create({
            "composition" : {
                "author" : [resources.practioner],
                "date" : new Date().toISOString(),
                "encounter" : resources.encounter,
                "encounterId" : resources.encounter.id,
                "organization" : resources.organizarion.id,
                "patient" : resources.patient,
                "patientId" : resources.patient.id,
                "section" : [],
                "status" : "final",
                "type" : "Prescription"
            },
            "diagnosis" : resources.conditon,
            "medicationRequest" : resources.medicationsRequest
        })

        console.log(res.data)
    }

}




// new excute().medicationrequest();
// new excute().conditon()
new excute().precsriptinComposition()

