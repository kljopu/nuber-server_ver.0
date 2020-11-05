import { User } from "../entity/User"
import { getConnection } from "typeorm"

const emailVerification = async (req, res) => {
    const token = req.query.token
    console.log(token);
    if (!token) {
        return res.status(403).json({ "message": "TOKEN IS MISSING" })
    }
    const user = await User.findOne({ emailVerificationCode: token })
    try {
        if (user) {
            getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ verifiedEmail: true })
                .where({ id: user.id })
            return res.status(200).json({ "message": "VERIFICATED" }).redirect("/")
        } else {
            return res.status(401).json({ "message": "INVALID USER" })
        }
    } catch (error) {
        return res.status(500).json({
            "message": "SERVER ERROR",
            "ERROR": error
        })
    }

}

export default emailVerification