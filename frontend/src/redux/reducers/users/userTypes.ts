export interface User {
  id: number
  firstName: string,
  email: string,
  role: string,
  token: string
}

export interface UsersState {
  user: User | null,
  successMsg: string | null,
  errorMsg: string | null
}
