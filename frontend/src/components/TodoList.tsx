import React, {FC, useEffect} from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import {NewTodoModal, TodoItem} from './index'
import {useDispatch, useSelector} from 'react-redux'
import {getUserTodos} from '../redux/actions/todoActions'
import {RootState} from '../redux/rootState'
import {Todo, TodosState} from '../redux/reducers/users/todoTypes'


const TodoList: FC<TodosState> = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const {todos}: any = useSelector(({todoReducer}: RootState) => todoReducer)

  useEffect(() => {
    dispatch(getUserTodos())
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Box component='div' display='flex' justifyContent='flex-end'>
        <Button variant='contained' color='primary' onClick={handleClickOpen} startIcon={<LocalHospitalIcon/>}>
          Add Todo
        </Button>
      </Box>
      <Box component='div' marginTop={3}>
        {todos.map((todo: Todo) => (
          // @ts-ignore
          <TodoItem key={todo.id} {...todo}/>
        ))}
      </Box>

      <NewTodoModal
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  )
}

export default TodoList