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
//connect typeORM MongoDb
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
exports.default = app;
//# sourceMappingURL=index.js.map