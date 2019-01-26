//사용자 이름을 눌렀을때 댓글 로딩
[].forEach.call(document.querySelectorAll(`#user-list tr`),(el)=>{
    el.addEventListener('click',()=>{
        var id = el.querySelector('td').textContent;
        console.log('id:'+id);
        getComment(id);
    });
});

//사용자로딩
function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if(xhr.status === 200) {
            var users = JSON.parse(xhr.responseText);
            console.log(users);
            var tbody = document.querySelector(`#user-list tbody`);
            tbody.innerHTML = '';
            users.map(function(user) {
                var row = document.createElement('tr'); //tr 추가
                row.addEventListener('click', function(){ //해당 하는 tr 클릭시
                    getComment(user.id); //해당하는 id 의 Comment 를 가져온다
                });
                //td 를 생성하며 row 에 입력한다.
                var td = document.createElement('td');
                td.textContent = user.id;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.name;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.age;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.married ? '기혼' : '미혼';
                row.appendChild(td);
                tbody.appendChild(row);
            });
        }else{
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET','/users');
    xhr.send();
}
//댓글로딩
function getComment(id) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200) {
            var comments = JSON.parse(xhr.responseText);
            var tbody = document.querySelector(`#comment-list tbody`);
            tbody.innerHTML = '';
            comments.map(function (comment){ //가져온 게시물 수만큼 loop
                var row = document.createElement('td');
                var td = document.createElement('td');
                td.textContent = comment.id;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = comment.user.name;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = comment.comment;
                row.appendChild(td);
                var edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', function(){ //수정 클릭 시
                    var newComment = prompt('바꿀 내용을 입력하세요');
                    if(!newComment){
                        return alert('내용을 반드시 입력하셔야 합니다');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.status === 200) {
                            console.log(xhr.responseText);
                            getComment(id);
                        }else{
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PATCH','/comments/'+comment.id);
                    xhr.setRequestHeader('Content-Type','application/json');
                    xhr.send(JSON.stringify({ comment: newComment}));
                });// end edit eventListener
                var remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click', function() { //삭제클릭시
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.status === 200) {
                            console.log(xhr.responseText);
                            getComment(id);
                        }else{
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE','/comments/'+comment.id);
                    xhr.send();
                }); //end remove event listener
                td = document.createElement('td');
                td.appendChild(edit);
                row.appendChild(td);
                td = document.createElement('td');
                td.appendChild(remove);
                row.appendChild(td);
                tbody.appendChild(row);
            });
        }else{
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET','/comments/'+id);
    xhr.send();
}// end getComment

//사용자 등록시
document.getElementById('user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = e.target.username.value;
    var age  = e.target.age.value;
    var married = e.target.married.checked;
    if(!name) {
        return alert('이름을 입력하세요');
    }
    if(!age) {
        return alert('나이를 입력하세요');
    }
    if( married )married = '1';
    if( !married )married = '0';

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 201){
            console.log(xhr.responseText);
            getUser();
        }else{
            console.error(xhr.responseText);
        }
    };
    xhr.open('POST','/users');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({ name, age, married}))
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
}); // end submit

//댓글 등록시
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var id = e.target.userid.value;
    var comment  = e.target.comment.value;
    if(!id){
        return alert('아이디를 입력하세요');
    }
    if(!comment){
        return alert('댓글을 입력하세요');
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status === 201){
            console.log(xhr.responseText);
            getComment(id);
        }else{
            console.error(xhr.responseText);
        }
    };
    console.log('댓글등록');
    xhr.open('POST','/comments');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({id,comment}));
    e.target.userid.value = '';
    e.target.comment.value = '';
});