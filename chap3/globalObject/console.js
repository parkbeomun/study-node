const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside:{
            key:'value'
        },
    },
}

console.time('전체시간');
console.log('평범한 로그입니다 쉼표로 구분해 여러값을 찍을수 있습니다');
console.log(string,number,boolean);
console.error('에러메세지는 console.error 에 담아주세요');

//객체표시
console.dir(obj,{colors: false, dept: 2});
console.dir(obj,{colors: true, dept: 1});
console.time('시간측정');

for( let i=0; i< 100000; i++){
    continue;
}
console.time('시간측정');

function b(){
    //에러위치 추적
    console.trace('에러 위치 추적');
}
function a(){
    b();
}

a();
console.timeEnd('전체시간');

