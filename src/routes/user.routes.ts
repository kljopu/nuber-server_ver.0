import { Router } from "express";
import jwtChecker from "../controllers/user.jwtVerification"
import mail from "../controllers/user.EmailSend"
import emailVerification from "../controllers/user.EmailVerification"


const userRouter = Router();

userRouter.get("/very", function (res, req) {
    jwtChecker
})
userRouter.post("/email", jwtChecker, mail);

userRouter.post("/email/check", emailVerification)

export default userRouter;
