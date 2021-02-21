const express = require('express')
const {verifyToken, authorize} = require('../middlewares/auth')
const router = express.Router()
const {newTodo, findAllTodosByUser, updateTodo, deleteTodo} = require('../controllers/todoController')


router.route('/').get(verifyToken, authorize('user', 'publisher', 'admin'), findAllTodosByUser)
router.route('/add').post(verifyToken, authorize('user', 'publisher', 'admin'), newTodo)
router.route('/:id').put(verifyToken, authorize('user', 'publisher', 'admin'), updateTodo)
router.route('/:id').delete(verifyToken, authorize('user', 'publisher', 'admin'), deleteTodo)


module.exports = router