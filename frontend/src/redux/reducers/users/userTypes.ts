export interface User {
  success: boolean,
  id: number
  firstName: string,
  email: string,
  role: string,
}

export interface UsersState {
  user: User | null,
  successMsg: string | null,
  errorMsg: string | null
}
