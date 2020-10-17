"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
//Express server connection
// app.use('/auth', authRouter)
var server = index_1.default.listen(index_1.default.get("port"), function () {
    return console.log("Nuber App Listening on PORT " + index_1.default.get("port"));
});
console.log('is it used');
exports.default = server;
//# sourceMappingURL=server.js.map