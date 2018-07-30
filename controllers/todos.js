var Todo = require('../models/todo');

exports.getTodos = (req, res, next) => {

  Todo.find({}, (err, todos) => {

      if(err){
          return res.send(err);
      }

      return res.status(200).json(todos);
  });

}

exports.getTodo = (req, res, next) => {

    let todoId =  req.params.todo_id;

    Todo.findOne({_id:todoId}, (err, todo) => {
        if(err){
            return res.send(err);
          }

          return res.status(200).json(todo);
    });

}

exports.updateTodo = (req, res, next) => {

    var todo =  req.params.todo_id;

    res.json("Todo "+ todo + " updated");

}

exports.createTodo = (req, res, next) => {

    let name = req.body.name;

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    let todo = new Todo({
      name: name
    });

    todo.save(function(err, _todo){

        if(err){
          return next(err);
        }

        res.status(201).json({
          todo: _todo
        });

      });

}

exports.deleteTodo = (req, res, next) => {

    var todo =  req.params.todo_id;

    res.json("Todo "+ todo +" deleted");

}
