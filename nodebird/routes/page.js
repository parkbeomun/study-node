const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
//로그인, 회원가입, 파일업로드 등과 같은 기능을 수행할때 현재 로그인여부를 체크할대
//이렇게 현재 로그인상태를 확인할 수 있는 미들웨어를 사용하는 것이 깔끔하다.

const router = express.Router();

router.get('/profile', isLoggedIn ,(req,res) => {
    res.render('profile',{title:'내 정보 - NodeBird', user:null})
})

router.get('/join', isNotLoggedIn, (req,res) => {
    res.render('join',{
        title: '회원가입- NodeBird',
        user: null,
        joinError: req.flash('joinError'), //flash 는 1회성 메세지
    });
});

router.get('/', (req,res,next) => {
    res.render('main',{
        title: 'NodeBird',
        twits: [],
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

module.exports = router;
