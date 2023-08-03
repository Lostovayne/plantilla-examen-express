# plantilla-examen-express

## Descripción

Este es un proyecto de plantilla para un examen utilizando Express.js como framework de backend.

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias.
2. Configura las opciones de la base de datos en `config/db.js`.

## Uso

-   Ejecuta `npm run dev` para iniciar el servidor en modo de desarrollo.
-   Accede al servidor en `http://localhost:3000`.

## Dependencias

-   bcryptjs: ^2.4.3
-   cookie-parser: ^1.4.6
-   cors: ^2.8.5
-   dotenv: ^16.3.1
-   ejs: ^3.1.9
-   express: ^4.18.2
-   express-session: ^1.17.3
-   jsonwebtoken: ^9.0.1
-   mysql2: ^3.5.2
-   nodemailer: ^6.9.4
-   nodemon: ^3.0.1

## Rutas

-   `/api/users/`: Ruta protegida que muestra la página de inicio del usuario.
-   `/api/users/perfil`: Ruta protegida que muestra el perfil del usuario.
-   `/api/users/login`: Ruta que muestra la página de inicio de sesión.
-   `/api/users/register`: Ruta que muestra la página de registro.
-   `/api/events`: Ruta protegida que muestra la galería de eventos.
-   `/api/donations`: Ruta protegida que muestra la página de donaciones.
-   `/api/donations` (POST): Ruta protegida para procesar donaciones.
-   `/api/events/all`: Ruta protegida que devuelve todos los eventos.
-   `/api/events/all` (POST): Ruta protegida para añadir un nuevo evento.
-   `/api/users/logout`: Ruta para cerrar sesión.
-   `/api/users/register` (POST): Ruta para registrar un nuevo usuario.
-   `/api/users/login` (POST): Ruta para iniciar sesión.
-   `/api/users/:userid` (PUT): Ruta protegida para actualizar los datos del usuario.

## Envío de correos usando NodeMailer

En esta sección, estoy utilizando el paquete `nodemailer` para enviar correos electrónicos. Primero, importo la función `createTransport` del módulo `nodemailer`. Luego, defino una función llamada `sendMailer` que acepta dos parámetros: `correo` (la dirección de correo electrónico del destinatario) y `mensaje` (el contenido del correo electrónico).

Dentro de la función `sendMailer`, creo un objeto `transporter` utilizando la función `createTransport`. Este objeto se configura con las opciones de servicio de correo electrónico, como el proveedor de correo (en este caso, "hotmail") y las credenciales de autenticación (dirección de correo electrónico y contraseña).

A continuación, creo un objeto `mailOptions` que contiene la información del correo electrónico, como la dirección de correo electrónico del remitente, la dirección de correo electrónico del destinatario, el asunto y el texto del mensaje.

Finalmente, llamo al método `sendMail` del objeto `transporter` para enviar el correo electrónico. Si hay algún error durante el envío, se muestra en la consola. De lo contrario, se muestra un mensaje indicando que el correo electrónico ha sido enviado exitosamente.

```javascript
// create mail options object
const mailOptions = {
    from: "examen-practica@hotmail.com",
    to: `${correo}`,
    subject: "Evento de Reforestacion",
    text: `${mensaje}`,
};

// send mail
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Correo enviado: " + info.response);
    }
});
```

## Licencia

ISC
