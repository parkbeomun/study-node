//접근제한을 하는 미들웨어 구현

exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.statis(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
};


//로컬로그인이란 다른 SNS 서비스를 통해 로그인하지 않고, 자체적으로 회원가입 후 로그인하는 것을 의미
//즉 아이디/비밀번호 를 통해 로그인하는 것
//passport 에서 이를 구현하려면 passport-local 모듈이 필요함

