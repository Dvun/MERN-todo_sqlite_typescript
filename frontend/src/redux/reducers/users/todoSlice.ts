import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TodosState} from './todoTypes'


const initialState: TodosState = {
  success: false,
  todo: null,
  todos: [],
  successMsg: null,
  errorMsg: null
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    GET_ALL_USER_TODOS_REQUEST: (state, action: PayloadAction<any>) => {
      state.success = true
    },

    GET_ALL_USER_TODOS: (state, action: PayloadAction<any>) => {
      state.todos = action.payload
      state.success = false
    },

    ADD_NEW_TODO_BY_USER: (state, action: PayloadAction<any>) => {
      state.todos = action.payload
    },
  },
})

export default todoSlice.reducer
export const {
  GET_ALL_USER_TODOS,
  GET_ALL_USER_TODOS_REQUEST,
  ADD_NEW_TODO_BY_USER
} = todoSlice.actions