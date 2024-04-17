import { CODEABLE_CONCEPT } from "../config";

export default class ResourceToHTML {
    codebleConceptToHtml(val:CODEABLE_CONCEPT):string{
        let ret:string = ""
        if (val.coding){
            val.coding.forEach(el=>{
                ret += `<br/>`
                if( el.code){
                    ret += `<i>Code</i> : ${el.code} <br/>` 
                }   
                
                if(el.display){
                    ret += `<i>Display</i> : ${el.display} <br/>`
                }
               
                if(el.system){
                    ret += `<i>System</i> : <a href=${el.system} target="_blank" rel="noopener noreferrer">${el.system}</a>
                    <br\>`
                }
               
                if(el.userSelected){
                    ret +=  `<i>UserSelected<i/> : ${el.userSelected}<br/>`
                }
                if(el.version){
                    ret +=   `<i>Version</i> : ${el.version}<br/>`
                }
                
             })
        }

        if(val.text){
            ret += `${val.text}<br/>`
        }

        return ret
    }
}