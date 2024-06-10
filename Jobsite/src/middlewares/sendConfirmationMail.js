// importing nodemailer
import nodemailer from 'nodemailer';

export const sendConfirmationMail = async (req, res, next) => {
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'codingninjas2k16@gmail.com',
            pass: 'slwvvlczduktvhdj'
        }
    });
    try {
        const mailOptions = {
            from: 'codingninjas2k16@gmail.com',
            to: req.body.email,
            subject: 'Application confirmation mail from Hired team',
            text: 'Your application is successfully submitted',
            html: `<h3>Login to your Hired account for more details.</h3>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvt7R4AvWCqEykGIx9dcVvYpRH1YcfhbH6DQ&s">
            <p><b style="color:green;">Good luck with your job hunt!</b><p>`
        }
        await transpoter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
    next();
}