//자바스크립트 노드에서는 주로 비동기 프로그래밍을 한다.
//특히 이벤트 주도 방식 때문에 콜백함수를 자주 사용한다.
//ES2015 부터는 자바스크립트와 노드 API 들이 콜백 대신 프로미스 기반으로 재구성됨
//악명 높은 콜백 헬을 극복했다는 평가

//규칙
//1. 프로미스 객체 생성

const condition = true; // true 면 resolve, false 면 reject
const promise = new Promise((resolve,reject) => {
    if(condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});

promise
.then((message) => {
    console.log(message);
})
.catch((error) => {
    console.error(error);
})