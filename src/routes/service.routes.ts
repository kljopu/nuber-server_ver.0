import { Router } from "express"
import jwtChecker from "../controllers/user.jwtVerification"
import { getNearByDriver, toggleToDriving } from "../controllers/service"

const serviceRouter = Router()

// GET Nearby Drivers
serviceRouter.get("/getNearbyDriver", jwtChecker, getNearByDriver)

// POST Toggle to Driving Mode
serviceRouter.post("/toggleDriving", jwtChecker, toggleToDriving)

export default serviceRouter