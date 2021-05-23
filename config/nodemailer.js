const nodemailer = require('nodemailer')

exports.createTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        // user: 'deaps9525@gmail.com',
        user: 'syed.zaid98@gmail.com',
        clientId: process.env.NODEMAIL_CLIENTID1,
        clientSecret: process.env.NODEMAIL_CLIENTSECRET1,
        refreshToken: process.env.NODEMAIL_REFRESHTOKEN1,
        accessToken: process.env.NODEMAIL_ACCESSTOKEN1
    }
});