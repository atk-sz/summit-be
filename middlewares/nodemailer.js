const { createTransport } = require('../config/nodemailer')


const sendMail = async (mailOptions, next) => {
    try {
        let info = await createTransport.sendMail(mailOptions)
        if (info)
            next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Could not send the mail" });
    }
};


exports.sendAnEmail = async (req, res, next) => {
    try {
        const { email, token } = req.body.values;
        let mailOptions = {
            to: email,
            subject: 'Summit ref: email verification',
            text: `Please click on the link to verify your email \n\n ${`http://localhost:3000/email/verify/${token}`}`
        };
        sendMail(mailOptions, next)
        res.json(true)
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Could not send the mail" });
    }
};

exports.rejectMessage = async (req, res, next) => {
    try {
        const { message, email } = req.body;
        var mailOptions = {
            to: email,
            subject: 'Summit ref: Profile Review',
            text: message
        };
        sendMail(mailOptions, next)

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Could not send the mail" });
    }
};

exports.approveMessage = async (req, res, next) => {
    try {
        const { email } = req.body;
        var mailOptions = {
            to: email,
            subject: 'Summit ref: Profile Review',
            text: 'Congratulation your profile has been approved by our team and will be available with on our services, \n\n Thank You'
        };
        sendMail(mailOptions, next)

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Could not send the mail" });
    }
};
