
export interface Todo {
  id: number,
  description: string,
  createdAt: string,
  isPublic: boolean,
  updatedAt: string,
  userId: string
}

export interface Todos {
  todos: Todo
}

export interface TodosState {
  success: boolean
  todo: Todo | null,
  todos: Todos[],
  successMsg: string | null,
  errorMsg: string | null
}
