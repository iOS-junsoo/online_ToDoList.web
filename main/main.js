let read_Todo_Title = [];
let read_Todo_Content = [];
let send_Todo_Title = [];
let send_Todo_Content = [];
let titleArrayToJson;
let contentArrayToJson;

// 브라우저 준비완료시 작동하는 코드
window.onload = function() { 

    if (localStorage.getItem('todo_title') == null || localStorage.getItem('todo_content') == null) {
        var emptyTodo = `<p style="text-align: center; color: white; font-size: 20px">할 일 목록을 작성해주세요.</p>`
        $('#list_Area').append(emptyTodo);
        $('#all_Complete').css('display', 'none');
    } else {
        $('#list_Area').html('');
        read_Todo_Title = JSON.parse(localStorage.getItem('todo_title'));
        read_Todo_Content = JSON.parse(localStorage.getItem('todo_content'));

        for (i = 0 ; i < read_Todo_Title.length ; i++) {
            var newToDo = `<div class="list">
            <input type="checkbox" id="check_box" name="check_box"/>
            <span class="list_title">${read_Todo_Title[i]}</span>
            <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
            </div>`
            $('#list_Area').append(newToDo);
            send_Todo_Title.push(read_Todo_Title[i]);
            send_Todo_Content.push(read_Todo_Content[i]);
        }
        $('#all_Complete').css('display', 'inline');
    } 
     
}

// 할 일 목록 추가 버튼

$('#add').click(function(){
    $('.add_Area').css('display', 'block');
})

$('#add_Btn').click(function(){
    if (localStorage.getItem('todo_title') == null) {
        $('#list_Area').html('');
    }

    $('.add_Area').css('display', 'none');

    var newToDo = `<div class="list">
    <input type="checkbox" id="check_box" name="check_box"/>
    <span id="list_title">${$('#ToDo_title').val()}</span>
    <button id="delete"><i class="fa-regular fa-trash-can"></i></button>
    </div>`
    $('#list_Area').append(newToDo);

    send_Todo_Title.push($('#ToDo_title').val());
    send_Todo_Content.push($('#ToDo_content').val());

    titleArrayToJson = JSON.stringify(send_Todo_Title);
    contentArrayToJson = JSON.stringify(send_Todo_Content);

    localStorage.setItem('todo_title', titleArrayToJson);
    localStorage.setItem('todo_content', contentArrayToJson);
    
    
})

$('#close_Btn').click(function(){
    $('.add_Area').css('display', 'none');
});


$('.list').click(function(){
    $('#list_Area').html('');
    $('#add').css('display', 'none');
    $('#all_Complete').css('display', 'none');
    $('#title').css('padding', '0px');
    $('#title').html('html 공부하기')
    $('#content_Area').html('html 공부하기')
});


// title 클릭 시 화면 html 변경
$('#list_Area').click(function(e){

    var indexTodo = read_Todo_Title.indexOf(`${e.target.textContent}`);
    
    for (i = 0; i < $('.list_title').length; i++) {
        if (e.target == document.getElementsByClassName('list_title')[i]) {
            $('#list_Area').html('');
            $('#add').css('display', 'none');
            $('#all_Complete').css('display', 'none');
            $('#title').css('padding', '0px');
            $('#title').html(`${e.target.textContent}`)
            $('#content_Area').html(`${read_Todo_Content[indexTodo]}`)
        }
    }
    
});

$('#list_Area').click(function(e){
    console.log(e.target, document.getElementById('check_box'));
    
});

// $('input[id=checkbox]').click(function(){
    
    
// })

// $('input[name=check_box]').click(function(){

//     console.log(1111);
    
// });