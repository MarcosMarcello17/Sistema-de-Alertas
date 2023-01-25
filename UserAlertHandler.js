const TODAYS_DATE = new Date();

function UserAlertHandler() {
  this.alertas = [];
}

UserAlertHandler.prototype.recibirNuevaAlerta = function (alert) {
  this.alertas.push(alert);
};

UserAlertHandler.prototype.ordenarAlertas = function (arrAlertas) {
  if (arrAlertas.length > 1) {
    arrAlertas.sort(function (alertaA, alertaB) {
      var dif = alertaB.prioridad - alertaA.prioridad;
      if (dif == 0) {
        if (alertaA.alerta.fechaCreada < alertaB.alerta.fechaCreada) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return dif;
      }
    });
  }
  return arrAlertas;
};

UserAlertHandler.prototype.marcarComoLeida = function (alerta) {
  this.alertas.forEach((alert) => {
    if (alert.alerta == alerta) {
      alert.leerAlerta();
    }
  });
};

UserAlertHandler.prototype.buscaAlertasSinLeer = function () {
  var alertasAOrdenar = [];
  this.alertas.forEach((alert) => {
    if (alert.fechaExpiracion() > TODAYS_DATE && !alert.leida) {
      alertasAOrdenar.push(alert);
    }
  });
  return this.ordenarAlertas(alertasAOrdenar);
};

UserAlertHandler.prototype.buscaAlertasDeTema = function (tema) {
  var alertasAOrdenar = [];
  this.alertas.forEach((alert) => {
    if (alert.fechaExpiracion() > TODAYS_DATE && alert.alerta.tema == tema) {
      alertasAOrdenar.push(alert);
    }
  });
  return this.ordenarAlertas(alertasAOrdenar);
};

module.exports = UserAlertHandler;
