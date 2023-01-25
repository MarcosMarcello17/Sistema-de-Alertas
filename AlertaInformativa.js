const { Alerta } = require("./Alerta");
const PRIORIDAD_INFORMATIVA = 0;

function AlertaInformativa(tema, descripcion, fechaExpira, fechaCreacion) {
  Alerta.call(this, tema, descripcion, fechaExpira, fechaCreacion);
  this.prioridad = PRIORIDAD_INFORMATIVA;
}

AlertaInformativa.prototype = Object.create(Alerta.prototype);
AlertaInformativa.prototype.constructor = AlertaInformativa;

AlertaInformativa.prototype.enviarAlertaATodos = function () {
  this.tema.listaSuscriptores().forEach((user) => {
    user.userHandler.recibirNuevaAlerta(
      this.generaAlertaParaTodos(user, this.prioridad)
    );
  });
};

AlertaInformativa.prototype.enviarAlertaAUsuario = function (user) {
  if (this.generaAlertaParaUsuario(user, this.prioridad) != 0) {
    user.userHandler.recibirNuevaAlerta(
      this.generaAlertaParaUsuario(user, this.prioridad)
    );
  }
};

module.exports = AlertaInformativa;
