import { Router } from "express"
import jwtChecker from "../controllers/User/user.jwtVerification"
import { getNearByDriver, toggleToDriving, ReportMovement } from "../controllers/Service/service"
import { addNewPlace } from "../controllers/Service/service.place"

const serviceRouter = Router()

// GET Nearby Drivers
serviceRouter.get("/getNearbyDriver", jwtChecker, getNearByDriver)

// POST Toggle to Driving Mode
serviceRouter.post("/toggleDriving", jwtChecker, toggleToDriving)

// POST Report location
serviceRouter.post("/reportlocation", jwtChecker, ReportMovement)

// POST add new place
serviceRouter.post("/place", jwtChecker, addNewPlace)

export default serviceRouter