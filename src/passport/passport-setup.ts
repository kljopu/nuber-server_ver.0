import { Request, Response, response } from "express"
import * as passport from "passport"
import * as LocalStrategy from "passport-local"
import * as KakaoStrategy from "passport-kakao"
import { getConnection, getRepository } from "typeorm"
import * as bcrypt from "bcrypt"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import JWT from "jsonwebtoken"
import { User } from "../entity/User"

const salt_rounds = process.env.SALTROUNDS

// mysql이라 구조상 이렇게 import User from '../entity/User'은 왜 안되지?
// const User = require('../entity/User')

// const userFound = User.findOne({ email: kkkk});

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    const user = await User.findOne({ email: email })
    done(null, user)
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
const verifyUser = async (payload, done) => {
    console.log("payload: ", payload);
    try {
    } catch (error) {

    }
}

// const User = User

passport.use('kakao',
    new KakaoStrategy.Strategy({
        //options for the strategy
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACKURL

    }, (async (accessToken, refreshToken, profile, done, req: Request, res: Response,) => {
        // passport callback function

        try {
            const userFound = await User.findOne({ email: profile._json.kakao_account.email });

            if (userFound) {
                console.log('user is already exists');
                done(null, userFound)
            } else {
                console.log('user not found');
                const newuser = new User()
                newuser.email = profile._json.kakao_account.email
                newuser.verifiedEmail = true
                newuser.firstName = profile.username
                newuser.kakaoId = profile.id
                newuser.isSocial = true
                newuser.profilePhoto = profile._json.properties.profile_image
                newuser.save()
                console.log('user saved');
                passport.serializeUser((newuser, done) => {
                    done(null, newuser)
                })

            }

        } catch (error) {
            console.log("error!!!!", error);
            done(error)
        }
    })))

passport.use("local-signIn",
    new LocalStrategy.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                console.log("user exists");
                const veriPass = bcrypt.compare(password, user.password, (error, info) => {
                    if (info) {
                        return done(null, user)
                    } else {
                        return done(null, false, { "message": "INVAILED PASSWORD" })
                    }
                })

            } else {
                console.log("user does not exist");
                return done(null, false)
            }

        } catch (error) {
            console.log("error!!!!: ", error);

        }
    }))

passport.use("local-signUp",
    new LocalStrategy.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done, res: Response) => {
        try {
            console.log("body:  ", req.body);
            const user = await User.findOne({ email: req.body.email })
            console.log(user);

            if (user) {
                // sign up fails 
                console.log("user exists");
                done(null, false)
            } else {
                // create new user
                const newUser = new User()
                newUser.email = req.body.email
                newUser.password = req.body.password
                newUser.firstName = req.body.firstName
                newUser.lastName = req.body.lastName
                await newUser.save()
                console.log("saved");
                done(null, newUser)
            }

        } catch (error) {
            console.log(error);
            return done(null, error)
        }
    }))

passport.use(new JwtStrategy(jwtOptions, verifyUser))
passport.initialize()
