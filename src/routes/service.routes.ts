import { Router } from "express"
import jwtChecker from "../controllers/User/user.jwtVerification"
import { getNearByDriver, toggleToDriving, ReportMovement } from "../controllers/Service/service"
import { addNewPlace, editPlace, deletePlace, getMyPlaces } from "../controllers/Service/service.place"

const serviceRouter = Router()

// GET Nearby Drivers
serviceRouter.get("/getNearbyDriver", jwtChecker, getNearByDriver)

// POST Toggle to Driving Mode
serviceRouter.post("/toggleDriving", jwtChecker, toggleToDriving)

// POST Report location
serviceRouter.post("/reportlocation", jwtChecker, ReportMovement)

// GET My Places
serviceRouter.get("/place", jwtChecker, getMyPlaces)

// POST add new place
serviceRouter.post("/place", jwtChecker, addNewPlace)

// Put edit Place
serviceRouter.put("/place", jwtChecker, editPlace)

// DELETE Place
serviceRouter.delete("/place", jwtChecker, deletePlace)

export default serviceRouter