// read : 읽어 온 데이터
// send : 보낼 데이터

let read_Todo_Title = [];
let read_Todo_Content = [];
let read_Check_List = []; //체크여부 
let send_Todo_Title = [];
let send_Todo_Content = [];
let send_Check_List = [];
let titleArrayToJson;
let contentArrayToJson;
let check_ListArrayToJson;

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
        read_Check_List = JSON.parse(localStorage.getItem('todo_check_List'));

        

        for (i = 0 ; i < read_Todo_Title.length ; i++) {

            var newToDo

            if (read_Check_List[i] == true) {
                newToDo = `<div class="list">
                <input type="checkbox" class="check_box" name="check_box" checked/>
                <span class="list_title" style="text-decoration: line-through;">${read_Todo_Title[i]}</span>
                <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
                </div>`
            } else {
                newToDo = `<div class="list">
                <input type="checkbox" class="check_box" name="check_box"/>
                <span class="list_title" style="text-decoration: none;">${read_Todo_Title[i]}</span>
                <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
                </div>`
            }

            
            
            $('#list_Area').append(newToDo);
            send_Todo_Title.push(read_Todo_Title[i]);
            send_Todo_Content.push(read_Todo_Content[i]);
            send_Check_List.push(read_Check_List[i]);
        }
        console.log(`1read_Check_List: ${read_Check_List}`);
        console.log(`1send_Check_List: ${send_Check_List}`);
        $('#all_Complete').css('display', 'inline');
        
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

            var newToDo

            if (send_Check_List[i] == true) {
                newToDo = `<div class="list">
                <input type="checkbox" class="check_box" name="check_box" checked/>
                <span class="list_title" style="text-decoration: line-through;">${read_Todo_Title[i]}</span>
                <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
                </div>`
            } else {
                newToDo = `<div class="list">
                <input type="checkbox" class="check_box" name="check_box"/>
                <span class="list_title" style="text-decoration: none;">${read_Todo_Title[i]}</span>
                <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
                </div>`
            }

            

            $('#list_Area').append(newToDo);
            // send_Todo_Title.push(read_Todo_Title[i]);
            // send_Todo_Content.push(read_Todo_Content[i]);
        }

        console.log(`2read_Check_List: ${read_Check_List}`);
        console.log(`2send_Check_List: ${send_Check_List}`);
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

    var newToDo

    if (send_Check_List[i] == true) {
        newToDo = `<div class="list">
        <input type="checkbox" class="check_box" name="check_box" checked/>
        <span class="list_title" style="text-decoration: line-through;">${$('#ToDo_title').val()}</span>
        <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
        </div>`
    } else {
        newToDo = `<div class="list">
        <input type="checkbox" class="check_box" name="check_box"/>
        <span class="list_title" style="text-decoration: none;">${$('#ToDo_title').val()}</span>
        <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
        </div>`
    }

    console.log(`3read_Check_List: ${read_Check_List}`);
    console.log(`3send_Check_List: ${send_Check_List}`);

    $('#list_Area').append(newToDo);

     // 체크여부 기본 값  false 입력

    send_Todo_Title.push($('#ToDo_title').val());
    send_Todo_Content.push($('#ToDo_content').val());
    send_Check_List.push(false);

    // console.log(send_Check_List);
    

    titleArrayToJson = JSON.stringify(send_Todo_Title);
    contentArrayToJson = JSON.stringify(send_Todo_Content);
    check_ListArrayToJson = JSON.stringify(send_Check_List);

    localStorage.setItem('todo_title', titleArrayToJson);
    localStorage.setItem('todo_content', contentArrayToJson);
    localStorage.setItem('todo_check_List', check_ListArrayToJson);
    
    location.reload()
    
})

$('#close_Btn').click(function(){
    $('.add_Area').css('display', 'none');
});





$('#list_Area').click(function(e){

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
            
            if (send_Check_List[i] == false) {
                e.target.nextElementSibling.style.textDecoration = "line-through";
                $('.check_box').eq(i).prop('checked',true);
                send_Check_List[i] = true;
                check_ListArrayToJson = JSON.stringify(send_Check_List);
                localStorage.setItem('todo_check_List', check_ListArrayToJson);
            } else {
                e.target.nextElementSibling.style.textDecoration = "none";
                $('.check_box').eq(i).prop('checked',false);
                send_Check_List[i] = false;
                check_ListArrayToJson = JSON.stringify(send_Check_List);
                localStorage.setItem('todo_check_List', check_ListArrayToJson);
            }

            
        }
    }

    console.log(`4read_Check_List: ${read_Check_List}`);
    console.log(`4send_Check_List: ${send_Check_List}`);


    var changedTitle = send_Todo_Title;
    var changedContent = send_Todo_Content;
    var changedCheckList = send_Check_List;
    
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
            changedCheckList.splice(indexTodo, 1);

            titleArrayToJson = JSON.stringify(changedTitle);
            contentArrayToJson = JSON.stringify(changedContent);
            check_ListArrayToJson = JSON.stringify(changedCheckList);
            
            localStorage.setItem('todo_title', titleArrayToJson);
            localStorage.setItem('todo_content', contentArrayToJson);
            localStorage.setItem('todo_check_List', check_ListArrayToJson);

            $(e.target.parentNode.parentNode).remove();
                
                            
        }
    }
});

// 모두 완료 버튼

$('footer').click(function(e){
    if (e.target == document.getElementById('all_Complete')) {
        for (i = 0; i < $('.list_title').length; i++) { 
            $('.list_title').eq(i).css('textDecoration', 'line-through');
            $('.check_box').prop('checked',true)
            send_Check_List[i] = true;
           
            
        }
        check_ListArrayToJson = JSON.stringify(send_Check_List);
        localStorage.setItem('todo_check_List', check_ListArrayToJson);
    }
})


