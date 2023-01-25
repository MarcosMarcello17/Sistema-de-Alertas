const AlertaUsuario = require("./AlertaUsuario");

function Alerta(tema, descripcion, fechaExpira, fechaCreacion = new Date()) {
  this.tema = tema;
  this.descripcion = descripcion;
  this.fechaExpiracion = fechaExpira;
  this.fechaCreada = fechaCreacion;
}

Alerta.prototype.enviarAlertaATodos = function () {
  return 1;
};

Alerta.prototype.enviarAlertaAUsuario = function (user) {
  return 1;
};

Alerta.prototype.generaAlertaParaUsuario = function (user, prioridad) {
  try {
    if (this.tema.buscaSuscriptor(user)) {
      var alertaParaUsuario = new AlertaUsuario(
        user,
        this,
        prioridad,
        user.nombre
      );
      return alertaParaUsuario;
    } else {
      throw "Usuario no esta suscripto al tema de esta alerta";
    }
  } catch (err) {
    return 0;
  }
};

Alerta.prototype.generaAlertaParaTodos = function (user, prioridad) {
  var alertaParaUsuario = new AlertaUsuario(user, this, prioridad, "All Users");
  return alertaParaUsuario;
};

module.exports = { Alerta };
