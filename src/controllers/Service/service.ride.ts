import { User } from "../../entity/User"
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
                lastLat: Between(lastLat - 0.03, lastLat + 0.03),
                lastLng: Between(lastLng - 0.03, lastLng + 0.03)
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
            "err": error.message
        })
    }
}