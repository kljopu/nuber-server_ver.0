import { Router } from "express";
import jwtChecker from "../controllers/user.jwtVerification"
import mail from "../controllers/user.EmailSend"
import emailVerification from "../controllers/user.EmailVerification"
import { updateUserProfile, getUserProfile, bodyChecker, upload } from "../controllers/user.Profile"
// import bodyChecker from "../controllers/user.Profile"

const userRouter = Router();

userRouter.get("/very", function (res, req) {
    jwtChecker
})

// verification
userRouter.post("/email", jwtChecker, mail);
userRouter.post("/email/check", emailVerification)

// profile
userRouter.get("/profile", jwtChecker, getUserProfile)
userRouter.put("/profile", jwtChecker, updateUserProfile)

userRouter.get("/test", upload.single('file'), (req, res, next) => {
    console.log(req.body);
    console.log(req.body.file);

})

export default userRouter;
