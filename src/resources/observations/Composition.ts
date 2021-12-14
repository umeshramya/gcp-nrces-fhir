import { ResourceMaster } from "../../Interfaces"
import { v4 as uuidv4 } from 'uuid'

export interface COMPOSITOIN {
    id?: string;
    identifier?: string;
    patientId: string;
    patientName: string;
    encounterId: string;
    date: string;
    practitionerId: string
    practitionerName: string
    organizationId: string;
    organizationName: string

}
export class Composition implements ResourceMaster {
    getFHIR(options: COMPOSITOIN) {
        const body = {
            "resourceType": "Composition",
            "id": options.id || undefined,
            "meta": {
                "versionId": "1",
                "lastUpdated": new Date().toISOString(),
                "profile": [
                    "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord"
                ]
            },
            "language": "en-IN",
            "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\"><h4>Narrative with Details</h4><p>This is a OP Consult Note for Patient ABC. Generated Summary: id: 1; Medical Record Number = 1234 (System : {https://healthid.ndhm.gov.in}); active; ABC ; ph: +919818512600(HOME); gender: male; birthDate: 1981-01-12</p></div>"
            },
            "identifier": {
                "system": "https://ndhm.in/phr",
                "value": options.identifier || undefined
            },
            "status": "final",
            "type": {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "371530004",
                        "display": "Clinical consultation report"
                    }
                ],
                "text": "Clinical Consultation report"
            },
            "subject": {
                "reference": `Patient/${options.patientId}`,
                "display": options.patientName
            },
            "encounter": {
                "reference": `Encounter/${options.encounterId}`
            },
            "date": options.date,
            "author": [
                {
                    "reference": `Practitioner/${options.practitionerId}`,
                    "display": options.practitionerName
                }
            ],
            "title": "Consultation Report",
            "custodian": {
                "reference": `Organization/${options.organizationId}`,
                "display": options.organizationName
            },


        }


    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.")
    }

}






