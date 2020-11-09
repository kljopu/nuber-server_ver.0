import { Router } from "express";
import * as fs from "fs"
import jwtChecker from "../controllers/user.jwtVerification"
import mail from "../controllers/user.EmailSend"
import emailVerification from "../controllers/user.EmailVerification"
import { updateUserProfile, getUserProfile, multer_s3 } from "../controllers/user.Profile"
// import bodyChecker from "../controllers/user.Profile"
import { Request } from "express"
// interface MulterRequest extends Request {
//     file: any;
// }
interface MulterRequest extends Request {
    file: any;
}

import * as multer from "multer"

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


const upload = multer_s3
userRouter.post("/test", upload.single('file'), function (req, res, next) {
    console.log(req.file);

})

export default userRouter;
