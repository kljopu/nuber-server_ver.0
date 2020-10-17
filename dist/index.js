"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var cors = require("cors");
var morgan = require("morgan");
require("dotenv/config");
var auth_routes_1 = require("./routes/auth.routes");
//Import Routes
//connect typeORM MySQL
typeorm_1.createConnection()
    .then(function () {
    console.log("Database is Connected :)");
})
    .catch(function (error) { return console.log(error); });
var app = express();
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(morgan("dev"));
app.use(cors({
    origin: ["" + process.env.TEST_IP],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// set up routes
//Routes
app.get("/", function (req, res) {
    res.render('home');
});
app.use('/auth', auth_routes_1.default);
// const server = app.listen(app.get("port"), () =>
//   console.log(`Nuber App Listening on PORT ${app.get("port")}`)
// );
// app.use(passport.initilaize())
// app.use(passport.session())
exports.default = app;
//# sourceMappingURL=index.js.map