const Todo = require('../models/todo')


exports.findAllTodosByUser = async (req, res) => {
  const {id} = req.user.dataValues
  try {
    const todos = await Todo.findAll({where: {userId: id}})
    if (!todos) {
      return res.status(404).json({errorMsg: `Todos not found`})
    }
    res.json(todos)
  } catch (e) {
    res.status(500).json({errorMsg: 'Server Error!'})
  }
}

exports.newTodo = async (req, res) => {
  const {description, isPublic} = req.body
  const {id} = req.user.dataValues
  try {
    await Todo.create({
      description: description,
      isPublic: isPublic,
      userId: id,
    })
    res.status(201).json({msg: 'Todo created!'})
  } catch (e) {
    res.status(500).json({errorMsg: 'Server Error!'})
  }
}

exports.findTodoById = async (req, res, next) => {
  const {id} = req.user.dataValues
  const todoId = req.params.id
  try {
    const todo = await Todo.findOne({where: {id: todoId, userId: id}})
    if (todo) {
      res.json(todo)
      next()
    }
    return res.status(404).json({errorMsg: `Todo not found`})
  } catch (e) {
    res.status(500).json({errorMsg: 'Server Error!'})
  }
}

exports.updateTodo = async (req, res) => {
  const userid = req.user.dataValues.id
  const todoId = req.params.id
  console.log(req.body)
  try {
    let todo = await Todo.findOne({where: {id: todoId, userId: userid}})
    if (!todo) {
      return res.status(404).json({errorMsg: 'Todo not found!'})
    }
    await todo.update({
      description: req.body.description,
      isPublic: req.body.isPublic
    }, {where: {id: todoId, userId: userid}})
    res.status(201).json({msg: 'Todo updated!'})
  } catch (e) {
    console.log(e)
    res.status(500).json({errorMsg: 'Server Error!'})
  }
}

exports.deleteTodo = async (req, res) => {
  const userid = req.user.dataValues.id
  const todoId = req.params.id
  try {
    const todo = await Todo.findOne({where: {id: todoId, userId: userid}})
    if (!todo) {
      return res.status(404).json({errorMsg: 'Todo not found!'})
    }
    await todo.destroy()
    res.status(201).json({msg: 'Todo deleted!'})
  } catch (e) {
    res.status(500).json({errorMsg: 'Server Error!'})
  }
}