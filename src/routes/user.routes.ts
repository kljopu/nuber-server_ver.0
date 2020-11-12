import { Router } from "express"
import jwtChecker from "../controllers/User/user.jwtVerification"
import mail from "../controllers/User/user.EmailSend"
import emailVerification from "../controllers/User/user.EmailVerification"
import { sendSMS, phoneChecker } from "../controllers/User/user.PhoneVerification"
import { updateUserProfile, getUserProfile, multer_s3, s3_delete } from "../controllers/User/user.Profile"
import { Request } from "express"


interface MulterRequest extends Request {
    file: any;
}

const userRouter = Router();

userRouter.get("/very", function (res, req) {
    jwtChecker
})

// verification
userRouter.post("/email", jwtChecker, mail);
userRouter.post("/email/check", emailVerification, function (req, res) {
    //후에 프론트 메인으로 redirect
    res.redirect("/")
})
userRouter.get("/phone", jwtChecker, sendSMS)
userRouter.post("/phone/check", jwtChecker, phoneChecker)

// profile
const upload = multer_s3
userRouter.get("/profile", jwtChecker, getUserProfile)
userRouter.put("/profile", jwtChecker, upload.single("file"), updateUserProfile)

// image upload
userRouter.post("/upload", jwtChecker, upload.single('file'), function (req, res, next) {

})
// image delete
userRouter.post('/delete', s3_delete, (req, res) => {
    return res.status(200).json({
        "message": "DELETE OK",
    })
})

export default userRouter;
