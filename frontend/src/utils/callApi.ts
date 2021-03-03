import jwtDecode from 'jwt-decode'
import axios from 'axios'

async function logoutUserIfNoToken(id: number) {
  localStorage.removeItem('user')
  await axios.post(`/api/users/logout/${id}`)
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
    console.log(e)
  }
}


export async function callApi (url: any, method: any, data: any | null) {

  // @ts-ignore
  let user = JSON.parse(localStorage.getItem('user'))
  // @ts-ignore
  let token = await JSON.parse(localStorage.getItem('token'))
  let tokenData: any

  try {
    if (token) {
      tokenData = await jwtDecode(token)
    } else {
      await logoutUserIfNoToken(user.id)
    }
  } catch (e) {
    console.log(e)
  }

  const currentData = Math.round(Date.now() / 1000)
  const diff = tokenData.exp - currentData

  console.log(diff)
  if (diff > 60) {
    const newToken: any = await refreshToken(user)

    localStorage.removeItem('token')
    localStorage.setItem('token', newToken.data)
    token = newToken.data
  }
  console.log(token.data)

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