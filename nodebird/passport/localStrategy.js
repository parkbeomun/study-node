//로그인전략
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {User} = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email', //req.body.email
        passwordField: 'password' //req.body.password
    }, async (email,password,done) => {
        try{
            //db에 일치하는 eamil 이 있는지 확인
            const exUser = await User.find({
                where: {email}
            })
            //email 이 있다면 bcrypt 의 compare 함수로 비밀번호 비교
            if(exUser){
                const result = await bcrypt.compare(password,exUser.password);
                //비밀번호가 일치한다면 done 의 두번째 인자로 사용자 정보를 넘김
                if(result){
                    done(null,exUser);
                }else{
                    done(null,false,{ message: '비밀번호가 일치하지 않습니다.' })
                }
            }else{
                done(null,false,{ message: '가입되지 않은 회원입니다.'})
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};

