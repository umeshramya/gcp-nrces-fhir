const { setMedicationRequest } = require("./medication");
const { callFunction, resources } = require("./index");
const { setCondition } = require("./condion");
const { setPractiotionerRole } = require("./PractitionerRole");
const {setProcedure} = require("./Procedure")
const axios = require("axios")
const {
  PrescriptionRecord,
  OPConsultRecord,
  DiagnosticReportComp,
  GcpFhirCRUD,
  PractitionerRole,
  DiagnosticReport,
  PrescriptionBundle,
  OPConsultationBundle,
  DiagnsoticReportBundle,
  ServiceRequest,
} = require("gcp-nrces-fhir");
const { setSpecimen } = require("./Speciman");
const { setServiceRequest } = require("./ServiceRequest");
const { setDiagnosticReport } = require("./DiagnosticReport");
const { setMedia } = require("./Media");
const { emptySign } = require("gcp-nrces-fhir/lib/resources/Composition");
const {  credentials,
    databasePath} = require("gcp-nrces-fhir/lib/config/index")
const { setObservation } = require("./Observation");
const console = require("console");
const { setSChedule } = require("./Schedule");
const gcpFhirCRUD = new GcpFhirCRUD();


const webhookURL="https://webhook.site/145332ce-6f1d-4e11-a8f5-88e5d85611b7"
class excute {
  callFunction = async () => {
    await callFunction();
    console.log(resources);
  };

  /**
   *
   */
  medicationrequest = async () => {
    await callFunction();
    await setMedicationRequest();
  };
  /**
   *
   */
  conditon = async () => {
    await callFunction();
    await setCondition();
  };

  specimen = async () => {
    await callFunction();
    const data = await setSpecimen();
    console.log(data);
  };

  procedure= async () => {
    await callFunction();
    const data = await setProcedure();
    console.log(data);
  };


  practionerRole = async () => {
    await callFunction();
    const data = await setPractiotionerRole();
    console.log(data);
  };

  serviceRequest = async () => {
    await callFunction();
    const res = await setServiceRequest();
    console.log(res);
  };

  media = async () => {
    await callFunction();
    const res = await setMedia();
    console.log(res);
  };

  diagnosticReport = async () => {
    await callFunction();
    resources.serviceRequest = await setServiceRequest();
    resources.media = await setMedia();
    const res = await setDiagnosticReport();
    console.log(res);
  };

  observation = async () => {
    await callFunction();
    const res = await setObservation();
    console.log(res);
  };

  schedule = async()=>{
    await callFunction()
    const res= await setSChedule()
    console.log(res)
  }

  precsriptinComposition = async () => {
    await callFunction();
    await setMedicationRequest();
    await setCondition();
    const gcpFhirCRUD = new GcpFhirCRUD();
    const medciationResource = (
      await gcpFhirCRUD.getFhirResource(
        resources.medicationsRequest.id,
        "MedicationRequest"
      )
    ).data;
    const condionResource = (
      await gcpFhirCRUD.getFhirResource(resources.conditon.id, "Condition")
    ).data;

    const prescription = new PrescriptionRecord();
    const res = await prescription.create({
      composition: {
        author: [
          {
            display: resources.practioner.name,
            reference: `Practitioner/${resources.practioner.id}`,
          },
        ],
        date: new Date().toISOString(),
        encounter: resources.encounter,
        encounterId: resources.encounter.id,
        organization: resources.organization,
        organizationId: resources.organization.id,
        patient: resources.patient,
        patientId: resources.patient.id,
        section: [],
        status: "final",
        type: "Prescription",
      },
      diagnosis: condionResource,
      medicationRequest: medciationResource,
    });

    console.log(res);
  };

  OpCunsulatationComposition = async () => {
    await callFunction();
    await setMedicationRequest();
    await setCondition();
    await setProcedure()
    const gcpFhirCRUD = new GcpFhirCRUD();
    const medciationResource = (
      await gcpFhirCRUD.getFhirResource(
        resources.medicationsRequest.id,
        "MedicationRequest"
      )
    ).data;
    const condionResource = (
      await gcpFhirCRUD.getFhirResource(resources.conditon.id, "Condition")
    ).data;

    const OpConsultation = new OPConsultRecord();

    const res = await OpConsultation.create({
      composition: {
        author: [
          {
            display: resources.practioner.name,
            reference: `Practitioner/${resources.practioner.id}`,
          },
        ],
        date: new Date().toISOString(),
        encounter: resources.encounter,
        encounterId: resources.encounter.id,
        organization: resources.organization,
        organizationId: resources.organization.id,
        patient: resources.patient,
        patientId: resources.patient.id,
        section: [],
        status: "final",
        type: "OPConsultation",
      },
      chiefComplaints: condionResource,
      // medicalHistory : condionResource,
      // physicalExamination: resources.conditon,
      procedure : resources.procedure,
      medicationRequest: medciationResource,
    });

    console.log(res);
  };

  diagnosticReportComposition = async () => {
    await callFunction();
    resources.serviceRequest = await setServiceRequest();
    resources.media = await setMedia();
    const res = await setDiagnosticReport();

    const gcpFhirCRUD = new GcpFhirCRUD();
    const diag = (await gcpFhirCRUD.getFhirResource(res.id, "DiagnosticReport"))
      .data;

    const media = (
      await gcpFhirCRUD.getFhirResource(resources.media.id, "Media")
    ).data;
    const serviceRequest = (
      await gcpFhirCRUD.getFhirResource(
        resources.serviceRequest.id,
        "ServiceRequest"
      )
    ).data;

    const diagnosticReport = new DiagnosticReportComp();
    const data = await diagnosticReport.create({
      composition: {
        author: [
          {
            display: resources.practioner.name,
            reference: `Practitioner/${resources.practioner.id}`,
          },
        ],
        date: new Date().toISOString(),
        encounter: resources.encounter,
        encounterId: resources.encounter.id,
        organization: resources.organization,
        organizationId: resources.organization.id,
        patient: resources.patient,
        patientId: resources.patient.id,
        section: [],
        status: "final",
        type: "DiagnosticReport",
        user: [
          {
            date: new Date().toDateString,
            id: 1,
            name: "Prakasj",
            orgId: 1,
            orgName: "JJH",
          },
          {
            date: new Date().toDateString,
            id: 1,
            name: "Prakasj",
            orgId: 1,
            orgName: "JJH",
          },
        ],
      },
      textInTable: true,
      diagnosticReport: diag,
      serviceRequest: serviceRequest,
    });

    console.log(data.data);
    // return
    const pdf = await diagnosticReport.getPdf({
      html: data.data.text.div,
      base64: true,
      nameLine1: resources.practioner.name,
      paperSize: "a4",
      qrCode: "https://www.nicehms.com",
      signBase64: emptySign,
      composition: data.data,
    });

    console.log(pdf);
  };

  updateServiceRequest = async () => {
    const body = {
      category: [
        {
          coding: [
            {
              code: "108252007",
              display: "Laboratory procedure",
              system: "http://snomed.info/sct",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            code: "58410-2",
            display: "CBC Pnl Bld Auto",
            system: "http://loinc.org",
          },
          {
            code: "42176-8",
            display: "1,3 beta glucan [Mass/volume] in Serum",
            system: "http://loinc.org",
          },
        ],
      },
      id: "7e042174-c17f-4d5b-a1c0-71269d45e087",
      intent: "order",
      meta: {
        lastUpdated: "2022-04-23T14:15:16.261282+00:00",
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ServiceRequest",
        ],
        versionId: "MTY1MDcyMzMxNjI2MTI4MjAwMA",
      },
      occurrenceDateTime: "2022-04-23",
      performer: [
        {
          display: "Dr Nice Hms MS Orth",
          reference: "Practitioner/42bbaf05-7863-493b-acf5-e85cf889cfe1",
        },
        {
          display: "Dr Akash MD",
          reference: "Practitioner/665b41f3-3cf1-477f-93fe-9333c522b0af",
        },
      ],
      priority: "routine",
      requester: {
        display: "Patient",
        reference: "Patient/b853af5e-c0b9-4ace-8d4a-45b9a8969b8f",
      },
      resourceType: "ServiceRequest",
      status: "draft",
      subject: {
        display: "Vasu M Dodamani",
        reference: "Patient/b853af5e-c0b9-4ace-8d4a-45b9a8969b8f",
      },
      text: {
        div: '<div xmlns="http://www.w3.org/1999/xhtml">, CBC Pnl Bld Auto, 1,3 beta glucan [Mass/volume] in Serum</div>',
        status: "generated",
      },
    };

    const convert = new ServiceRequest().convertFhirToObject(body);
    console.log(convert);

    // const res = await new GcpFhirCRUD().updateFhirResource(body, body.id, "ServiceRequest")
    // console.log(res)
  };

  // aca383e6-621e-4faa-88b0-78cfbf47f10b
  createPrescriptionBundle = async () => {
    const compositionResource = await new GcpFhirCRUD()
      .getFhirResource("aca383e6-621e-4faa-88b0-78cfbf47f10b", "Composition")
      .then((res) => res.data);
    const html = `${compositionResource.text.div}`.trim();

    const pdf = await new PrescriptionBundle(credentials, databasePath).getpdf({
      html: html,
      qrCode: `https://www.nicehms.com/api/${compositionResource.id}?bundletype=Prescription`,
    });
    const bundle = await new PrescriptionBundle(
      credentials,
      databasePath
    ).getFHIR({
      composition: compositionResource,
      id: compositionResource.id,
      pdfData: pdf,
    });
    await axios({
        "methos" : "POST",
        url : `${webhookURL}/pres`,
        data : bundle
    })
    return bundle;
  };

  createOPConsultationBundle = async (
  ) => {

    const compositionResource = await new GcpFhirCRUD()
    .getFhirResource("f5d60c07-8592-4b56-8a31-eade429d6eca", "Composition")
    .then((res) => res.data);
    const html = `${compositionResource.text.div}`.trim();

    const pdf = await new OPConsultationBundle(
      credentials,
      databasePath
    ).getpdf({
      html: html,
      qrCode: `https://www.nicehms.com/api/${compositionResource.id}?bundletype=OPConsultation`,
    });
    const bundle = await new OPConsultationBundle(
      credentials,
      databasePath
    ).getFHIR({
      composition: compositionResource,
      id: compositionResource.id,
      pdfData: pdf,
    });
    await axios({
      "methos" : "POST",
      url : `${webhookURL}/opd`,
      data : bundle
  })
  return bundle;
  };

  createDiagnosticReportBundle = async (

  )=> {
    const lipidId ="ca7bfd8c-5208-48a2-a53d-e09228d64794"
    const echoId="70334fba-ad8d-494a-bc44-4b0f8f7015cf" 
    const test="10454763-d469-42e4-8c04-62c98744bb38"
    
    const compositionResource = await new GcpFhirCRUD()
    .getFhirResource(echoId, "Composition")
    .then((res) => res.data);
    const html = `${compositionResource.text.div}`.trim();
    const pdf = await new DiagnsoticReportBundle(
      credentials,
      databasePath
    ).getpdf({
      html: html,
      qrCode: `https://www.nicehms.com/api/${compositionResource.id}?bundletype=DiagnosticReport`,
    });
    const bundle = await new DiagnsoticReportBundle(
      credentials,
      databasePath
    ).getFHIR({
      composition: compositionResource,
      pdfData: pdf,
      id: compositionResource.id,
    });
    await axios({
      "methos" : "POST",
      url : `${webhookURL}/diagnostic`,
      data : bundle
  })
  return bundle;
  };
}

// new excute().callFunction()
// new excute().medicationrequest();
// new excute().conditon()
// new excute().practionerRole()
// new excute().specimen()
// new excute().procedure()
// new excute().serviceRequest()
new excute().schedule()
// new excute().precsriptinComposition();
// new excute().OpCunsulatationComposition()
// new excute().media()
// new excute().diagnosticReport()
// new excute().observation()
// new excute().diagnosticReportComposition()

// new excute().updateServiceRequest()

// new excute().createPrescriptionBundle()
// new excute().createOPConsultationBundle();
  
// new excute().createDiagnosticReportBundle()
