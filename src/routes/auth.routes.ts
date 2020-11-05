import * as express from "express"
import * as passport from "passport"
import * as KakaoStrategy from "passport-kakao"
import * as passportSetup from "../passport/passport-setup"
import * as JWT from "jsonwebtoken"
import * as passportLocal from "passport-local"

const localSignUp = require('../controllers/localSignUp')
const authRouter = express.Router()

// token generator
const generatedJWTToken = (user) => {
    const token = JWT.sign({
        userId: user.id,
        email: user.email
    }, process.env.JWT_SECRET,
        {
            expiresIn: '360m'
        }
    )
    return token
}

// auth login
authRouter.post('/login', function (req, res) {
    passport.authenticate('local-signIn', { session: false }, (err, user, jwt) => {
        console.log("is here?");
        if (err) {
            return res.status(400).json({
                "message": "INVALID REQUEST",
                "error": err
            })
        } else if (!user) {
            //password error
            return res.status(401).json({
                "message": "UNAUTHORIZED"
            })
        }
        // login succeed and jwt deploy
        console.log("user: ", user);
        const token = generatedJWTToken(user)
        console.log("token: ", token);

        const signInUserEmail = user.email
        return res.status(200).json({
            "message": `${signInUserEmail} LOGIN SUCCEED`,
            "token": token
        })
    })(req, res);
});

//auth logout
authRouter.get('/logout', (req, res) => {
    //handle with passport
    res.send('Logging out')
    console.log('Logging Out');

    // delete user info from session
})

//auth with kakao
authRouter.get('/kakao', passport.authenticate('kakao'))


authRouter.get('/kakao/callback', passport.authenticate('kakao'), function (req, res, next) {
    passport.authenticate("kakao", (err, user, info) => {
        if (err) {
            return res.status(400).json({
                message: err
            });
        }
        if (user) {
            const token = generatedJWTToken(user)
            return res.status(200).json({
                "message": "KAKAO LOGIN SUCCEED",
                "token": token
            })
        }
    })(req, res);
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
            return res.status(406).json({ "massage": "USER ALREADY SIGNED UP" })
        }

        //sign-up succeed,
        return res.status(200).json({
            "message": "SIGN-UP SUCCEED",
            "user": user
        })
    })(req, res);
});


export default authRouter