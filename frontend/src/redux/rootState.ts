import {combineReducers} from '@reduxjs/toolkit'
import userSlice from './reducers/users/userSlice'

const rootReducer = combineReducers({
  userReducer: userSlice
})


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer