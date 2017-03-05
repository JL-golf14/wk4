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
          $newTodo.append('<td class="completedClass">' + currentTask.completed + '</td>');
          if (currentTask.completed == null) {
          }else {
            $newTodo.append('<td>' + currentTask.created_at + '</td>');
          }
          $newTodo.append('<td><button class="taskCompleteButton">Mark as Done</button></td>');
          $newTodo.append('<td><button class="deleteButton">Delete Task</button></td>');

          $('#taskListTag').append($newTodo);
        }
      }
    });
  }

  $('#newTodoButton').on('click', function(){
    console.log("new todo button click");
    event.preventDefault();
    var newTaskFromDom = $("#taskSubmission").val();
    var newTaskCompletedVar = 'NOT WORKING RIGHT';
    var newTodoObject = {
      task: newTaskFromDom,
      completed: 'incomplete task',
    };

    $.ajax({
      type: 'POST',
      url: '/todo/new',
      data: newTodoObject,
      success: function(response){
        console.log(response);
        getTodoData();
        $('#newTodoButton > input').val('');
      }
    });
  });  //closes new todo

  $('#taskListTag').on('click', '.deleteButton', function(){
    var idTodoDelete = $(this).parent().parent().data().id;
    console.log('The id to delete is: ', idTodoDelete);
    $.ajax({
      type: 'DELETE',
      url: '/todo/delete/' + idTodoDelete,
      success: function(response) {
        console.log(response);
        getTodoData();
      }
    })
  });  //closes delete button




  $('#taskListTag').on('click','.taskCompleteButton', function(){
    var taskObjectToUpdate = {};
    var taskComplete= $(this).parent().parent().data().id;
    console.log("ID TODO COMPLETE LOG",idTodoComplete);
    taskObjectToUpdate.id = taskComplete;
    console.log(taskObjectToUpdate);
    // //works
    // var taskTodoSave = $(this).parent().parent().parent().find('.completedClass').val();
    // var todoObjectToSave = {
    //   completed: true
    // };

    $.ajax({
      type: 'PUT',
      url: '/todo/' + taskComplete,
      data: taskObjectToUpdate,
      success: function(response) {
        console.log(response);
        getTodoData();
      }
    })  //ajax for save
  });  // closes save button

});   //closes doc ready
