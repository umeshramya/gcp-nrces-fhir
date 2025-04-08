import { TimeZone } from "../../TimeZone";
import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";
import { APPOINTMENT } from "../Appointment";
import { MEDIA } from "../Media";
import { CreatePdf, PDF_HEADER } from "js-ts-report";
import { PDF_FOOter } from "js-ts-report/build/classes/create-pdf";
interface Args {
  composition: COMPOSITOIN;
  media?: MEDIA[];
  title:string
}
export class HealthDocumentRecord extends Composition implements Records {
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
            code: "419891008";
            display: "Health Document";
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
            code: "419891008",
            display: "Health Document",
            system: "https://ndhm.gov.in/sct",
          },
        ],
      },
      entry: [],
      title: options.title,
    };

    if (options.media && options.media.length > 0) {
      options.media.forEach((el, i) => {
        sectionZero.entry.push({
          reference: `Media/${el.id}`,
          type: "Media",
        });
      });
    }
    options.composition.documentDatahtml = docHtml;
    options.composition.section = [sectionZero];
    return options;
  };

}
