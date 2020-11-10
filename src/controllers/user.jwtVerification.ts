import * as JWT from "jsonwebtoken"
import { User } from "../entity/User"


const jwtChecker = (req, res, next) => {
    console.log(req.headers.authorization);

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const decoded = JWT.verify(token, process.env.JWT_SECRET)

            console.log(decoded);
            const user = User.findOne(decoded.userId).then((user) => {
                req.user = user
                next()
            }).catch((err) => {
                console.log(err);
                return res.status(401).json("INVALID TOKEN")
            })

        } else {
            res.status(401).json({ "message": "MISSING TOKEN" })
        }

    } catch (error) {
        console.log("error: ", error);
        return res.status(401).json("INVALID TOKEN")
    }
}

export default jwtChecker