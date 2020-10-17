import * as passport from "passport"
import * as KakaoStrategy from "passport-kakao"
import { User } from "src/entity/User"
import ".dotconfig"

passport.user(
    new KakaoStrategy({
        //options for the strategy

    }), (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //all info in profile
        User.find(..., (err, user) => {
            if
        })

    }
)