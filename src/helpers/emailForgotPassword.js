import nodemailer from "nodemailer";


const emailForgotPassword = async (data) =>  {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const { email, name, token } = data;

  const info = await transporter.sendMail(
    {
      from: "APV - Administrador de Pacientes de Veterinaria",
      to: email,
      subject: "Reestablece tu password",
      text: "Reestablece tu password",
      html: `
        <p>Hola: ${name}, has solicitado reectablecer tu password.</p>

        <p>Sigue el siguiente enlace para generar un nuevo password:
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reestablecer Password</a>
        </p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `
    }
  )

  console.log("Message sent: %s", info.messageId);
}

export default emailForgotPassword;