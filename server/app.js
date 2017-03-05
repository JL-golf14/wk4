var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var todo = require('./routes/todo');
var port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use('/todo', todo);

app.listen(port, function() {
  console.log('We are running on port: ', port);
});
