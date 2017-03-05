var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);
// =============================== initial get
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Err connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    }
    else {
      client.query('SELECT * FROM "todo" ORDER BY "completed" DESC;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});
// ===============================end initial get

// ============================ new task
router.post('/new', function(req, res){
  var newTodo = req.body;

  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO todo (task, completed) VALUES ($1, $2);',
      [newTodo.task, newTodo.completed],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});
// ============================ end new task


// ============================ delete task
router.delete('/delete/:id', function(req, res){
  var todoId = req.params.id;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      res.sendStatus(500);
    } else {
      client.query('DELETE FROM todo WHERE id=$1;',
      [todoId],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
        }
      });
    }
  });
}); // closing delete request
// ============================ end delete task

//==========================Mark as completed
router.put('/:id', function(req, res){
  var id = req.params.id;
  var taskComplete = req.body;
  taskComplete.completed = ('complete');
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('UPDATE todo SET completed = $1 WHERE id = $2',
      ["complete", taskComplete.id],
      function(errorMakingQuery, result){
        done();
        console.log(taskComplete);
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
        }
      });
    }
  });
}); // closing completed request
//==========================end mark as completed











//
module.exports = router;
