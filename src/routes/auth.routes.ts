import * as express from "express"
// import { connection } from "../index"
import * as passport from "passport"
import * as KakaoStrategy from "passport-kakao"
import { JWT } from "jsonwebtoken"
import * as passportLocal from "passport-local"
import { User } from "src/entity/User"

const authRouter = express.Router()
// const LocalStrategy = passportLocal.Strategy

// passport.use(
//     new LocalStrategy({usernameField: "email"}, (email, password, done) => {
//         User.findOne({email: email})
//     })
// )

//auth login
authRouter.get('/login', (req, res) => {
    res.send('login')
    console.log("시발새끼들");

})

//auth logout
authRouter.get('/logout', (req, res) => {
    //handle with passport
    res.send('Logging out')
    console.log('Logging Out');
})

//auth with kakao
authRouter.get('/kakao', (req, res) => {
    //handle with passport
    res.send('login with google')
    console.log('login with google');
})

authRouter.post(
    "/login", passport.authenticate("local", {
        sucessRedirect: "/",
        failureRedirect: "/signUp",
        failureFlash: false
    })
)

export default authRouter