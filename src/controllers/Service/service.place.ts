import { User } from "../../entity/User"
import { Place } from "../../entity/Place"

// Post add new place
export const addNewPlace = async (req, res, next) => {
    const user: User = req.user
    const { name, lat, lng, address, isFavorite } = req.body.args
    const place: Place = await new Place()
    try {
        const notNull = req.body.args
        // await Place.create({ ...args, user: user })
        // .then(r => {
        //     console.log(r);
        // })
        place.lat = lat
        place.lng = lng
        place.name = name
        place.address = address
        place.isFavorite = isFavorite
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
