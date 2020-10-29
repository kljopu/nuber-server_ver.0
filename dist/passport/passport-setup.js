"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var KakaoStrategy = require("passport-kakao");
var passport_jwt_1 = require("passport-jwt");
var User_1 = require("../entity/User");
// mysql이라 구조상 이렇게 import User from '../entity/User'은 왜 안되지?
// const User = require('../entity/User')
// const userFound = User.findOne({ email: kkkk});
var jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
var verifyUser = function (payload, done) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("payload: ", payload);
        try {
        }
        catch (error) {
        }
        return [2 /*return*/];
    });
}); };
// const User = User
passport.use('kakao', new KakaoStrategy.Strategy({
    //options for the strategy
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACKURL
}, (function (accessToken, refreshToken, profile, done, req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userFound, newuser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // passport callback function
                //all info in profile
                console.log(profile);
                console.log(profile._json.kakao_account.email, 'user email');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.User.findOne({ email: profile._json.kakao_account.email })];
            case 2:
                userFound = _a.sent();
                if (userFound) {
                    //jwt 토큰 발급
                    console.log(userFound);
                    console.log('user is already exists');
                    done(null, userFound);
                }
                else {
                    console.log('user not found');
                    newuser = new User_1.User();
                    newuser.email = profile._json.kakao_account.email;
                    newuser.verifiedEmail = true;
                    newuser.firstName = profile.username;
                    newuser.kakaoId = profile.id;
                    newuser.isSocial = true;
                    newuser.profilePhoto = profile._json.properties.profile_image;
                    newuser.save();
                    console.log('user saved');
                    //jwt token
                    // const generatedJWTToken = jwt.sign({
                    //     userId: user.id,
                    //     email: user.email
                    // }, process.env.JWT_SECRET,
                    //     {
                    //         expiresIn: '360m'
                    //     }
                    // )
                    // res.status(200).json({
                    //     token: generatedJWTToken,
                    //     userId: user.id,
                    //     isSocial: user.isSocial
                    // })
                    // return done(generatedJWTToken)
                    done(null, newuser);
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log("error!!!!", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })));
passport.use(new passport_jwt_1.Strategy(jwtOptions, verifyUser));
passport.initialize();
//# sourceMappingURL=passport-setup.js.map