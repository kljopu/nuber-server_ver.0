import { User } from "../../entity/User"
import { Between, getConnection } from "typeorm"
import clearNullArgs from "../../utils/ClearNullargs"


// GET Nearby Driver
export const getNearByDriver = async (req, res, next) => {
    const user = req.user
    const { lastLat, lastLng } = user

    try {
        const [drivers, count]: [User[], Number] = await User.findAndCount({
            select: ["email", "lastName", "firstName", "phoneNumber", "profilePhoto", "lastLat", "lastLng"],
            where: {
                isDriving: true,
                lastLat: Between(lastLat - 0.02, lastLat + 0.02),
                lastLng: Between(lastLng - 0.02, lastLng + 0.02)
            },
        })
        console.log({ drivers: drivers, count: count })

        return res.status(200).json({
            "message": "OK",
            "drivers": drivers,
            "count": count
        })

    } catch (error) {
        return res.status(500).json({
            "message": "INTERNAL ERROR",
            "err": error
        })
    }
}

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