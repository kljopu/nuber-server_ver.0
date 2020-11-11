import { User } from "../entity/User"
import { getConnection } from "typeorm"
import { NCPClient } from 'node-sens'



/*
export const sendSMS = async (req, res) => {
    const user = req.user

    const user_phone_number = user.phoneNumber;
    const user_auth_number = user.phonelVerificationCode;
    var resultCode = 404;

    const date = Date.now().toString();
    const uri = process.env.NAVER_SERVICE_ID;
    const secretKey = process.env.NAVER_SECRET_KEY;
    const accessKey = process.env.NAVER_ACCESS_KEY;
    const method = 'POST';
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request({
        method: method,
        json: true,
        uri: url,
        headers: {
            'Contenc-type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-timestamp': date,
            'x-ncp-apigw-signature-v2': signature
        },
        body: {
            'type': 'SMS',
            'countryCode': '82',
            'from': process.env.ADMIN_PHONENUMBER,
            'content': `WEIVER 인증번호 ${user_auth_number} 입니다.`,
            'messages': [
                {
                    'to': `${user_phone_number}`
                }
            ]
        }
    }, function (err, res, html) {
        if (err) console.log(err);
        else {
            resultCode = 200;
            console.log(html);
        }
    });

    return res.status(200).json({
        'code': resultCode,
        "message": "SMS SENT"
    })
}
*/
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