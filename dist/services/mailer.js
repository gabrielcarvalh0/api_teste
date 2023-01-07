"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require("nodemailer");
const { host, user, pass } = require('../config/mail.json');
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
        partialsDir: path_1.default.resolve('src/build_production/'),
        defaultLayout: false,
    },
    viewPath: path_1.default.resolve('src/build_production/'),
    extName: ".html",
}));
module.exports = transporter;
