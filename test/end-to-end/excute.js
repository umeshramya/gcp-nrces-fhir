const { setMedicationRequest } = require("./medication")
const { callFunction, resources } = require("./index");
const { setCondition } = require("./condion");
const { setPractiotionerRole } = require("./PractitionerRole")
const { PrescriptionRecord, OPConsultRecord, DiagnosticReportComp, GcpFhirCRUD, PractitionerRole, DiagnosticReport } = require("gcp-nrces-fhir");
const { setSpecimen } = require("./Speciman");
const { setServiceRequest } = require("./ServiceRequest");
const { setDiagnosticReport } = require("./DiagnosticReport");
const { setMedia } = require("./Media")
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
    conditon = async () => {
        await callFunction();
        await setCondition();
    }

    specimen = async () => {
        await callFunction();
        const data = await setSpecimen()
        console.log(data)
    }

    practionerRole = async () => {
        await callFunction();
        const data = await setPractiotionerRole()
        console.log(data)

    }


    serviceRequest = async () => {
        await callFunction();
        const res = await setServiceRequest();
        console.log(res);
    }


    media = async () => {
        await callFunction();
        const res = await setMedia()
        console.log(res)
    }

    diagnosticReport = async () => {
        await callFunction()
        resources.serviceRequest = await setServiceRequest();
        resources.media = await setMedia()
        const res = await setDiagnosticReport();
        console.log(res)

    }

    precsriptinComposition = async () => {

        await callFunction();
        await setMedicationRequest();
        await setCondition()
        const gcpFhirCRUD = new GcpFhirCRUD()
        const medciationResource = (await gcpFhirCRUD.getFhirResource(resources.medicationsRequest.id, "MedicationRequest")).data;
        const condionResource = (await gcpFhirCRUD.getFhirResource(resources.conditon.id, "Condition")).data;

        const prescription = new PrescriptionRecord();
        const res = await prescription.create({
            "composition": {
                "author": [{ "display": resources.practioner.name, "reference": `Practitioner/${resources.practioner.id}` }],
                "date": new Date().toISOString(),
                "encounter": resources.encounter,
                "encounterId": resources.encounter.id,
                "organization": resources.organizarion,
                "organizationId": resources.organizarion.id,
                "patient": resources.patient,
                "patientId": resources.patient.id,
                "section": [],
                "status": "final",
                "type": "Prescription"
            },
            "diagnosis": condionResource,
            "medicationRequest": medciationResource
        })

        console.log(res)
    }


    OpCunsulatationComposition = async () => {
        await callFunction();
        await setMedicationRequest();
        await setCondition()
        const gcpFhirCRUD = new GcpFhirCRUD()
        const medciationResource = (await gcpFhirCRUD.getFhirResource(resources.medicationsRequest.id, "MedicationRequest")).data;
        const condionResource = (await gcpFhirCRUD.getFhirResource(resources.conditon.id, "Condition")).data;

        const OpConsultation = new OPConsultRecord();

        const res = await OpConsultation.create({
            composition: {
                "author": [{ "display": resources.practioner.name, "reference": `Practitioner/${resources.practioner.id}` }],
                "date": new Date().toISOString(),
                "encounter": resources.encounter,
                "encounterId": resources.encounter.id,
                "organization": resources.organizarion,
                "organizationId": resources.organizarion.id,
                "patient": resources.patient,
                "patientId": resources.patient.id,
                "section": [],
                "status": "final",
                "type": "Prescription"
            },
            chiefComplaints: condionResource,
            medicationRequest: medciationResource
        })

        console.log(res)

    }


    diagnosticReportComposition = async () => {
        await callFunction()
        resources.serviceRequest = await setServiceRequest();
        resources.media = await setMedia()
        const res = await setDiagnosticReport();

        const gcpFhirCRUD = new GcpFhirCRUD();
        const diag = (await gcpFhirCRUD.getFhirResource(res.id, "DiagnosticReport")).data;
        const media = (await gcpFhirCRUD.getFhirResource(resources.media.id, "Media")).data;
        const serviceRequest = (await gcpFhirCRUD.getFhirResource(resources.serviceRequest.id, "ServiceRequest")).data;
        const diagnosticReport = new DiagnosticReportComp();
        const data = await diagnosticReport.create({
            "composition": {
                "author": [{ "display": resources.practioner.name, "reference": `Practitioner/${resources.practioner.id}` }],
                "date": new Date().toISOString(),
                "encounter": resources.encounter,
                "encounterId": resources.encounter.id,
                "organization": resources.organizarion,
                "organizationId": resources.organizarion.id,
                "patient": resources.patient,
                "patientId": resources.patient.id,
                "section": [],
                "status": "final",
                "type": "DiagnosticReport"
            },
            "diagnosticReport": diag,
            "media": [media],
            "serviceRequest": serviceRequest
        })

        console.log(data)
    }



}




// new excute().medicationrequest();
// new excute().conditon()
// new excute().practionerRole()
// new excute().specimen()
// new excute().serviceRequest()
// new excute().precsriptinComposition();
// new excute().OpCunsulatationComposition()
// new excute().media()
// new excute().diagnosticReport()
new excute().diagnosticReportComposition()

