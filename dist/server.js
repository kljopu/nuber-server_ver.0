"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from "dotenv"
var index_1 = require("./index");
// dotenv.config()
//Express server connection
// app.use('/auth', authRouter)
var server = index_1.default.listen(index_1.default.get("port"), function () {
    return console.log("Nuber App Listening on PORT " + index_1.default.get("port"));
});
console.log('is it used');
// console.log(process.env.KaKaoIdentification)
exports.default = server;
//# sourceMappingURL=server.js.map