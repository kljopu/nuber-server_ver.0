import * as JWT from "jsonwebtoken"
import { User } from "../entity/User"


const jwtChecker = (req, res, next) => {
    console.log(req.headers.authorization);

    try {
        /*
        const token = req.headers.authorization;
        const p = new Promise(
            (resolve, reject) => {
                JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) reject(err)
                    resolve(decoded)
                })
            }
        )

        // if token is valid, it will respond with its info
        const respond = (token) => {
            // res.json({
            //     success: true,
            //     info: token
            // })
            const user = User.findOne(token.id)
            console.log(user);
            return user

        }

        // if it has failed to verify, it will return an error message
        const onError = (error) => {
            res.status(403).json({
                success: false,
                message: error.message
            })
        }

        // process the promise
        p.then(respond).catch(onError)
        */
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const decoded = JWT.verify(token, process.env.JWT_SECRET)

            console.log(decoded);
            const user = User.findOne(decoded.id).then((user) => {
                req.user = user
                next()
            }).catch((err) => {
                console.log(err);
                return res.status(401).json("INVALID TOKEN")
            })
            // const user = User.findOne({ email: decoded.email })
            // if (user) {
            // return done(true, { "user": user.email })
            // }
            // return done(false, { "message": "VERIFICATION FAILS" })

        } else {
            // header doesnt have token
            res.status(401).json({ "message": "MISSING TOKEN" })
        }

    } catch (error) {
        console.log("error: ", error);
        return (error)
    }
}

export default jwtChecker