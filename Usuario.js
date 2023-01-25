const UserAlertHandler = require("./UserAlertHandler");

function Usuario(temasRecibe = [], nombre) {
  this.nombre = nombre;
  this.temasSeguidos = [];
  temasRecibe.forEach((tema) => {
    this.subscribirseATema(tema);
  });
  this.userHandler = new UserAlertHandler();
}

Usuario.prototype.leerAlerta = function (alerta) {
  this.userHandler.marcarComoLeida(alerta);
};

Usuario.prototype.obtenerAlertasSinLeer = function () {
  return this.userHandler.buscaAlertasSinLeer();
};

Usuario.prototype.obtenerAlertasSobreTema = function (tema) {
  return this.userHandler.buscaAlertasDeTema(tema);
};

Usuario.prototype.subscribirseATema = function (temaASubscribir) {
  try {
    if (!this.temasSeguidos.includes(temaASubscribir)) {
      this.temasSeguidos.push(temaASubscribir);
      temaASubscribir.nuevoSuscriptor(this);
    } else {
      throw "El usuario ya esta suscripto a este tema";
    }
  } catch {
    return -1;
  }
};

Usuario.prototype.desuscribirseDeTema = function (tema) {
  var indexTemaAEliminar = this.temasSeguidos.indexOf(tema);
  if (indexTemaAEliminar != -1) {
    this.temasSeguidos.splice(temaAEliminar, 1);
  }
};

module.exports = Usuario;
