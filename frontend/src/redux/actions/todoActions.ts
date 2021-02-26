import axios from 'axios'
import * as consts from '../reducers/users/todoSlice'
import {callApi} from '../../utils/callApi'


async function getTokenFromLocalStorage () {
  // @ts-ignore
  const user = await JSON.parse(localStorage.getItem('user'))
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user && user.token}`
    },
  }
}

export const getUserTodos = () => async (dispatch: any) => {
  try {
    await callApi()
    const options = await getTokenFromLocalStorage()
    const res = await axios.get('/api/todos', options)
    dispatch(consts.GET_ALL_USER_TODOS(res.data))
  } catch (e) {
  }
}

export const createNewTodo = (data: any) => async (dispatch: any) => {
  try {
    const options = await getTokenFromLocalStorage()
    dispatch(consts.FETCHING_REQUEST(true))
    const res = await axios.post('/api/todos/add', data, options)
    await dispatch(consts.ADD_NEW_TODO_BY_USER(res.data))
    await dispatch(getUserTodos())
  } catch (e) {
  }
}

export const deleteTodo = (id: number) => async (dispatch: any) => {
  try {
    const options = await getTokenFromLocalStorage()
    dispatch(consts.FETCHING_REQUEST(true))
    const res = await axios.delete(`/api/todos/${id}`, options)
    await dispatch(consts.DELETE_TODO_BY_USER({id, data: res.data}))
    await dispatch(getUserTodos())
  } catch (e) {
  }
}

export const updateTodo = (id: number, data: any) => async (dispatch: any) => {
  try {
    const options = await getTokenFromLocalStorage()
    dispatch(consts.FETCHING_REQUEST(true))
    const res = await axios.put(`/api/todos/${id}`, data, options)
    await dispatch(consts.UPDATE_TODO_BY_USER(res.data))
    await dispatch(getUserTodos())
  } catch (e) {
  }
}
