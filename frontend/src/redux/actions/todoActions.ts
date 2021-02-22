import axios from 'axios'
import * as consts from '../reducers/users/todoSlice'
import {callApi} from '../../utils/callApi'


// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'))
const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user && user.token}`
  },
}

export const getUserTodos = () => async (dispatch: any) => {
  try {
    await callApi()
    const res = await axios.get('/api/todos', options)
    dispatch(consts.GET_ALL_USER_TODOS(res.data))
  } catch (e) {
  }
}

export const createNewTodo = (data: any) => async (dispatch: any) => {
  try {
    await callApi()
    dispatch(consts.FETCHING_REQUEST(true))
    const res = await axios.post('/api/todos/add', data, options)
    dispatch(consts.ADD_NEW_TODO_BY_USER(res.data))
  } catch (e) {
  }
}

export const deleteTodo = (id: number) => async (dispatch: any) => {
  try {
    await callApi()
    dispatch(consts.FETCHING_REQUEST(true))
    const res = await axios.delete(`/api/todos/${id}`, options)
    dispatch(consts.DELETE_TODO_BY_USER({id, data: res.data}))
  } catch (e) {
  }
}
