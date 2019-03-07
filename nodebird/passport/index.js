const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {

    //req.session객체에 어떤 데이터를 저장힐지 선택
    //매개변수로 user를 받아 , done 함수에 두번째 인자로 user.id를 넘긴다.
    //done 함수의 첫번째 인자는 에러 발생시 사용한다.
    //세션의 용량이 커지고 데이터 일관성에 문제가 발생하므로 사용자의 아이디만 저장하라고 명령
    passport.serializeUser((user,done) => {
        done(null,user.id);
    });

    //session() 미들웨어가 호출
    //세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회
    //조회한 정보를 req.user 에 저장함
    passport.deserializeUser((id,done) => {
        User.find({where:{id}})
            .then(user => done(null,user))
            .catch(err => done(err));
    });

    //위와 같이 함으로써 세션에는 아이디값만 저장하고 불필요한것들은 조회하여 req.user에 저장

    local(passport);
    kakao(passport);
}

/*
로그인 과정
1. 로그인요청
2. passport.authenticate() 호출
3. 로그인 전략 수행
4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
5.req.login 메서드가 passport.serializeUser() 호출
6. req.session 에 사용자 아이다만 저장
7. 로그인 완료
*/

//localStrategy 로컬로그인
//kakaoStrategy 카카오 로그인

//strategy 전략
