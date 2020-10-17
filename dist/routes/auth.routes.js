"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import { connection } from "../index"
var passport = require("passport");
var authRouter = express.Router();
// const LocalStrategy = passportLocal.Strategy
// passport.use(
//     new LocalStrategy({usernameField: "email"}, (email, password, done) => {
//         User.findOne({email: email})
//     })
// )
//auth login
authRouter.get('/login', function (req, res) {
    res.send('login');
    console.log("시발새끼들");
});
//auth logout
authRouter.get('/logout', function (req, res) {
    //handle with passport
    res.send('Logging out');
    console.log('Logging Out');
});
//auth with kakao
authRouter.get('/kakao', function (req, res) {
    //handle with passport
    res.send('login with google');
    console.log('login with google');
});
authRouter.post("/login", passport.authenticate("local", {
    sucessRedirect: "/",
    failureRedirect: "/signUp",
    failureFlash: false
}));
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map