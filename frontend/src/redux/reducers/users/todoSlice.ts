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
    FETCHING_REQUEST: (state, action: PayloadAction<any>) => {
      state.success = action.payload
    },

    GET_ALL_USER_TODOS: (state, action: PayloadAction<any>) => {
      state.todos = action.payload
      state.success = false
    },

    ADD_NEW_TODO_BY_USER: (state, action: PayloadAction<any>) => {
      state.successMsg = action.payload.msg
    },

    DELETE_TODO_BY_USER: (state, action: PayloadAction<any>) => {
      // @ts-ignore
      state.todos.filter((item): any => item.id !== action.payload.id)
      state.errorMsg = action.payload.msg
    },


    CLEAR_MESSAGES_TODOS: (state) => {
      state.successMsg = null
      state.errorMsg = null
    },

  },
})

export default todoSlice.reducer
export const {
  GET_ALL_USER_TODOS,
  FETCHING_REQUEST,
  ADD_NEW_TODO_BY_USER,
  DELETE_TODO_BY_USER,
  CLEAR_MESSAGES_TODOS
} = todoSlice.actions