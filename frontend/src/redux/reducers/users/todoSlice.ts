import {createSlice, PayloadAction} from '@reduxjs/toolkit'


const initialState = {
  todo: {},
  todos: []
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    GET_ALL_USER_TODOS: (state, action) => {
      state.todos = action.payload
    },
  },
})

export default todoSlice.reducer
export const {
  GET_ALL_USER_TODOS
} = todoSlice.actions