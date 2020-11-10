import { Router } from "express"
import jwtChecker from "../controllers/user.jwtVerification"
import mail from "../controllers/user.EmailSend"
import emailVerification from "../controllers/user.EmailVerification"
import { updateUserProfile, getUserProfile, multer_s3, s3_delete } from "../controllers/user.Profile"
// import s3_del from "../controllers/user.Profile"
import { Request } from "express"
import * as multer from "multer"


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
