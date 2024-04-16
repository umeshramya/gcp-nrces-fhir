import { CODEABLE_CONCEPT } from "../config";

export default class ResourceToHTML {
    codebleConcept(val:CODEABLE_CONCEPT):string{
        let ret:string = ""
        if (val.coding){
            val.coding.forEach(el=>{
                ret += el.code && `Code : ${el.code} <br/>`
                ret += el.display && `Display : ${el.display} <br/>`
                ret += el.system && `System : ${el.system}<br\>`
                ret += el.userSelected && `UserSelected : ${el.userSelected}<br/>`
                ret += el.version && `Version : ${el.version}<br/>`
             })
        }

        if(val.text){
            ret += `${val.text}<br/>`
        }

        return ret
    }
}