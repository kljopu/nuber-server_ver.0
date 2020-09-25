"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
//Express server connection
var server = index_1.default.listen(index_1.default.get("port"), function () {
    return console.log("Nuber App Listening on PORT " + index_1.default.get("port"));
});
exports.default = server;
//# sourceMappingURL=server.js.map