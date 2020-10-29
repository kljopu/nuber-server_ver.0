import * as express from "express"
// import { connection } from "../index"
import * as passport from "passport"
import * as KakaoStrategy from "passport-kakao"
import * as passportSetup from "../passport/passport-setup"
import { JWT } from "jsonwebtoken"
import * as passportLocal from "passport-local"
// import localSignUp from "../controllers/localSignUp"
const localSignUp = require('../controllers/localSignUp')


const authRouter = express.Router()
// const LocalStrategy = passportLocal.Strategy

// passport.use(
//     new LocalStrategy({usernameField: "email"}, (email, password, done) => {
//         User.findOne({email: email})
//     })
// )

//auth login
// authRouter.get('/login', (req, res) => {
//     res.send('login')
// })

//auth logout
authRouter.get('/logout', (req, res) => {
    //handle with passport
    res.send('Logging out')
    console.log('Logging Out');
})

//auth with kakao
authRouter.get('/kakao', passport.authenticate("kakao"))

// (req, res) => {
//     //handle with passport
//     res.send('login with google')
//     console.log('login with google');
// }

authRouter.get('/kakao/callback', passport.authenticate('kakao'), (req, res) => {
    res.send('you reaced the callback URI')
})

// authRouter.post(
//     "/signup", function (req, res) {
//         passport.authenticate('local-signUp', function (err, user, info) {
//             if (err) {
//                 res.status(404).json(err);
//                 return;
//             }

//             if (user) {
//                 console.log("in if");

//                 const token = user.generateJwt();
//                 res.status(200);
//                 res.json({
//                     userInfo: user,
//                     token: token
//                 });
//             } else {
//                 res.status(401).json(info);
//             }
//         })
//     })

authRouter.post('/sign-up', function (req, res, next) {
    passport.authenticate('local-signUp', { session: false }, (err, user, info) => {
        // error send
        if (err) {
            return res.status(400).json({
                message: err
            });
        }
        else if (!user) {
            // login fails -> redirect
            res.status(406).json({ "massage": "USER ALREADY SIGNED UP" })
        }

        //sign-up succeed, jwt deploy

        res.status(200).json({
            "message": "login secceed",
            "user": user
        })
    })(req, res);
});


export default authRouter