
module.exports.verificarTipoValidacion = (tipo) => {

  switch (tipo) {

    case "evento":

      return {
        titulo: "required",
        tipo: "required",
        fecha: "required",
        hora: "required",
        horaFin: "required"
      };
      
      break;
    
    case "seguimiento":
      
      return {
        tipo: "required",
        titulo: "required",
        fecha: "required",
        hora: "required",
        clienteId: "required"
      };
      
      break;
    
    case "guardia":

      return {
        tipo: "required",
        titulo: "required",
        fecha: "required",
        fechaFin: "required",
        hora: "required",
        horaFin: "required"
      }
      
      break;

  }

}

module.exports.verificarTipoActividad = (tipo, params) => {

  switch (tipo) {

    case "evento":

      return {
        titulo: params.titulo,
        tipo: params.tipo,
        fecha: params.fecha,
        hora: params.hora,
        horaFin: params.horaFin
      };
      
      break;
    
    case "seguimiento":

      return {
        tipo: params.tipo,
        titulo: params.titulo,
        fecha: params.fecha,
        hora: params.hora,
        clienteId: params.clienteId
      };
      
      break;
    
    case "guardia":
      
      return {
        tipo: params.tipo,
        titulo: params.titulo,
        fecha: params.fecha,
        fechaFin: params.fechaFin,
        hora: params.hora,
        horaFin: params.horaFin
      };
      
      break;

  }

}

