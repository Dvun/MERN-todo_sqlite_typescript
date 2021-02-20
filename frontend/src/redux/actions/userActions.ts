import axios from 'axios'
import {ForgotPassword, LoginData, RegisterData, ResetPasswordData, ResetToken} from '../../Types'
import {AppDispatch, AppThunk} from '../store'
import * as consts from '../reducers/users/userSlice'

interface UserId {
  id: number | null
}


export const registerUser = (data: RegisterData): AppThunk => async (dispatch: AppDispatch) => {
  const config = {
    headers: {'Content-Type': 'application/json'},
  }
  try {
    const res = await axios.post('/api/users/register', data, config)
    dispatch(consts.REGISTER_USER(res.data.msg))
  } catch (e) {
    dispatch(consts.REGISTER_FAIL(e.response.data.errorMsg))
  }
}

export const loginUser = (data: LoginData): AppThunk => async (dispatch: AppDispatch) => {
  const config = {
    headers: {'Content-Type': 'application/json'},
  }
  try {
    const res = await axios.post('/api/users/login', data, config)
    dispatch(consts.LOGIN_USER(res.data))
    localStorage.setItem('user', JSON.stringify(res.data))
  } catch (e) {
    dispatch(consts.LOGIN_FAIL(e.response.data.errorMsg))
  }
}

export const logoutUser = () => async (dispatch: any) => {
  // @ts-ignore
  const {id}: UserId = JSON.parse(localStorage.getItem('user'))
  try {
    await axios.post(`/api/users/logout/${id}`)
    localStorage.removeItem('user')
    dispatch(consts.LOGOUT_USER())
  } catch (e) {

  }
}

export const forgotPasswordSendLink = (forgotPass: ForgotPassword): AppThunk => async (dispatch: AppDispatch) => {
  const {email} = forgotPass
  try {
    const res = await axios.post('/api/users/forgotPassword', {email})
    dispatch(consts.FORGOT_PASSWORD_SENT_LINK(res.data.msg))
  } catch (e) {
    dispatch(consts.FORGOT_PASSWORD_SENT_LINK_FAIL(e.response.data.errorMsg))
  }
}

export const resetPasswordFromLink = (resetPasswordData: ResetPasswordData, token: ResetToken): AppThunk => async (dispatch: AppDispatch) => {
  const {password} = resetPasswordData
  try {
    const res = await axios.put(`/api/users/resetPassword/${token}`, {password})
    dispatch(consts.RESET_PASSWORD_SUCCESS(res.data.msg))
  } catch (e) {
    dispatch(consts.RESET_PASSWORD_FAIL(e.response.data.errorMsg))
  }
}