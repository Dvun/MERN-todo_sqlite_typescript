import React, {FC, useEffect} from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {TodoItem} from './index'
import {useDispatch, useSelector} from 'react-redux'
import { getUserTodos } from '../redux/actions/todoActions';
import {RootState} from '../redux/rootState'

interface Todos {
  todos: Todo[]
}

interface Todo {
  id: number,
  description: string
}

const TodoList: FC<Todos> = () => {
  const dispatch = useDispatch()
  const {todos}: Todos = useSelector(({todoReducer}: RootState) => todoReducer)


  useEffect(() => {
    dispatch(getUserTodos())
  }, [dispatch])


  return (
    <>
      <Box component='div' display='flex' justifyContent='flex-end'>
        <Button variant='contained' color='primary' startIcon={<LocalHospitalIcon/>}>
          Add Todo
        </Button>
      </Box>
      <Box component='div' marginTop={3}>
        {todos && todos.map(todo => (
          <TodoItem key={todo.id} {...todo}/>
        ))}
      </Box>
    </>
  )
}

export default TodoList