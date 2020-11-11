import { User } from "../entity/User"
import { Between, getConnection } from "typeorm"


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
            // toggle on
            getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    isDriving: true
                }).where({ id: driver.id }).execute().then(r => {
                    console.log(r);
                })
            return res.status(200).json({
                "message": "TOGGLE ON",
            })
        } else {
            return res.status(401).json({
                "message": "UNAUTHORIZED USER"
            })
        }
    } catch (error) {
        return res.status(500).json({
            "message": "INTERNAL ERROR",
            "error": error
        })
    }
}