const fs = require('fs');
import {google} from 'googleapis';


const GOOGLE_API_FOLDER_ID =  '12NQH3v8m_CHv3rrEwQzsPbRKYVUO_S3n';


export async function uploadFile(name: string, mimetype:string, size: string, key: string, path:string, file: any) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './src/services/googledrive.json',
      scopes: ['https://www.googleapis.com/auth/drive']
    });

    const driveService = google.drive({
      version: 'v3',
      auth
    });

    const fileMetaData = {
      'name': name,
      'parents': [GOOGLE_API_FOLDER_ID]
    }

    const media = {
      mime: mimetype,
      body: fs.createReadStream(path)
    }

    const response = await driveService.files.create({
      requestBody: fileMetaData,
      media,
      fields: 'id'
    })
    return response.data.id
  } catch (error) {
    console.log(error, 'erro criando arquivo')
  }
}
