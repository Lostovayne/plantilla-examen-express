import { createTransport } from "nodemailer";

export const sendMailer = (correo, mensaje) => {
    console.log(correo);
    // create transporter object
    const transporter = createTransport({
        service: "hotmail",
        auth: {
            user: "examen-practica@hotmail.com",
            pass: "nemos5123",
        },
    });

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
};
