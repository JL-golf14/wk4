$(document).ready(function(){

  getTodoData();
  function getTodoData() {

    $.ajax({
      type: 'GET',
      url: '/todo',
      success: function(response) {
        $('#taskListTag').empty();
        for (var i = 0; i < response.length; i++) {
          var currentTask = response[i];
          var $newTodo = $('<tr>');
          $newTodo.data('id', currentTask.id);
          $newTodo.append('<td>' + currentTask.task + '</td>');
          $newTodo.append('<td>' + currentTask.completed + '</td>');
          $newTodo.append('<td>' + currentTask.created_at + '</td>');
          if(currentTask.completed == 'complete') {
            $newTodo.append('<td>'+ '</td>');
            $newTodo.toggleClass('complete');
          } else
          {
            $newTodo.toggleClass('incomplete');
            $newTodo.append('<td><button class="taskCompleteButton">Mark as Done</button></td>');
          }
          $newTodo.append('<td><button class="deleteButton">Delete</button></td>');

          $('#taskListTag').append($newTodo);
        }
      }
    });
  }

  $('#newTodoButton').on('click', function(){
    event.preventDefault();
    var newTaskFromDom = $("#taskSubmission").val();
    var newTaskCompletedVar = 'incomplete';
    var newTodoObject = {
      task: newTaskFromDom,
      completed: 'incomplete'
    };

    $.ajax({
      type: 'POST',
      url: '/todo/new',
      data: newTodoObject,
      success: function(response){
        getTodoData();
        $('#newTodoButton > input').val('');
      }
    });
  });  //closes new todo

  $('#taskListTag').on('click', '.deleteButton', function(){
    var r = confirm("Are you sure you wanna delete???");
    if (r ==true) {


    var idTodoDelete = $(this).parent().parent().data().id;
    $.ajax({
      type: 'DELETE',
      url: '/todo/delete/' + idTodoDelete,
      success: function(response) {
        getTodoData();
      }
    })
}else{
  txt = "didn't think so"
}
}); //closes delete button
  $('#taskListTag').on('click','.taskCompleteButton', function(){
    var idTodoComplete = $(this).parent().parent().data().id;
    var todoObjectToSave = {
      id : idTodoComplete,
      completed: "complete"
    }

    $.ajax({
      type: 'PUT',
      url: '/todo/' + idTodoComplete,
      data: todoObjectToSave,
      success: function(response) {
        getTodoData();
      }
    })  //ajax for save
  });  // closes save button

});   //closes doc ready
