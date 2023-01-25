const AlertaInformativa = require("./AlertaInformativa");
const AlertaUrgente = require("./AlertaUrgente");
const URGENTE = 1;
const INFORMATIVA = 0;

function AlertaGenerator() {
  this.crearAlerta = function (
    prioridad,
    tema,
    descripcion,
    fechaExpira,
    fechaCreacion = new Date()
  ) {
    switch (prioridad) {
      case URGENTE:
        return new AlertaUrgente(tema, descripcion, fechaExpira, fechaCreacion);
      case INFORMATIVA:
        return new AlertaInformativa(
          tema,
          descripcion,
          fechaExpira,
          fechaCreacion
        );
    }
  };
}

module.exports = AlertaGenerator;
