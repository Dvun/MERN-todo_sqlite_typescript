import * as consts from '../reducers/users/todoSlice'
import {callApi} from '../../utils/callApi'


export const getUserTodos = () => async (dispatch: any) => {
  try {
    const res = await callApi('/api/todos', 'GET', {})
    dispatch(consts.GET_ALL_USER_TODOS(res.data))
  } catch (e) {
  }
}

export const createNewTodo = (data: any) => async (dispatch: any) => {
  try {
    dispatch(consts.FETCHING_REQUEST(true))
    const res = await callApi('/api/todos/add', 'POST', data)
    await dispatch(consts.ADD_NEW_TODO_BY_USER(res.data))
    dispatch(getUserTodos())
  } catch (e) {
  }
}

export const updateTodo = (id: number, data: any) => async (dispatch: any) => {
  try {
    dispatch(consts.FETCHING_REQUEST(true))
    const res = await callApi(`/api/todos/${id}`, 'PUT', data)
    await dispatch(consts.UPDATE_TODO_BY_USER(res.data))
    await dispatch(getUserTodos())
  } catch (e) {
  }
}

export const deleteTodo = (id: number) => async (dispatch: any) => {
  try {
    dispatch(consts.FETCHING_REQUEST(true))
    const res = await callApi(`/api/todos/${id}`, 'DELETE', {})
    await dispatch(consts.DELETE_TODO_BY_USER({id, data: res.data}))
    await dispatch(getUserTodos())
  } catch (e) {
  }
}
