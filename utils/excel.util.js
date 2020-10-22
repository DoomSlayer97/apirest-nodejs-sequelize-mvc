const xl = require("excel4node");

module.exports.clientesExcel = class clientesExcel {

  constructor() {

    this.rowHeaders = [
      { name: "NOMBRES", value: "nombres" },
      { name: "APELLIDO PATERNO", value: "apellidoPat" },
      { name: "APELLIDO MATERNO", value: "apellidoMat" },
      { name: "CORREO", value: "email" },
      { name: "TELEFONO", value: "tel" }
      
    ];

    this.dataRows = [];
    
    this.wb = new xl.Workbook();

    this.mainWorkSheet = this.wb.addWorksheet("clientes");

  }

  setDataRows(data) { this.dataRows = data }

  buildDocument(res = null) {

    this.buildTitle();
    this.buildRowsContent();

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
        .string(item.name)
        .style(cellStyle);

    });

  }

  buildRowsContent() {

    this.rowHeaders.forEach((itemHeader, indexHeader) => {
      
      let rowIndex = 2;

      this.dataRows.forEach((item) => {
  
        this.mainWorkSheet.cell(rowIndex, indexHeader + 1)
          .string(item[itemHeader.value]);
        
        rowIndex++;
  
      });

    })


  }

}

