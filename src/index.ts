//import envs
import * as dotenv from "dotenv"
dotenv.config({ path: "./../.env" })

import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as morgan from "morgan";
import authRoutes from "./routes/auth.routes"
import "dotenv/config";
import authRouter from "./routes/auth.routes";

//Import Routes

console.log(process.env.clientId);


//connect typeORM MySQL
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

// set up routes

//Routes
app.get("/", (req, res) => {
  res.render('home')
});
app.use('/auth', authRouter);

const server = app.listen(app.get("port"), () =>
  console.log(`Nuber App Listening on PORT ${app.get("port")}`)

);

// app.use(passport.initilaize())
// app.use(passport.session())


export default app;
