import { Request } from "express";

const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

interface FileProps {
  key: string,
name: string,
size: string,
originalname: string,
mimetype: string
}


const storageTypes = {
  local: multer.diskStorage({
    destination: (req:any, file: any, cb:any) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req:any, file:FileProps, cb:any) => {
      crypto.randomBytes(16, (err:any, hash:any) => {
        if (err) cb(err);
   const nomeConvert = file.originalname
        file.key = `${hash.toString("hex")}-${nomeConvert.replace(/\s/g, '')}`;

        cb(null, file.key);
      });
    }
  })

};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes.local,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter:  (req: Request, file: FileProps, cb:any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};
