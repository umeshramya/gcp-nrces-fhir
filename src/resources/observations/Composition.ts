import { ResourceMaster } from "../../Interfaces"
import { v4 as uuidv4 } from 'uuid'
import { ENCOUNTER } from "../Encounter"
import { PATIENT } from "../Patient"
import { ORGANIZATION } from "../Organization"



export const compositionTypeArrey = [
    {
        type: "OPConsultRecord",
        url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord",
        code: "371530004",
        text: "Clinical consultation report"
    },

    {
        type: "DischargeSummaryRecord",
        url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DischargeSummaryRecord",
        code: "373942005",
        text: "Discharge summary"
    },

] as const

const onlyType = compositionTypeArrey.map(el => el.type)
type compositionType = typeof onlyType[number]
export const compositionStatusArrey = ["preliminary", "final", "amended", "entered-in-error"] as const
type compositionStatus = typeof compositionStatusArrey[number]

export interface compositionAuthor {
    reference: `Practitioner/${string}`
    display: string
}


export interface COMPOSITOIN {
    id?: string;
    identifier?: string;
    patient: PATIENT;
    patientId: string
    encounter: ENCOUNTER;
    encounterId: string
    date: string;
    author: compositionAuthor[]
    organization: ORGANIZATION;
    organizationId: string;
    status: compositionStatus;
    type: compositionType;
    section: []
}
export class Composition implements ResourceMaster {
    private compType!: {
        type: string
        url: string;
        code: string
        text: string
    }
    public mapCompositionType(type: compositionType) {
        this.compType = compositionTypeArrey.filter(comp => comp.type == type)[0]
    }
    getFHIR(options: COMPOSITOIN) {
        this.mapCompositionType(options.type)
        const body = {
            "resourceType": "Composition",
            "id": options.id || undefined,
            "meta": {
                "versionId": "1",
                "lastUpdated": new Date().toISOString(),
                "profile": [
                    this.compType.url
                ]
            },
            "language": "en-IN",
            "text": {
                "status": "generated",
                "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\"><h4>Narrative with Details</h4><p>This is a OP Consult Note for Patient ${options.patient.name}.  ${options.patient.healthNumber}; ph: ${options.patient.mobile}; gender: ${options.patient.gender}; birthDate: ${options.patient.dob}</p></div>`
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
                        "code": this.compType.code,
                        "display": this.compType.text
                    }
                ],
                "text": this.compType.text
            },
            "subject": {
                "reference": `Patient/${options.patientId}`,
                "display": options.patient.name
            },
            "encounter": {
                "reference": `Encounter/${options.encounterId}`
            },
            "date": options.date,
            "author": options.author,
            "title": options.type,
            "custodian": {
                "reference": `Organization/${options.organizationId}`,
                "display": options.organization.name
            },
            "section": [
                {
                    "title": this.compType.type,
                    "code": {
                        "coding": [
                            {
                                "system": "http://snomed.info/sct",
                                "code": this.compType.code,
                                "display": options.type
                            }
                        ]
                    },
                    "entry": options.section
                }
            ]



        }

        return body;
    }
    convertFhirToObject(options: any): Partial<COMPOSITOIN> {
        let ret: Partial<COMPOSITOIN> = {
            patient: undefined,
            patientId: `${options.subject.reference}`.substring(8),
            encounter: undefined,
            encounterId: `${options.encounter.reference}`.substring(10),
            date: options.date,
            organization: undefined,
            organizationId: `${options.custodian.reference}`.substring(13),
            status: options.status,
            type: options.title,
            section: options.section,
            id: options.id,
            identifier: options.identifier.value,
            author: options.author
        }
        return ret;
    }

}






