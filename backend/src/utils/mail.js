import nodemailer from 'nodemailer';

export const SendMail = async (email, subject, tamplte) => {
    try {
         const config = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD,
        },
    });

    const options = {
        from : process.env.SENDER_EMAIL,
        to : email,
        subject : subject,
        html : tamplte,
    };

    await config.sendMail(options);
    return true;

    } catch (error) {
        return false;
    }
}

