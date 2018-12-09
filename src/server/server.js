let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let uniqid = require('uniqid');

let app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  {id: uniqid(), text: "Hello, world!"},
  {id: uniqid(), text: "Pick up groceries", status: "complete"}
];

app.get('/', function(req, res) {
  let bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/todos/:id', function(req, res) {
  let id = req.params.id;
  let todo = todos.filter(function(todo) {
    return todo.id === id;
  })

  res.json(todo);
});

app.post('/todos', function(req, res) {
  let text = req.body.data.text;
  if (!text) {
    return res.status(400).json({message: "text is required"});
  }

  let id = uniqid();
  let newTodo = { id: id, text: text, status: "active" };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/todos/:id', function(req, res) {
  let id = req.body.data.id;
  todos = todos.filter(function(todo) {
    return todo.id !== id
  })
  res.json(id)
});

app.put('/todos/:id', function(req, res) {
  res.status(500).send({message: "not implemented"});
});

// Node server.
let port = 3000;
let server = app.listen(port, function() {
  console.log('SERVER STARTED LISTENING ON PORT ' + port);
});

// Dev server.
let devServer = require('../../tools/development-server');
let devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
