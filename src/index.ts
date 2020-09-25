import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as morgan from "morgan";
import "dotenv/config";

//connect typeORM MongoDb
createConnection()
  .then(() => {
    console.log("Database is Connected :)");
  })
  .catch((error) => console.log(error));

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));
app.use(
  cors({
    origin: [`${process.env.TEST_IP}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

export default app;
