import { User } from "../../entity/User"
import { getConnection } from "typeorm"
import { NCPClient } from 'node-sens'

export const sendSMS = async (req, res) => {
    const user = req.user
    const ncp = new NCPClient({
        phoneNumber: process.env.ADMIN_PHONENUMBER,
        serviceId: process.env.NAVER_SERVICE_ID,
        secretKey: process.env.NAVER_SECRET_KEY,
        accessKey: process.env.NAVER_ACCESS_KEY
    })

    const { success, msg, status } = await ncp.sendSMS({
        to: user.phoneNumber,
        content: `[Nuber] 핸드폰 인증을 위해 본인 인증 번호 [${user.phonelVerificationCode}]를 입력해주세요.`,
        countryCode: '82',
    })
    if (success) {
        return res.status(200).json({
            "message": "SMS SENT"
        })
    } else {
        res.status(status).json({
            "message": "SMS SEND FAIL",
            "error": msg
        })
    }
}
export const phoneChecker = async (req, res, next) => {
    const user = req.user
    const { inputCode } = req.body
    console.log({ inputCode: inputCode, dbCode: user.phonelVerificationCode });

    try {
        if (user.phonelVerificationCode !== inputCode) {
            return res.status(400).json({
                "message": "VERIFICATION FAIL"
            })
        }
        getConnection().createQueryBuilder().update(User).set({
            verifiedPhoneNumber: true
        }).where({ id: user.id }).execute().then(r => { console.log(r); })

        return res.status(200).json({
            "message": "VERIFICATION SUCCEED"
        })
    } catch (error) {
        console.log({ error: error });

        return res.status(500).json({
            "message": "INTERNAL ERROR",
        })
    }
}