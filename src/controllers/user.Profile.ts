import { User } from "../entity/User"
import { getConnection, Db } from "typeorm"
import * as AWS from "aws-sdk"
import * as multer from "multer"
import * as multerS3 from "multer-s3"

// aws s3 setting
export const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEYID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/Users/user/dev")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
export const upload = multer({
    storage: storage
})

// export const multer_s3 = multerS3({
//     // s3: s3,

// })

// GET user Profile
export const getUserProfile = async (req, res) => {
    const user = req.user
    try {
        if (!user) {
            return res.status(400).json({ "message": "USER IS NOT FOUND" })
        }
        const data = {
            "id": user.id,
            "email": user.email,
            "verifiedEmail": user.verifiedEmail,
            "verifiedPhoneNumber": user.verifiedPhoneNumber,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "age": user.age,
            "profilePhoto": user.profilePhoto,
        }
        return res.status(200).json({
            "data": data
        })
    } catch (error) {
        return res.status(500).json({
            "message": "SERVER ERROR",
            "error": error
        })
    }
}

// UPDATE user Profile
export const updateUserProfile = async (req, res) => {
    const user = req.user
    const { lastName, age, phoneNumber, email, profilePhoto, } = req.body
    /* 고려사항
        1. email이 바뀌었는가 -> verification 다시
        2. phone Number가 바뀌었는가 -> verification 다시
        3. profile photo가 바뀌었는가 -> S3 기존 파일 삭제 -> 새로운 파일 저장 (파일 규칙 설정)
            req.file이 있거나 user.profilePhoto와 다르다면 새로 업로드 하는것으로 간주

    */
    try {
        console.log("body:", req.body);
        if (req.body === null) {
            return res.status(400).json({ "message": "MISSING INPUT" })
        }
        if (email == null) {
            return res.status(400).json({ "message": "MISSING EMAIL INPUT" })
        }
        getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                lastName: lastName,
                age: age,
                phoneNumber: phoneNumber,
                email: email,
                profilePhoto: profilePhoto
            })
            .where({ id: user.id }).execute()

        console.log({ "UPDATED USER": user });
        return res.status(200).json({
            "message": "UPDATE SUCCEED"
        })

    } catch (error) {
        console.log("user update error: ", error);
        return res.status(500).json({
            "message": "SERVER ERROR",
        })
    }
}

export const bodyChecker = (req, res) => {
    const body = req.body
    const file = req.file
    console.log("body:  ", body);
    console.log("file: ", file);
    return res.json("done")
}
export default upload