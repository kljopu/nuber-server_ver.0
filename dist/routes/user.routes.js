"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get("/users");
router.get("/users/:id");
router.post("/users");
router.put("/users");
router.delete("/users/:id");
exports.default = router;
//# sourceMappingURL=user.routes.js.map