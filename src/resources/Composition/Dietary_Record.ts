
import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
interface Args {
  composition: COMPOSITOIN;
  title:string
}
export class DietaryRecord extends Composition implements Records {
  create = async (options: Args, Credentials?: any, DatabasePath?:any) => {
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    let gcpFhirCrud:GcpFhirCRUD;
    if(Credentials){
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath)
    }else{
      gcpFhirCrud= new GcpFhirCRUD()
    }
    body.section = options.composition.section;
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };

  update = async (options: Args,  Credentials?: any, DatabasePath?:any) => {
    if (!options.composition.id) {
      throw (new Error().message = "id of composition is required");
    }
    options = await this.getOptions(options);
    const body = this.getFHIR(options.composition);
    body.section = options.composition.section;
    let gcpFhirCrud:GcpFhirCRUD;
    if(Credentials){
      gcpFhirCrud = new GcpFhirCRUD(Credentials, DatabasePath)
    }else{
      gcpFhirCrud= new GcpFhirCRUD()
    }
    const res = await gcpFhirCrud.updateFhirResource(
      body,
      options.composition.id || "",
      "Composition"
    );
    return res;
  };

  getOptions = async (options: Args): Promise<Args> => {
    let docHtml = options.composition.documentDatahtml || "";
    interface SECTION_ZERO {
      code: {
        coding: [
          {
            code: "440654000";
            display: "Dietary record";
            system: "https://ndhm.gov.in/sct";
          }
        ];
      };
      entry: any[];
      title: string;
    }
    const sectionZero: SECTION_ZERO = {
      code: {
        coding: [
          {
            code: "440654000",
            display: "Dietary record",
            system: "https://ndhm.gov.in/sct",
          },
        ],
      },
      entry: [],
      title: options.title,
    };


    options.composition.documentDatahtml = docHtml;
    options.composition.section = [sectionZero];
    return options;
  };

}
