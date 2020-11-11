import { Router } from "express"
import jwtChecker from "../controllers/user.jwtVerification"
import { getNearByDriver } from "../controllers/service"

const serviceRouter = Router()

serviceRouter.get("/getNearbyDriver", jwtChecker, getNearByDriver)

export default serviceRouter