"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const fs = require('fs');
const googleapis_1 = require("googleapis");
const GOOGLE_API_FOLDER_ID = '12NQH3v8m_CHv3rrEwQzsPbRKYVUO_S3n';
async function uploadFile(name, mimetype, size, key, path, file) {
    try {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: './src/services/googledrive.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        });
        const driveService = googleapis_1.google.drive({
            version: 'v3',
            auth
        });
        const fileMetaData = {
            'name': name,
            'parents': [GOOGLE_API_FOLDER_ID]
        };
        const media = {
            mime: mimetype,
            body: fs.createReadStream(path)
        };
        const response = await driveService.files.create({
            requestBody: fileMetaData,
            media,
            fields: 'id'
        });
        return response.data.id;
    }
    catch (error) {
        console.log(error, 'erro criando arquivo');
    }
}
exports.uploadFile = uploadFile;
