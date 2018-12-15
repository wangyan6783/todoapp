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
  {id: uniqid(), text: "Hello, world!", status: "active", archive: false},
  {id: uniqid(), text: "Pick up groceries", status: "complete", archive: true}
];

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

app.get('/*', function(req, res) {
  let bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

app.post('/todos', function(req, res) {
  let text = req.body.data.text;
  if (!text) {
    return res.status(400).json({message: "text is required"});
  }

  let id = uniqid();
  let newTodo = { id: id, text: text, status: "active", archive: false };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/todos/:id', function(req, res) {
  let targetTodo = req.body.data;
  todos = todos.filter(function(todo) {
    return todo.id !== targetTodo.id
  })
  res.json(targetTodo);
});


// complete all tasks
app.put('/todos/completeall', function(req, res) {
  todos.map(function(todo) {
    todo.status = "complete";
  });
  res.json(todos);
})

// archive a particular task
app.put('/todos/archive/:id', function(req, res) {
  let id = req.body.data;
  let newTodos = todos.map(todo => {
    if (todo.id === id) {
      todo.archive = true;
    }
    return todo;
  })
  res.json(newTodos);
})

// archive all completed tasks
app.put('/todos/archiveall', function(req, res) {
  todos.map(todo => {
    if (todo.status === "complete") {
      todo.archive = true;
    }
  })
  res.json(todos);
})

app.put('/todos/:id', function(req, res) {
  let targetTodo = req.body.data;
  let index = todos.findIndex(todo => {
    return todo.id === targetTodo.id;
  });
  todos = [
    ...todos.slice(0, index),
    targetTodo,
    ...todos.slice(index + 1),
  ]
  res.json(targetTodo);
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
