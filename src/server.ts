import app from "./index";

//Express server connection

const server = app.listen(app.get("port"), () =>
  console.log(`Nuber App Listening on PORT ${app.get("port")}`)
);

export default server;
