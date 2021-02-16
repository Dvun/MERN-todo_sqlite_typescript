import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UsersState} from './userTypes'

const userFromStorage: User = localStorage.getItem('user') ?
// @ts-ignore
  JSON.parse(localStorage.getItem('user'))
  :
  null

const initialState: UsersState = {
  user: userFromStorage,
  successMsg: null,
  errorMsg: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    REGISTER_USER: (state, action: PayloadAction<string>) => {
      state.successMsg = action.payload
    },

    LOGIN_USER: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      if (state.user) {
        state.successMsg = 'You are logged in!'
      }
    },

    LOGOUT_USER: (state) => {
      state.user = null
    },

    FORGOT_PASSWORD_SENT_LINK: (state, action: PayloadAction<string>) => {
      state.successMsg = action.payload
    },

    RESET_PASSWORD_SUCCESS: (state, action: PayloadAction<string>) => {
      state.successMsg = action.payload
    },

    REGISTER_FAIL: (state: UsersState, action: PayloadAction<string>) => {
      state.errorMsg = action.payload
    },

    RESET_PASSWORD_FAIL: (state: UsersState, action: PayloadAction<string>) => {
      state.errorMsg = action.payload
    },

    LOGIN_FAIL: (state: UsersState, action: PayloadAction<string>) => {
      state.errorMsg = action.payload
    },

    FORGOT_PASSWORD_SENT_LINK_FAIL: (state: UsersState, action: PayloadAction<string>) => {
      state.errorMsg = action.payload
    },

    CLEAR_MESSAGES: (state) => {
      state.successMsg = null
      state.errorMsg = null
    },

  },
})

export default userSlice.reducer
export const {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD_SENT_LINK,
  RESET_PASSWORD_SUCCESS,

  REGISTER_FAIL,
  LOGIN_FAIL,
  CLEAR_MESSAGES,
  FORGOT_PASSWORD_SENT_LINK_FAIL,
  RESET_PASSWORD_FAIL
} = userSlice.actions