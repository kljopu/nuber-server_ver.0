// import dotenv from "dotenv"
import app from "./index";
import authRouter from "./routes/auth.routes"
// dotenv.config()

//Express server connection


// app.use('/auth', authRouter)

const server = app.listen(app.get("port"), () =>
  console.log(`Nuber App Listening on PORT ${app.get("port")}`)
);

console.log('is it used');

// console.log(process.env.KaKaoIdentification)

export default server;
