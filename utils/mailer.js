const nodemailer = require('nodemailer');
const config = require('../config/environment/');

module.exports = {
    welcomeMail: function(req) {
        let mailText = "Welcome to TTS(Ticket Tracking System)";
        let transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: config.mailer.auth.user,
                pass: config.mailer.auth.pass
            }

        });
        
        //setup email data with unicode symbols
        let mailOptions = {
            from: '"TTS Team" <ttsprodeveloper@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: 'Welcome To TTS', // Subject line
            text: mailText, // plain text body
            html: `<h3>Welcome to TTS</h4>` // html body
        };

        //send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
}