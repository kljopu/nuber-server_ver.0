import { User } from "../../entity/User"
import clearNullArgs from "../../utils/ClearNullargs"

// Post Toggle to Driving mode
export const toggleToDriving = async (req, res, next) => {
    const driver = req.user

    try {
        if (driver.verifiedPhoneNumber !== false) {
            // toggle on / off
            const toggle: boolean = driver.isDriving == true ? driver.isDriving = false : driver.isDriving = true
            driver.save().then(r => {
                console.log(r);
            })
            return res.status(200).json({
                "message": `TOGGLE ${toggle}`,
            })
        } else {
            return res.status(401).json({
                "message": "UNAUTHORIZED USER"
            })
        }
    } catch (error) {
        return res.status(500).json({
            "message": "INTERNAL ERROR",
            "error": error.message
        })
    }
}

// post report location
export const ReportMovement = async (req, res) => {
    const user: User = req.user
    const notNull = clearNullArgs(req.body.args)
    try {
        console.log(notNull);
        await User.update({ id: user.id }, { ...notNull }).then(r => {
            console.log(r);
        })

        return res.status(200).json({
            "message": "REPORT LOCATION",
            "location": notNull
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "message": "INTERNAL SERVER ERROR"
        })
    }
}