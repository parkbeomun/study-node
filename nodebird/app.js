const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport'); //로그인 관련



require('dotenv').config(); //해당 함수가 호출시 .env 파일의 내용을 process.env 에 넣는다. 따라서 .env 만 노출되지 않도록 하면된다.

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
//const sampleRouter = require('/routes/sample.js');
const { sequelize } = require('./models');
const passportConfig = require('./passport'); //로그인 관련

const app = express();
sequelize.sync();
passportConfig(passport); //로그인 관련

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.set('port',process.env.PORT||8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET)); //비밀키는 별도 관리 dotenv 모듈 사용
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret:process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use(flash());
app.use(passport.initialize()); //로그인 관련 req 객체에 passport 설정을 심는다.
app.use(passport.session()); //로그인 관련 req.session 객체에 passport 정보를 저장 ( express-sessioin 위에 )
app.use('/',pageRouter);
app.use('/auth',authRouter);
//app.use('/sample',sampleRouter);
app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err,req,res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env' === 'development' ? err : {})
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 대기 중');
})