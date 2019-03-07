//노드 7.6 부터 지원
//자바스크립트 스펙은 ES 2017

function findAndSaveUser(User){
    User.findAll({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({gender:'m'});
        })
        .then((user) => {
            //생략
        })
        .catch(err => {
            console.log(err);
        })
}


async function findAndSaveUser(Users)
{
    try{
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await User.findOne({gender:'m'});
        //생략

    }catch(error){
        console.error(error);
    }

}

//프로미스 앞에 await 을 붙임
//이제 함수는 해당 프로미스가 resolbe 될 때 가지 기다린뒤 다음 로직으로 넘어감
//await User.findOne({}) 이 resolve 될 때까지 기다린뒤
//user 변수를 초기화 한다.

//화살표 함수도 async 와 같이 사용할 수 있다.
const findAndSaveUser = async (Users) => {
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await User.findOne({gender:'m'});
        //생략
    }catch(err){
        console.log(err);
    }
}

//async/await 를 쓰면 promise.all 을 대체 가능
// 이것은 노드 10버전 부터 지원하는 ES2018 문법이다.
const promise1 = Promise.resolve('성공');
const promise2 = Promise.resolve('성공2');

(async () => {
    for await (promise of [promise1,promise2]) {
        console.log(promise);
    }
})

//promise.all 대신 for await of 문을 사용해서 프로미스를 반복한다.



