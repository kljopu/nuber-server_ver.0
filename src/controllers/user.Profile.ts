import { User } from "../entity/User"
import { getConnection, Db } from "typeorm"
import * as AWS from "aws-sdk"
import * as multer from "multer"
import * as path from "path"
import * as multerS3 from "multer-s3"

// aws s3 setting
export const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEYID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2'
})

export const s3_delete = (req, res, next) => {
    // 기존 profilePhto file S3에서 삭제
    const currentUser = req.user
    const inputfile = req.file
    console.log("file: ", inputfile);
    if (req.file.key !== "default-avatar.png") {
        S3.deleteObject({
            Bucket: process.env.BUCKETNAME,
            Key: "profilePhoto-2-1605017111984.png"
        }, function (err, data) {
            console.log("error: ", err);
            return res.status(500).json({
                "massage": "DELETE FAILED"
            })
        })
    }
    req.file = inputfile
    next()
}


export const multer_s3 =
    multer({
        storage: multerS3({
            s3: S3,
            acl: "public-read",
            bucket: "nuber-s3",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname })
            },
            key: function (req, file, cb) {
                // new profilePhoto S3 Upload
                const currentUser = req.user
                const extention = path.extname(file.originalname)
                const fileName = "profilePhoto-" + currentUser.id + "-" + (Date.now()).toString() + extention
                console.log({ fileName: fileName });
                // req.file = 
                cb(null, fileName)
            }
        })

    })

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
    console.log({ file: req.file });

    /* 고려사항
        1. email이 바뀌었는가 -> verification 다시
        2. phone Number가 바뀌었는가 -> verification 다시
        3. profile photo가 바뀌었는가 -> S3 기존 파일 삭제 -> 새로운 파일 저장 (파일 규칙 설정)
            req.file이 있거나 user.profilePhoto와 다르다면 새로 업로드 하는것으로 간주
        4. (수정) profilePhoto는 back단에서는 항상 업로드 front에서 기존 파일과 같은지 확인 후 request
    */
    try {
        if (req.body === null) {
            return res.status(400).json({ "message": "MISSING INPUT" })
        }

        if (req.file.key !== "default-avatar.png") {
            S3.deleteObject({
                Bucket: process.env.BUCKETNAME,
                Key: user.profilePhoto.split(".com/")[1]
            }, function (err, data) {
                console.log("delete error: ", err);
            })
        }

        console.log("file name from multer: ", req.file.key)
        const emailURL = process.env.S3_URL + req.file.key

        await user.email !== email ?
            (user.phoneNumber !== phoneNumber ?
                // email changed phone changed
                getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        lastName: lastName,
                        age: age,
                        phoneNumber: phoneNumber,
                        email: email,
                        profilePhoto: emailURL,
                        verifiedEmail: false,
                        verifiedPhoneNumber: false
                    }).where({ id: user.id }).execute()
                :
                // email changed phone unchanged
                getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        lastName: lastName,
                        age: age,
                        phoneNumber: phoneNumber,
                        email: email,
                        profilePhoto: emailURL,
                        verifiedEmail: false,
                    })
                    .where({ id: user.id }).execute()
            ) :
            (user.phoneNumber !== phoneNumber ?
                // email unchanged phone changed
                getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        lastName: lastName,
                        age: age,
                        phoneNumber: phoneNumber,
                        email: email,
                        profilePhoto: emailURL,
                        verifiedPhoneNumber: false
                    })
                    .where({ id: user.id }).execute()
                :
                //email unchanged phone unchanged
                getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        lastName: lastName,
                        age: age,
                        phoneNumber: phoneNumber,
                        email: email,
                        profilePhoto: emailURL,
                    })
                    .where({ id: user.id }).execute().then(r => {
                        console.log(r);
                    })
            )
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
