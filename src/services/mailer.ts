import { Request, Response } from "express";
import path, { resolve } from "path";
import fs from "fs";
import Handlebars from "handlebars";
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
