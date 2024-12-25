import { resourceType } from "..";
import ResourceToHTML from "../classess/ReseorcetToHtml";
import { CODEABLE_CONCEPT, CodeDisplay, IDENTTIFIER, MULTI_RESOURCE } from "../config";

export interface DOSAGE_INSTRUCTION {
  text: string;
  additionalInstruction?: CodeDisplay[];
  timing: string;
  route: CodeDisplay[];
  method: CodeDisplay[];
}

export default class ResourceMain extends ResourceToHTML{
  /**
   * this return the tex div by subcratig first 42 charceters and last 6 s=charecters
   * @param divtext
   * @returns
   */
  protected getDivText = (divtext: string) => {
    const len = divtext.length;
    return divtext.substring(42, len - 6);
  };

  /**
   * this retuen the id of the reference in a resource
   * @param options
   * @returns
   */
  public getIdFromReference = (options: {
    ref: string;
    resourceType: resourceType;
  }) => {
    return `${options.ref}`.substring(options.resourceType.length + 1);
  };

  /**
   * This returns the identifers from identeries by flters the systems
   * @param system
   * @param identifiers
   * @returns
   */
  public getIdentifers = (system: string, options: any): any => {
    let ret: any;
    const mrn: any[] = options.identifier.filter(
      (el: any) => el.system == system
    );

    if (mrn.length > 0) {
      ret = mrn[0].value;
    }
    return ret;
  };

  /**
   * This is when more than one type resource is under reference
   * @param multiResource
   * @returns
   */
  public getFromMultResource = (multiResource: {
    reference: string;
    display?: string;
    identifier?:IDENTTIFIER;
    type?:string;
  }): MULTI_RESOURCE => {
    const resource = multiResource.reference && `${multiResource.reference}`.substring(
      0,
      `${multiResource.reference}`.indexOf("/")
    ) as any;

    const id =multiResource.reference &&  this.getIdFromReference({
      ref: multiResource.reference,
      resourceType: resource,
    });


    let ret: MULTI_RESOURCE = {
      id: id ,
      resource: resource,

    };

    if(multiResource.display){
      ret.display=multiResource.display
    }
 
    if(multiResource.identifier){
      ret.identifier = multiResource.identifier
    }
 
    if(multiResource.type){
      ret.type = multiResource.type
    }
    
    return ret;
  };

  /**
   * this will return copy of resource modified
   * @param resource
   */
  public bundlify(resource: any): any {
    const copyComposoition = Object.assign({}, resource);
    delete copyComposoition.extension;
    delete copyComposoition.language;
    delete copyComposoition.meta;
    delete copyComposoition.text;

    let codedisplay  = copyComposoition.code as any

    if(codedisplay){
      if( codedisplay.length >0){
        codedisplay = codedisplay.map((el:CodeDisplay) => {
          if (el.system == "" || el.system == null) {
            el.system = "https://www.nicehms.com/system";
          }
          return el;
        });
      }else if(codedisplay.coding && codedisplay.coding.length > 0){
        codedisplay.coding = codedisplay.coding.map((el:CodeDisplay)=>{
          if (el.system == "" || el.system == null) {
            el.system = "https://www.nicehms.com/system";
          }
          return el;
        })
      }

    }

    

    copyComposoition.code=codedisplay;
    return copyComposoition;
  }

  public removeUndefinedKeys<T>(obj: T): T {
    for (const key in obj) {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}


createDosageInstrction(options: DOSAGE_INSTRUCTION): any {
  const body = {
    text: options.text,
    additionalInstruction: [
      {
        coding: options.additionalInstruction,
      },
    ],
    timing: {
      code: {
        text: options.timing,
      },
    },
    route: {
      coding: options.route,
    },
    method: {
      coding: options.method,
    },
  };
  return body;
}


convertDosageInstructionToObject(option: any): DOSAGE_INSTRUCTION {
  let ret: DOSAGE_INSTRUCTION = {
    text: option.text,
    additionalInstruction: option.additionalInstruction[0].coding,
    timing: option.timing.code.text,
    route: option.route.coding,
    method: option.method.coding,
  };

  if (ret.additionalInstruction == undefined) {
    delete ret.additionalInstruction;
  }

  return ret;
}
}
