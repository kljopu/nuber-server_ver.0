import * as nodemailer from "nodemailer"

const mail = (req, res) => {
  const user = req.user
  const transporter = nodemailer.createTransport({
    // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
    service: 'gmail',
    // host를 gmail로 설정
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // Gmail 주소 입력, 'testmail@gmail.com'
      user: process.env.NODEMAILER_USER,
      // Gmail 패스워드 입력
      pass: process.env.NODEMAILER_PASS,
    },
  });

  try {
    const message = {
      from: `"Nuber " <${process.env.NODEMAILER_USER}>`,
      to: user.email,
      subject: 'Email Auth Number',
      html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
                <title>Document</title>
              </head>
              <body>
                <form
                  style="display: table; margin: 4rem auto;"
                  method="POST"
                  action="http://localhost:3000/user/email/check/?token=${user.emailVerificationCode}"
                >
                  <img
                    src="http://byeol.dothome.co.kr/img/fixo_ko2.png"
                    alt="logo"
                    width="90"
                    style="margin-bottom: 1rem;"
                  />
                  <div style="border: 1px solid #b3b3b3; width: 30rem; padding: 4rem 5rem;">
                    <h4
                      style="
                        font-size: 1.2rem;
                        color: #7903d4;
                        margin: 0;
                        font-weight: 900;
                      "
                    >
                      Corrector Certification
                    </h4>
                    <h2 style="font-size: 2.2rem; margin: 0 0 1rem;">
                      현직자 인증 확인
                    </h2>
                    <p style="font-size: 1rem; line-height: 1.5rem; margin: 2rem 0 2rem;">
                      <strong
                        >안녕하세요.
                        <strong style="color: #7903d4;">Nuber</strong>입니다.</strong
                      ><br /><br />
                      Nuber에 가입해 주셔서 감사합니다.<br /><br />
                      아래 버튼을 눌러 인증을 완료해주세요.<br />
                      인증 버튼을 누르시면 인증이 완료되며, Nuber 사이트로
                      연결됩니다.
                    </p>
                    <button
                      style="
                        display: inline-block;
                        text-decoration: none;
                        padding: 20px 30px;
                        border-radius: 14px;
                        border: none;
                        background: #7903d4;
                        box-shadow: 4px 4px 6px #a2a2a2;
                        color: #fff;
                        font-size: 16px;
                        cursor: pointer;
                      "
                      rel="noreferrer noopener"
                      target="_blank"
                      href="http://localhost:3000/user/email/check/?token=${user.emailVerificationCode}"
                    >
                      EMAIL 인증하기
                    </button>
                    <p
                      style="
                        font-size: 0.8rem;
                        color: #8e8e8e;
                        text-align: center;
                        border-top: 1px solid #b3b3b3;
                        padding-top: 2rem;
                        margin-top: 4rem;
                      "
                    >
                      대표번호:010-3725-7637 | EMAIL :
                      <a
                        href="mailto:${process.env.NODEMAILER_USER}"
                        style="
                          color: #8e8e8e;
                          text-decoration: none !important;
                          font-size: 0.8rem;
                        "
                        >${process.env.NODEMAILER_USER}</a
                      >
                    </p>
                  </div>
                </form>
              </body>
            </html>`
    }
    transporter.sendMail(message, (err) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        status: 'Success',
        code: 200,
        message: 'Sent Auth Email',
      });
    })

  } catch (error) {
    console.log(error);

    return error
  }
};

// mail().catch(console.error);
export default mail

