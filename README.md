# Sistema-de-Alertas

Se pide programar un sistema para enviar alertas a usuarios que tenga la siguiente funcionalidad:
  1. Se pueden registrar usuarios que recibirán alertas. 
  2. Se pueden registrar temas sobre los cuales se enviarán alertas.
  3. Los usuarios pueden optar sobre cuales temas quieren recibir alertas.
  4. Se puede enviar una alerta sobre un tema y lo reciben todos los usuarios que han optado recibir alertas de ese tema.
  5. Se puede enviar una alerta sobre un tema a un usuario específico, solo lo recibe ese único usuario.
  6. Una alerta puede tener una fecha y hora de expiración. Las alertas que tienen expiración, no se muestran al usuario si han expirado.
  7. Hay dos tipos de alertas: Informativas y Urgentes.
  8. Un usuario puede marcar una alerta como leída.
  9. Se pueden obtener todas las alertas no expiradas de un usuario que aún no ha leído, ordenadas primero las Urgentes y luego las informativas de la más reciente a la más antigua.
  10. Se pueden obtener todas las alertas no expiradas para un tema (primero las Urgentes y luego las Informativas de la más reciente a la más antigua). Se informa para cada alerta si es para todos los usuarios o para uno específico.
