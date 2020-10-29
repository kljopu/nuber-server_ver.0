import { Request, Response } from "express"
import * as passport from "passport"
import * as LocalStrategy from "passport-local"
import { User } from "../entity/User"

const localSignUp = passport.use('local', new LocalStrategy.Strategy({ usernameField: 'email', passReqToCallback: true }, (async (req, email, password, done) => {
    try {
        const user = User.findOne({ email: req.body.email })
        if (user) {
            return done(null, false, { message: "user already exists" })
        } else {
            const newUser = new User()
            newUser.email = email
            newUser.password = password
            newUser.firstName = req.body.firstName
            newUser.lastName = req.body.lastName
            newUser.save()
            return done(null, newUser)
        }

    } catch (error) {
        console.log(error);

    }
    // return done(null, email)

    // return done(null, false, { message: "user creation fail." })
})))

export default localSignUp