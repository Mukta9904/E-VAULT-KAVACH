import nodemailer from "nodemailer";
import { User }from "@/models/userModel";
import { randomUUID } from 'crypto'; // Import the randomUUID function

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const uuidToken = randomUUID(); // Generate a UUID
    const verify = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${uuidToken}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${uuidToken}
    </p>`;
    const forgot = `<p>Click <a href="${process.env.DOMAIN}/forgotpassword?token=${uuidToken}">here</a> to Change your password or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/forgotpassword?token=${uuidToken}
    </p>`;
 
    if(emailType === 'VERIFY'){
      await User.findByIdAndUpdate(userId, {$set: {verifyToken: uuidToken, verifyTokenExpiry: Date.now() + 3600000 }});
    }
    else if(emailType === 'RESET'){
      await User.findByIdAndUpdate(userId, {$set: {forgotToken: uuidToken, forgotTokenExpiry: Date.now() + 3600000 }});
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "07fe21067c30ac",
        pass: "cb0dbccc568954"
      }
    });

    const mailOptions = {
      from: "muktadaso68@gmail.com",
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your account" : "Change your password",
      html: `${emailType === "VERIFY" ? verify : forgot}`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(error.message);
  }
};
