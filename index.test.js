const PRIORIDAD_URGENTE = 1;
const PRIORIDAD_INFORMATIVA = 0;
const AlertaGenerator = require("./AlertaGenerator");
const Tema = require("./Tema");
const Usuario = require("./Usuario");

var alertaFactory = new AlertaGenerator();
var deportesTema = new Tema("Deportes", "Envia Alertas sobre temas deportivos");
describe("Se pueden registrar usuarios que recibirán alertas", () => {
  test("Se registra usuario y recibe una alerta", () => {
    var user1 = new Usuario((temasRecibe = [deportesTema]), "Usuario 1");
    var alertaEjemplo1 = alertaFactory.crearAlerta(
      PRIORIDAD_URGENTE,
      deportesTema,
      "Alerta ejemplo",
      new Date(2023, 2, 15)
    );
    alertaEjemplo1.enviarAlertaAUsuario(user1);
    expect(user1.obtenerAlertasSinLeer()[0].alerta).toStrictEqual(
      alertaEjemplo1
    );
  });
});

describe("Se pueden registrar temas sobre los cuales se enviarán alertas.", () => {
  test("Usuario recibe una alerta del tema deportes", () => {
    var user1 = new Usuario((temasRecibe = [deportesTema]), "Usuario 1");
    var alertaEjemplo1 = alertaFactory.crearAlerta(
      PRIORIDAD_URGENTE,
      deportesTema,
      "Alerta ejemplo",
      new Date(2023, 2, 15)
    );
    alertaEjemplo1.enviarAlertaAUsuario(user1);
    expect(user1.obtenerAlertasSinLeer()[0].alerta.tema).toStrictEqual(
      deportesTema
    );
  });
});

describe("Los usuarios pueden optar sobre cuales temas quieren recibir alertas", () => {
  test("Usuario se suscribe al tema Deportes", () => {
    var user2 = new Usuario((temasRecibe = []), "Usuario 2");
    user2.subscribirseATema(deportesTema);
    expect(user2.temasSeguidos).toStrictEqual([deportesTema]);
  });
});

describe("Se puede enviar una alerta sobre un tema y lo reciben todos los usuarios que han optado recibir alertas de ese tema.", () => {
  test("Alerta se envia a los usuarios suscriptos al tema y a los demas no", () => {
    var user3 = new Usuario((temasRecibe = []), "Usuario 3");
    var user4 = new Usuario((temasRecibe = [deportesTema]), "Usuario 4");
    var user9 = new Usuario((temasRecibe = [deportesTema]), "Usuario 9");
    var alertaEjemplo2 = alertaFactory.crearAlerta(
      PRIORIDAD_INFORMATIVA,
      deportesTema,
      "Alerta para test",
      new Date(2024, 1, 15)
    );
    alertaEjemplo2.enviarAlertaATodos();
    expect(user4.obtenerAlertasSinLeer()[0].alerta).toBe(alertaEjemplo2);
    expect(user9.obtenerAlertasSinLeer()[0].alerta).toBe(alertaEjemplo2);
    expect(user3.obtenerAlertasSinLeer()).toStrictEqual([]);
  });
});

describe("Se puede enviar una alerta sobre un tema a un usuario específico, solo lo recibe ese único usuario.", () => {
  test("user4 y user9 se suscriben al tema Deportes, pero user4 recibe una alerta dirigida solo para el", () => {
    var user4 = new Usuario((temasRecibe = [deportesTema]), "Usuario 4");
    var user9 = new Usuario((temasRecibe = [deportesTema]), "Usuario 9");
    var alertaEjemplo2 = alertaFactory.crearAlerta(
      PRIORIDAD_INFORMATIVA,
      deportesTema,
      "Alerta para test",
      new Date(2024, 1, 15)
    );
    alertaEjemplo2.enviarAlertaAUsuario(user4);
    expect(user4.obtenerAlertasSinLeer()[0].alerta).toBe(alertaEjemplo2);
    expect(user9.obtenerAlertasSinLeer()).toStrictEqual([]);
  });
});

describe("Una alerta puede tener una fecha y hora de expiración. Las alertas que tienen expiración, no se muestran al usuario si han expirado", () => {
  test("Se envia una alerta a user5, pero como ya expiro no se muestra", () => {
    var user5 = new Usuario((temasRecibe = [deportesTema]), "Usuario 5");
    var alertaEjemplo3 = alertaFactory.crearAlerta(
      PRIORIDAD_URGENTE,
      deportesTema,
      "Alerta de Ejemplo",
      new Date(2023, 0, 1)
    );
    alertaEjemplo3.enviarAlertaAUsuario(user5);
    expect(user5.obtenerAlertasSinLeer()).toStrictEqual([]);
  });
});

describe("Un usuario puede marcar una alerta como leída.", () => {
  test("Usuario recibe una alerta, pero despues de leerla no aparece mas", () => {
    var user6 = new Usuario((temasRecibe = [deportesTema]), "Usuario 6");
    var alertaEjemplo4 = alertaFactory.crearAlerta(
      PRIORIDAD_INFORMATIVA,
      deportesTema,
      "Alerta de ejemplo",
      new Date(2025, 1, 1)
    );
    alertaEjemplo4.enviarAlertaATodos();
    expect(user6.obtenerAlertasSinLeer()[0].alerta).toStrictEqual(
      alertaEjemplo4
    );
    user6.leerAlerta(alertaEjemplo4);
    expect(user6.obtenerAlertasSinLeer()).toStrictEqual([]);
  });
});

