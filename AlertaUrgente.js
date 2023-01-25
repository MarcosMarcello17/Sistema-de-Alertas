const { Alerta } = require("./Alerta");
const PRIORIDAD_URGENTE = 1;

function AlertaUrgente(tema, descripcion, fechaExpira, fechaCreacion) {
  Alerta.call(this, tema, descripcion, fechaExpira, fechaCreacion);
  this.prioridad = PRIORIDAD_URGENTE;
}

AlertaUrgente.prototype = Object.create(Alerta.prototype);
AlertaUrgente.prototype.constructor = AlertaUrgente;

AlertaUrgente.prototype.enviarAlertaATodos = function () {
  this.tema.listaSuscriptores().forEach((user) => {
    user.userHandler.recibirNuevaAlerta(
      this.generaAlertaParaTodos(user, this.prioridad)
    );
  });
};

AlertaUrgente.prototype.enviarAlertaAUsuario = function (user) {
  if (this.generaAlertaParaUsuario(user, this.prioridad) != 0) {
    user.userHandler.recibirNuevaAlerta(
      this.generaAlertaParaUsuario(user, this.prioridad)
    );
  }
};

module.exports = AlertaUrgente;
