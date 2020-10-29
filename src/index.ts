//import envs
import * as dotenv from "dotenv"
dotenv.config({ path: "./../.env" })

import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser"
import * as compression from "compression";
import * as cors from "cors";
import * as morgan from "morgan";
import "dotenv/config";
import authRouter from "./routes/auth.routes";
import * as passport from "passport"
import * as session from "express-session"
const passportSetup = require('./passport/passport-setup')
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"

//connect typeORM MySQL
createConnection()
  .then(() => {
    console.log("Database is Connected :)");
  })
  .catch((error) => console.log(error));

const app = express();


app.set("port", process.env.PORT || 3000);
app.use(compression());

// body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser())
app.use(morgan("dev"));
app.use(
  cors({
    origin: [`${process.env.TEST_IP}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// session
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}))


// app.use(passport.use(new JwtStrategy(jw)))
app.use(passport.initialize())
app.use(passport.session())


//Routes
app.get("/", (req, res) => {
  res.render('home')
});
app.use('/auth', authRouter);

const server = app.listen(app.get("port"), () =>
  console.log(`Nuber App Listening on PORT ${app.get("port")}`)

);

export default app;
