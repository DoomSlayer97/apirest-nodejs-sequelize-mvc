const xl = require("excel4node");

module.exports.clientesExcel = class clientesExcel {

  constructor() {

    this.rowHeaders = [
      "NOMBRES",
      "APELLIDO PATERNO",
      "APELLIDO MATERNO",
      "CORREO",
      "TELEFONO"
    ];
    
    this.wb = new xl.Workbook();

    this.mainWorkSheet = this.wb.addWorksheet("clientes");

  }

  buildDocument(res = null) {

    this.buildTitle();

    return this.wb.write("clientes.xlsx", res);

  }

  buildTitle() {

    const cellStyle = {
      font: {
        bold: true,
        size: 12,
      },
      alignment: {
        horizontal: ["centerContinuous"]
      }
    }

    this.rowHeaders.forEach((item, index) => {

      this.mainWorkSheet.cell(1, (index + 1))
        .string(item)
        .style(cellStyle);

    });

  }

}

