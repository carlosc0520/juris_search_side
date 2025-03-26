import { toast } from 'vue3-toastify';
import pdfMake from 'pdfmake/build/pdfmake';
import recursos from "../../views/admin/recursos.js";
import timesNewRoman from "../../assets/times.js";
import timesNewRomanBold from "../../assets/timesBold.js";
import timesNewRomanItalics from "../../assets/timesItalics.js";

class createPDFHelper {
  async generate(data) {
    console.log(data)
    try {
      let margin = [40, 10, 40, 10];
      let totalPages = 0;
      let fontSize = 11;
      let currentYear = new Date().getFullYear();
      let documentoPDF = {

        header: () => {
          return {
            style: 'headerStyle',
            columns: [
              { width: '*', text: '', alignment: 'center', margin: [40, 40, 40, 40] },
              {
                width: 'auto',
                stack: [
                  {
                    image: recursos.nuevoLogoJuris,
                    width: 60,
                    link: 'https://jurissearch.com/',
                    alignment: 'center',
                    margin: [0, 20, 0, 0]
                  },
                ],
              },
              { width: '*', text: '', alignment: 'center', margin: [40, 40, 40, 40] },
            ],
          }
        },


        background: [
          {
            image: recursos.toIMG,
            width: 620,
            height: 600,
            absolutePosition: { x: 5, y: 150 },
            alignment: 'center',
            opacity: 0.5,
          }
        ],

        content: [
          {
            text: `${data.TITLE}`,
            style: 'header',
            alignment: 'center',
            margin: [40, -20, 40, 10],
            bold: true,
            FontFace: 'Calibri'
          },
          {
            table: {
              widths: ['35%', '57%'],
              body: [
                [{ text: '▪ TIPO DE RECURSO:', bold: true }, data?.RECURSO],
                // reempalzar "," por "\n" en la propiedad DELITO
                [{ text: '▪ DELITOS:', bold: true }, data?.DELITO?.replace(/,/g, '\n')],
                [{ text: '▪ VINCULANTE:', bold: true }, data?.ISBINDING]
              ]
            },
            margin: [70, 0, 0, 0],
            fontSize,
            lineHeight: 1.5,
            layout: 'noBorders'
          },
          {
            width: 'auto',
            stack: [
              {
                image: recursos.botonDescargarResolucion,
                width: 120,
                link: 'https://api.jurissearch.com/login/download-file?ID=' + data?.ID,
                alignment: 'center',
                margin: [0, 10, 0, 10]
              },
            ],
          },
          {
            style: 'tableExample',
            table: {
              dontBreakRows: false,
              widths: ['35%', '65%'],
              body: [
                [
                  {
                    text: 'CONTENIDO',
                    bold: true,
                    colSpan: 2,
                    fontSize,
                    alignment: 'center',
                    margin: [20, 2, 20, 8],
                    fillColor: '#76D6FF',
                  },
                  {},
                ],
                [
                  {
                    text: 'TEMA',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  this.renderContent(data.TEMA, fontSize, [10, 2, 10, 8]),
                ],
                [
                  {
                    text: 'SUBTEMA',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  this.renderContent(data.SUBTEMA, fontSize, [10, 2, 10, 8]),

                ],
                [
                  {
                    text: 'PALABRAS CLAVES',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  {
                    text: data.KEYWORDS,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                ],
                [
                  {
                    text: 'SÍNTESIS DE LOS FUNDAMENTOS JURÍDICOS RELEVANTES',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  this.renderContent(data.SHORTSUMMARY, fontSize, [10, 2, 10, 8], 1),
                ],
                [
                  {
                    text: 'FUNDAMENTOS JURÍDICOS RELEVANTES',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8]
                  },

                  {
                    ...this.renderContent(data.RESUMEN, fontSize, [10, 2, 10, 8]),
                    italics: true,
                  }
                ],
                [
                  {
                    text: 'IDENTIFICACIÓN',
                    bold: true,
                    fontSize,
                    colSpan: 2,
                    alignment: 'center',
                    margin: [10, 2, 10, 8],
                    fillColor: '#76D6FF',
                  },
                  {},
                ],
                [
                  {
                    text: 'ÁMBITO',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  {
                    text: data.AMBIT,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                ],
                [
                  {
                    text: 'FECHA DE RESOLUCIÓN',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  {
                    text: data.FRESOLUTIONSTRING,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                ],
                [
                  {
                    text: 'JURISDICCIÓN',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  {
                    text: data?.JURISDICCION || '-',
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                ],
                [
                  {
                    text: 'ÓRGANO JURISDICCIONAL',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  {
                    text: data.OJURISDICCIONAL,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                ],
                [
                  {
                    text: 'MAGISTRADOS',
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  {
                    text: data.MAGISTRATES,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                ],
                [
                  {
                    text: ['VOTO DISIDENTE\n', {
                      text: 'Voto que discrepa del fallo final adoptado.', fontSize: fontSize - 2, bold: false, italics: true
                    }],
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  {
                    text: data?.VDESIDENTE?.replace(/,/g, ', ')  || '-',
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                ],
                [
                  {
                    text: ['VOTO CONCURRENTE\n', {
                      text: 'Voto que disiente de la argumentación jurídica, pero no del fallo final adoptado.',
                      fontSize: fontSize - 1, bold: false,
                      italics: true
                    }],
                    bold: true,
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                  {
                    text: data?.CVOTE?.replace(/,/g, ', ') || '-',
                    fontSize,
                    margin: [10, 2, 10, 8],
                  },
                ],
              ],
            },
          }

        ],
        styles: {
          FontFace: 'Calibri',
          headerStyle: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 5],
          },
          tableExample: {
            margin: [margin[0], 10, margin[2], 10],
            FontFace: 'Calibri',
          },
          footer: {
            font: 'TimesNewRoman',
            fontSize: 10,
            margin: [40, 40, 40, 10],
          },
        },
        footer: function (currentPage, pageCount) {
          if (currentPage > totalPages) {
            totalPages = currentPage;
          }
          return {
            style: 'footer',
            stack: [
              {
                columns: [
                  { width: '*', text: ``, alignment: 'left', color: 'transparent' },
                  { width: 'auto', text: 'www.', alignment: 'center', color: 'gray' },
                  { width: 'auto', text: 'jurissearch', alignment: 'center', color: '#e81eb2', link: 'https://jurissearch.com/' },
                  { width: 'auto', text: '.com', alignment: 'center', color: 'gray' },
                  { width: '*', text: `Página ${currentPage} de ${pageCount}`, alignment: 'right' },
                ],
              },
              {
                text: `© ${currentYear} JURIS SEARCH - TODOS LOS DERECHOS RESERVADOS`,
                font: 'TimesNewRoman',
                alignment: 'right',
                color: 'gray',
                margin: [0, 10, 40, 0]
              }
            ]
          };
        },

        pageMargins: [40, 100, 40, 90],
      }

      // pdfMake.vfs = await pdfFonts.pdfMake.vfs;
      pdfMake.vfs = {
        "TimesNewRoman.ttf": timesNewRoman,
        "Roboto-Medium.ttf": timesNewRomanBold,
        "Roboto-Regular.ttf": timesNewRoman,
        "Roboto-Italics.ttf": timesNewRomanItalics,
      };
      pdfMake.fonts = {
        TimesNewRoman: {
          normal: "TimesNewRoman.ttf",
          bold: "TimesNewRoman.ttf",
          italics: "TimesNewRoman.ttf",
          bolditalics: "TimesNewRoman.ttf",
        },
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italics.ttf",
        }
      };

      await pdfMake.createPdf(documentoPDF).download((`${data.TITLE} - RESUMEN EJECUTIVO`).toUpperCase() + '.pdf');

    } catch (error) {
      toast.error(error?.MESSAGE || 'Error al obtener el archivo', { toastId: 'error-export' });
    }
  }

  renderContent(content, fontSize, margin) {
    let decodedContent = this.decodeHtmlEntities(content);
    if (Array.isArray(decodedContent)) {
      return {
        ul: decodedContent,
        fontSize,
        alignment: 'justify',
        margin
      };
    }

    return {
      text: decodedContent,
      fontSize,
      alignment: 'justify',
      margin
    };
  }

  decodeHtmlEntities(text) {
    if (text === null) return '';

    text = text.replace(/&[a-z]+;/g, '');

    try {
      text = text.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n');

      if (text.includes('<ul>')) {
        let t = text.split('<li>').map((item) => {
          item = item.replace(/<\/?[^>]+(>|$)/g, '');
          return item;
        }).filter((item) => item.trim() !== '');

        return t;
      }

      return text.replace(/<[^>]*>?/gm, '');
    } catch (error) {
      return text.replace(/<[^>]*>?/gm, '');
    }
  }
}

export default new createPDFHelper();