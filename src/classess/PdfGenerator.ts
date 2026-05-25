import htmlToPdfMake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { JSDOM } from "jsdom";

pdfMake.vfs = vfsFonts;
pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-Italic.ttf",
  },
};

interface PdfData {
  base64?: boolean;
  paperSize?: string;
  qrcode?: string;
  qrCodeWidth?: number;
  esign?: { image: string; nameLine1: string; nameLine2?: string };
  headerbase64Image?: string;
  header?: Function;
  footer?: Function;
  leftMargin?: number;
  topMargin?: number;
  rightMargin?: number;
  bottomMargin?: number;
  paragraphSpace?: number;
  media?: { content: string[]; singleImagePerPage?: boolean };
}

export default function createPdf(
  html: string,
  data: PdfData
): Promise<string | Buffer> {
  return new Promise((resolve, reject) => {
    const window = new JSDOM("").window;
    html = html.replace(/<!-- pagebreak -->/g, '<div class="pagebreak"> </div>');

    const paragraphSpaceHalf = data.paragraphSpace ? data.paragraphSpace / 2 : 3;
    const pdfmakeData = htmlToPdfMake(html, {
      window: window as any,
      tableAutoSize: true,
      defaultStyles: {
        p: { margin: [0, paragraphSpaceHalf, 0, paragraphSpaceHalf] },
      },
    });

    const content: any[] = [];

    if (data.headerbase64Image) {
      content.push({ image: data.headerbase64Image, width: 500 });
    }

    content.push(pdfmakeData);

    const qrcode = data.qrcode
      ? { qr: data.qrcode, fit: data.qrCodeWidth ? `${data.qrCodeWidth}` : "100" }
      : null;

    const esign = data.esign
      ? [
          { image: data.esign.image, width: 100, alignment: "right" },
          { text: data.esign.nameLine1, alignment: "right" },
          ...(data.esign.nameLine2 ? [{ text: data.esign.nameLine2, alignment: "right" }] : []),
        ]
      : null;

    const signTable = {
      layout: "noBorders",
      table: {
        widths: ["50%", "50%"],
        body: [[qrcode || "", esign || ""]],
      },
    };
    content.push(signTable);

    // Media (attachments)
    if (data.media) {
      const size = 500;
      if (data.media.singleImagePerPage) {
        data.media.content.forEach((el, i) => {
          content.push({ image: el, width: size, ...(i > 0 ? { pageBreak: "before" } : {}) });
        });
      } else {
        const body: any[] = [];
        const contentLength = data.media.content.length - 1;
        data.media.content.forEach((el, i) => {
          if (i % 2 === 0 && i < contentLength) {
            body.push([
              { image: data.media!.content[i], width: size / 2.1 },
              { image: data.media!.content[i + 1], width: size / 2.1 },
            ]);
          } else if (i % 2 === 0 && i === contentLength) {
            body.push([{ image: data.media!.content[i], width: size / 2.1 }, ""]);
          }
        });
        if (body.length > 0) {
          content.push({
            layout: "noBorders",
            table: { body },
            pageBreak: "before",
          });
        }
      }
    }

    const docDefinition: any = {
      pageSize: data.paperSize || "A4",
      pageMargins: [
        data.leftMargin || 40,
        data.topMargin || 40,
        data.rightMargin || 40,
        data.bottomMargin || 40,
      ],
      content,
      defaultStyle: { fontSize: 10, lineHeight: 1 },
      pageBreakBefore: (currentNode: any) =>
        currentNode.style && currentNode.style.indexOf("pagebreak") > -1,
    };

    if (data.header) {
      docDefinition.header = data.header;
    }
    if (data.footer) {
      docDefinition.footer = data.footer;
    }

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.getBase64((cb: string) => {
      if (data.base64) {
        resolve(cb);
      } else {
        resolve(Buffer.from(cb, "base64"));
      }
    });
  });
}
