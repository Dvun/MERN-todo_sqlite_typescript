import jwtDecode from 'jwt-decode'
import axios from 'axios'

async function logoutUserIfTokenProblem (id: number) {
  await axios.post(`/api/users/logout/${id}`)
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

const refreshToken = async (user: any) => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }
  try {
    return await axios.post('/api/users/refreshToken', user, options)
  } catch (e) {
    await logoutUserIfTokenProblem(user.id)
  }
}

export async function callApi (url: any, method: any, data: any | null) {
  // @ts-ignore
  let user = JSON.parse(localStorage.getItem('user'))
  // @ts-ignore
  let token = JSON.parse(localStorage.getItem('token'))
  let tokenData: any

  try {
    if (token) {
      tokenData = await jwtDecode(token)
    } else {
      await logoutUserIfTokenProblem(user.id)
    }
  } catch (e) {
    await logoutUserIfTokenProblem(user.id)
  }

  const currentData = Math.round(Date.now() / 1000)
  const diff = tokenData.exp - currentData

  if (diff > 60) {
    const newToken: any = await refreshToken(user)

    localStorage.setItem('token', JSON.stringify(newToken.data))
    token = newToken.data
  }

  return axios({
    url,
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data
  })
}