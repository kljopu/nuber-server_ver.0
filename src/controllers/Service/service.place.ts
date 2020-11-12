import { User } from "../../entity/User"
import { Place } from "../../entity/Place"
import clearNullArgs from "../../utils/ClearNullargs"

// Post add new place
export const addNewPlace = async (req, res, next) => {
    const user: User = req.user
    const { name, lat, lng, address, isFavorite } = req.body.args
    const place: Place = await new Place()

    try {
        place.lat = lat
        place.lng = lng
        place.name = name
        place.address = address
        place.isFavorite = isFavorite
        place.user = user
        place.save().then(r => {
            console.log(r);
        })
        return res.status(200).json({
            "message": "OK",
        })
    } catch (error) {
        console.log(error.message)

        return res.status(500).json({
            "message": "INTERNAL SERVER ERROR"
        })
    }
}

// put edit place
export const editPlace = async (req, res) => {
    const user: User = req.user
    const args = req.body.args
    try {
        const place = await Place.findOne({ id: args.id })

        if (place) {
            if (place.userId === user.id) {
                const notNull = clearNullArgs(args)
                await Place.update({ id: args.id }, { ...notNull }).then(r => {
                    console.log(r);
                    return res.status(200).json({
                        "message": "OK",
                        "data": r
                    })
                })
            } else {
                return res.status(401).json({
                    "message": "UNAUTHORIZED"
                })
            }
        } else {
            return res.status(400).json({
                "message": "PLACE NOT FOUND"
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "message": "INTERNAL SERVER ERROR"
        })
    }
}

// delete place
export const deletePlace = async (req, res) => {
    const user: User = req.user
    const args = req.body.args

    try {
        const place = await Place.findOne({ id: args.id })
        if (place) {
            if (place.userId === user.id) {
                place.remove().then(r => {
                    console.log(r);
                })
                return res.status(200).json({
                    "message": "OK"
                })
            } else {
                return res.status(401).json({
                    "message": "UNAUTHORIZED"
                })
            }
        } else {
            return res.status(400).json({
                "message": "PLACE NOT FOUND"
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "message": "INTERNAL SERVER ERROR"
        })
    }
}

// get all my places
export const getMyPlaces = async (req, res) => {
    const user: User = req.user

    try {
        // const place: Place = await Place.findOne({ userId: user.id })
        const places = user.places
        const puser = await User.findOne({ id: user.id }, { relations: ["places"] })
        console.log(puser.places);
        if (puser.places) {
            return res.status(200).json({
                "message": "OK",
                "place": puser.places
            })
        } else {
            return res.status(202).json({
                "message": "NULL"
            })
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "message": "INTERNAL SERVER ERROR"
        })
    }
}