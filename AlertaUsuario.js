function AlertaUsuario(usuario, alerta, prioridad, dirigidoA) {
  this.usuario = usuario;
  this.alerta = alerta;
  this.leida = false;
  this.prioridad = prioridad;
  this.dirigidoA = dirigidoA;
}

AlertaUsuario.prototype.leerAlerta = function () {
  this.leida = true;
};

AlertaUsuario.prototype.fechaExpiracion = function () {
  return this.alerta.fechaExpiracion;
};

module.exports = AlertaUsuario;
