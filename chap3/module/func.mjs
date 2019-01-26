//ES2015 모듈스타일
import {odd,even} from './var';

function checkOddOrEven(num){
    if( num % 2 ){
        return odd;
    }else{
        even;
    }
}

export default checkOddOrEven;