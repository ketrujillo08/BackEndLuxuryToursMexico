'use strict';
var express = require("express");
var app = express();
var nodemailer = require('nodemailer');
var fs = require('fs');
var handlebars = require("handlebars")

app.get('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "GET REQUEST SUCCESS"
    });
});

app.post('/', (req, res, next) => {
    var body = req.body;
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            name: 'mx50.hostgator.mx',
            host: 'mx50.hostgator.mx',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'no-replay@luxurytoursmexico.com', // generated ethereal user
                pass: 'uTb2ZPq8}GF&' // generated ethereal password
            }
        });
        readHTMLFile('./assets/templates/gracias.html', (err, html) => {
            var template = handlebars.compile(html);
            var replacements = {
                name: "John Doe"
            };
            var htmlToSend = template(replacements);
            let mailOptions = {
                from: '"Luxury Tours Mexico" <no-replay@luxurytoursmexico.com>', // sender address
                to: 'ketrujillo08@gmail.com,ktrujillo@nanodepot.mx', // list of receivers
                subject: 'Pruea de Correos Server Node', // Subject line
                html: htmlToSend // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Error al enviar correo",
                        error: error
                    });
                }
                console.log('Message sent: %s', info.messageId);
                return res.status(200).json({
                    success: true,
                    message: "Correo enviado con exito",
                    info: info
                });

            });
        });
        //Verificar configuración
        /*transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });*/

    });
});

var readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

module.exports = app;