import {combineReducers} from '@reduxjs/toolkit'
import userSlice from './reducers/users/userSlice'
import todoSlice from './reducers/users/todoSlice'

const rootReducer = combineReducers({
  userReducer: userSlice,
  todoReducer: todoSlice
})


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer