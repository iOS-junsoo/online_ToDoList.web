let read_Todo_Title = [];
let read_Todo_Content = [];
let read_Check_List = [];
let send_Todo_Title = [];
let send_Todo_Content = [];
let send_Check_List = [];
let titleArrayToJson;
let contentArrayToJson;
var isChecked = [];

// 브라우저 준비완료시 작동하는 코드
window.onload = function() { 

    if (localStorage.getItem('todo_title') == null || localStorage.getItem('todo_content') == null || JSON.parse(localStorage.getItem('todo_title')).length === 0 || JSON.parse(localStorage.getItem('todo_content')).length === 0) {
        var emptyTodo = `<p style="text-align: center; color: white; font-size: 20px">할 일 목록을 작성해주세요.</p>`
        $('#list_Area').append(emptyTodo);
        $('#all_Complete').css('display', 'none');
    } else {
        $('#list_Area').html('');
        read_Todo_Title = JSON.parse(localStorage.getItem('todo_title'));
        read_Todo_Content = JSON.parse(localStorage.getItem('todo_content'));

        for (i = 0 ; i < read_Todo_Title.length ; i++) {
            var newToDo = `<div class="list">
            <input type="checkbox" class="check_box" name="check_box"/>
            <span class="list_title">${read_Todo_Title[i]}</span>
            <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
            </div>`
            $('#list_Area').append(newToDo);
            send_Todo_Title.push(read_Todo_Title[i]);
            send_Todo_Content.push(read_Todo_Content[i]);
        }
        $('#all_Complete').css('display', 'inline');
        for (i = 0; i < $('.list_title').length; i++) { 
            isChecked[i] = false;
            
        }
    } 
    
}

// 뒤로가기 버튼 클릭
$('footer').click(function(e){
    
    if (e.target == document.getElementById('back_Btn')) {
        $('#title').html('TO DO LIST');
        $('#content_Area').html('');
        $('#title').css('padding-left', '345px');
        $('#add').css('display', 'block');
        $('footer').html('');
        $('footer').append(`<button id="all_Complete" style="text-align: center;">모두 완료</button>`);
        for (i = 0; i < read_Todo_Title.length; i++) {
            var newToDo = `<div class="list">
                <input type="checkbox" class="check_box" name="check_box"/>
                <span class="list_title">${read_Todo_Title[i]}</span>
                <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
                </div>`
            $('#list_Area').append(newToDo);
            // send_Todo_Title.push(read_Todo_Title[i]);
            // send_Todo_Content.push(read_Todo_Content[i]);
        }
    }
})

// 할 일 목록 추가 버튼

$('#add').click(function(){
    $('.add_Area').css('display', 'block');
})

$('#add_Btn').click(function(){
    if (localStorage.getItem('todo_title') == null || JSON.parse(localStorage.getItem('todo_title')).length === 0) {
        $('#list_Area').html('');
    }

    $('.add_Area').css('display', 'none');

    var newToDo = `<div class="list">
    <input type="checkbox" class="check_box" name="check_box"/>
    <span class="list_title">${$('#ToDo_title').val()}</span>
    <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
    </div>`
    $('#list_Area').append(newToDo);

    send_Todo_Title.push($('#ToDo_title').val());
    send_Todo_Content.push($('#ToDo_content').val());

    titleArrayToJson = JSON.stringify(send_Todo_Title);
    contentArrayToJson = JSON.stringify(send_Todo_Content);

    localStorage.setItem('todo_title', titleArrayToJson);
    localStorage.setItem('todo_content', contentArrayToJson);
    
    location.reload()
    
})

$('#close_Btn').click(function(){
    $('.add_Area').css('display', 'none');
});







$('#list_Area').click(function(e){

    // console.log(isChecked);
    

    // title 클릭 시 화면 html 변경
    var indexTodo = read_Todo_Title.indexOf(`${e.target.textContent}`);
    
    
    for (i = 0; i < $('.list_title').length; i++) {
        if (e.target == document.getElementsByClassName('list_title')[i]) {
            $('#list_Area').html('');
            $('#add').css('display', 'none');
            $('footer').html('');
            $('footer').append(`<button id="back_Btn" style="text-align: center;">뒤로 가기</button>`);
            $('#title').css('padding', '0px');
            $('#title').html(`${e.target.textContent}`)
            $('#content_Area').html(`${read_Todo_Content[indexTodo]}`)
        }
    } 

    // 체크박스 
    for (i = 0; i < $('.list_title').length; i++) { 
        if (e.target == document.getElementsByClassName('check_box')[i]) {

            if (isChecked[i] == false) {
                e.target.nextElementSibling.style.textDecoration = "line-through";
                $('.check_box').eq(i).prop('checked',true);
                isChecked[i] = true;
            } else {
                e.target.nextElementSibling.style.textDecoration = "none";
                $('.check_box').eq(i).prop('checked',false);
                isChecked[i] = false;
            }

            
        }
    }


    var changedTitle = send_Todo_Title;
    var changedContent = send_Todo_Content;
    
    // 삭제
    for (i = 0; i < $('.list_title').length; i++) { 
        if (e.target == document.getElementsByClassName('fa-regular fa-trash-can')[i]) {

            if (send_Todo_Title.length < 2){
                var emptyTodo = `<p style="text-align: center; color: white; font-size: 20px">할 일 목록을 작성해주세요.</p>`
                $('#list_Area').append(emptyTodo);
                $('#all_Complete').css('display', 'none');
            } 

            let seletedTitle = e.target.parentElement.previousSibling.previousSibling.outerText;
            let indexTodo = changedTitle.indexOf(`${seletedTitle}`);

            changedTitle.splice(indexTodo, 1);
            changedContent.splice(indexTodo, 1);

            titleArrayToJson = JSON.stringify(changedTitle);
            contentArrayToJson = JSON.stringify(changedContent);
            
            localStorage.setItem('todo_title', titleArrayToJson);
            localStorage.setItem('todo_content', contentArrayToJson);

            $(e.target.parentNode.parentNode).remove();
                
                            
        }
    }
});

// 모두 완료 버튼

$('#all_Complete').click(function(){
    for (i = 0; i < $('.list_title').length; i++) { 
        $('.list_title').eq(i).css('textDecoration', 'line-through');
        $('.check_box').prop('checked',true)
        isChecked[i] = true;
    }

    //TODO: 체크여부 배열을 local storage에도 저장해서 새로고침해도 체크 된 것 표기하기.
})

