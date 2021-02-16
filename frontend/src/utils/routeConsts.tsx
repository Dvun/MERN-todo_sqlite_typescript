import {LoginPopover, Register, ResetPasswordPage, TodoList} from '../components'
export const LOGIN_ROUTE = '/'
export const TODOS_ROUTE = '/todos'
export const REGISTER_ROUTE = '/register'
export const RESET_PASSWORD_PAGE = '/resetPassword/:resetToken'


export const publicRoutes = [
  {
    path: REGISTER_ROUTE,
    component: Register
  },
  {
    path: LOGIN_ROUTE,
    component: LoginPopover
  },
  {
    path: RESET_PASSWORD_PAGE,
    component: ResetPasswordPage
  },
]

export const privateRoutes = [
  {
    path: TODOS_ROUTE,
    component: TodoList
  }
]