describe("Se pueden obtener todas las alertas no expiradas de un usuario que aún no ha leído, ordenadas primero las Urgentes y luego las informativas de la más reciente a la más antigua.", () => {
  test("Usuario recibe varias notificaciones, pero aparecen ordenadas por prioridad y por fecha de creacion", () => {
    var user7 = new Usuario((temasRecibe = [deportesTema]), "Usuario 7");
    var alertaEjemplo5 = alertaFactory.crearAlerta(
      PRIORIDAD_INFORMATIVA,
      deportesTema,
      "alertaEjemplo5",
      new Date(2025, 1, 1),
      new Date(2023, 1, 15)
    );
    var alertaEjemplo6 = alertaFactory.crearAlerta(
      PRIORIDAD_URGENTE,
      deportesTema,
      "alertaEjemplo6",
      new Date(2025, 10, 1),
      new Date(2023, 1, 14)
    );
    var alertaEjemplo7 = alertaFactory.crearAlerta(
      PRIORIDAD_INFORMATIVA,
      deportesTema,
      "alertaEjemplo7",
      new Date(2035, 1, 15),
      new Date(2023, 1, 12)
    );
    var alertaEjemplo8 = alertaFactory.crearAlerta(
      PRIORIDAD_URGENTE,
      deportesTema,
      "alertaEjemplo8",
      new Date(2023, 10, 5),
      new Date(2023, 1, 13)
    );
    alertaEjemplo8.enviarAlertaATodos();
    alertaEjemplo5.enviarAlertaATodos();
    alertaEjemplo6.enviarAlertaATodos();
    alertaEjemplo7.enviarAlertaATodos();
    expect(user7.obtenerAlertasSinLeer()[0].alerta).toStrictEqual(
      alertaEjemplo8
    );
    expect(user7.obtenerAlertasSinLeer()[1].alerta).toStrictEqual(
      alertaEjemplo6
    );
    expect(user7.obtenerAlertasSinLeer()[2].alerta).toStrictEqual(
      alertaEjemplo7
    );
    expect(user7.obtenerAlertasSinLeer()[3].alerta).toStrictEqual(
      alertaEjemplo5
    );
  });
});

/* En este caso, asumo que no se tiene en cuenta si la alerta ya esta leida o no siempre y cuando no haya expirado */

describe("Se pueden obtener todas las alertas no expiradas para un tema. Se informa para cada alerta si es para todos los usuarios o para uno específico.", () => {
  test("Usuario obtiene todas las alertas de un tema determinado, cada alerta tambien indica si es para el o es una alerta general", () => {
    var temaGenerico = new Tema("TemaEjemplo", "Tema usado para test");
    var user8 = new Usuario((temasRecibe = [temaGenerico, deportesTema]));
    var alertaEjemplo11 = alertaFactory.crearAlerta(
      PRIORIDAD_INFORMATIVA,
      deportesTema,
      "Alerta Informativa",
      new Date(2027, 4, 13)
    );
    var alertaEjemplo9 = alertaFactory.crearAlerta(
      PRIORIDAD_URGENTE,
      deportesTema,
      "Urgente Test 1",
      new Date(2030, 5, 4)
    );
    var alertaEjemplo10 = alertaFactory.crearAlerta(
      PRIORIDAD_URGENTE,
      temaGenerico,
      "Urgente Test 2",
      new Date(2025, 4, 5)
    );
    alertaEjemplo11.enviarAlertaATodos();
    alertaEjemplo10.enviarAlertaATodos();
    alertaEjemplo9.enviarAlertaAUsuario(user8);
    expect(user8.obtenerAlertasSobreTema(deportesTema)[0].alerta).toStrictEqual(
      alertaEjemplo9
    );
    expect(
      user8.obtenerAlertasSobreTema(deportesTema)[0].dirigidoA
    ).toStrictEqual(user8.nombre);
    expect(user8.obtenerAlertasSobreTema(deportesTema)[1].alerta).toStrictEqual(
      alertaEjemplo11
    );
    expect(
      user8.obtenerAlertasSobreTema(deportesTema)[1].dirigidoA
    ).toStrictEqual("All Users");
  });
});

describe("Tests de Errores", () => {
  test("Si se quiere enviar una alerta a un usuario no suscripto al tema de la alerta, recibe error", () => {
    try {
      var usuario = new Usuario((temasRecibe = []), "UsuarioTest");
      var alertaTest = alertaFactory.crearAlerta(
        PRIORIDAD_INFORMATIVA,
        deportesTema,
        "Alerta para UsuarioTest",
        new Date(2027, 1, 1)
      );
      alertaTest.enviarAlertaAUsuario(usuario);
    } catch (error) {
      expect(error.message).toBe(
        "Usuario no esta suscripto al tema de esta alerta"
      );
    }
  });
  test("Usuario no puedo suscribirse 2 veces al mismo tema", () => {
    try {
      var usuario = new Usuario((temasRecibe = []), "UsuarioTest");
      usuario.subscribirseATema(deportesTema);
      usuario.subscribirseATema(deportesTema);
    } catch (error) {
      expect(error.message).toBe("El usuario ya esta suscripto a este tema");
    }
  });
});
