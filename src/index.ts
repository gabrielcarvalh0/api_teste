require('dotenv/config')
import express from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import routes from "./routes";

import cors from 'cors';

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

AppDataSource.initialize()
  .then(async () => {
    console.log(`serve is runinng`);

    const app = express();

    app.use(cors(corsOptions)) // Use this after the variable declaration
    app.use(express.json());

    app.use(routes);

    app.use(express.static('tmp/uploads/'));
    return app.listen(process.env.PORT || 3333);
  })
  .catch((error) => console.log(error));
