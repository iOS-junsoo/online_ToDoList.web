let read_Todo_Title = [];
let read_Todo_Content = [];
let send_Todo_Title = [];
let send_Todo_Content = [];
let titleArrayToJson;
let contentArrayToJson;

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
            <span id="list_title">${read_Todo_Title[i]}</span>
            <button id="delete"><i class="fa-regular fa-trash-can"></i></button>
            </div>`
            $('#list_Area').append(newToDo);
            send_Todo_Title.push(read_Todo_Title[i]);
            send_Todo_Content.push(read_Todo_Content[i]);
        }
        $('#all_Complete').css('display', 'inline');
    } 
     
}

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
})


$('.list').click(function(){
    $('#list_Area').html('');
    $('#add').css('display', 'none');
    $('#all_Complete').css('display', 'none');
    $('#title').css('padding', '0px');
    $('#title').html('html 공부하기')

    $('#content_Area').html('html 공부하기')
})