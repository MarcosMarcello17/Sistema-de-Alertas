function Tema(nombreTema, descripcionTema) {
  this.nombre = nombreTema;
  this.descripcion = descripcionTema;
  this.suscriptores = [];
}

Tema.prototype.nuevoSuscriptor = function (user) {
  this.suscriptores.push(user);
};

Tema.prototype.listaSuscriptores = function () {
  return this.suscriptores;
};

Tema.prototype.buscaSuscriptor = function (user) {
  return this.suscriptores.includes(user);
};

module.exports = Tema;
