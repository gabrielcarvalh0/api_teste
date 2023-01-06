import path, { resolve } from "path";

const hbs = require('nodemailer-express-handlebars');
const nodemailer = require("nodemailer");
const {host, user, pass} = require('../config/mail.json');

const transporter = nodemailer.createTransport({
        service: host,
      auth: {
        user: user,
        pass: pass,
      },
});

transporter.use('compile', hbs({
  viewEngine: {
    extName: ".html",
    partialsDir: path.resolve('src/build_production/'),
    defaultLayout: false,
},
viewPath: path.resolve('src/build_production/'),
extName: ".html",
}))



module.exports = transporter
