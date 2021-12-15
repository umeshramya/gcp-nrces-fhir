import { ResourceMaster } from "../../Interfaces"
import { v4 as uuidv4 } from 'uuid'

export const compositionTypeArrey = [
    {type : "OPConsultRecord",
    url : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord",
    code : "371530004",
    text :  "Clinical consultation report"},

    {type : "DischargeSummaryRecord",
    url : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DischargeSummaryRecord",
    code : "373942005",
    text :  "Discharge summary"},

] as const

type compositionType = typeof compositionTypeArrey[number]
export const compositionStatusArrey = ["preliminary" , "final" , "amended" , "entered-in-error"] as const
type compositionStatus = typeof compositionStatusArrey[number]


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
    status : compositionStatus
    type : compositionType

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
                    options.type.url
                ]
            },
            "language": "en-IN",
            "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\"><h4>Narrative with Details</h4><p>This is a OP Consult Note for Patient ABC. Generated Summary: id: 1; Medical Record Number = 1234 (System : {https://healthid.ndhm.gov.in}); active; ABC ; ph: +919818512600(HOME); gender: male; birthDate: 1981-01-12</p></div>"
            },
            "identifier": {
                "system": "https://ndhm.in/phr",
                "value": options.identifier || uuidv4()
            },
            "status": options.status,
            "type": {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": options.type.code,
                        "display": options.type.text
                    }
                ],
                "text": options.type.text
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
            "title":options.type.type,
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





