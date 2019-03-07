const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID, //kakao에서 발급해주는 id 노출되지 말아야 하므로 process.env 사용
        callbackURL:'/auth/kakao/callback', //Kakao 로부터 인증결과를 받을 라우터주소
    }, async (accessToken,refreshToken,profile,done) => {
        try{

            const exUser = await User.find({
                where: { snsId: profile.id, provider:'kakao'}
            });
            if(exUser){
                console.log('exUser : '+exUser);
                done(null,exUser);
            }else{
                const newUser = await User.create({

                    email: profile.id, //예제에는 profile 에 이메일을 가져왔는데 없어졌나봄..
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null,newUser);
            }
        } catch(err){
            console.error(err);
            done(err);
        }
    }))
}