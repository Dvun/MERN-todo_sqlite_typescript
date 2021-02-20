import axios from 'axios'
import * as consts from '../reducers/users/todoSlice'
import {callApi} from '../../callApi'


// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'))
const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user && user.token}`,
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

// export const createNewTodo = () => async (dispatch: any) => {
//   try {
//   } catch (e) {
//   }
// }
