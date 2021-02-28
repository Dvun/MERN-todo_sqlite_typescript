import jwtDecode from 'jwt-decode'
import axios from 'axios'

async function logoutUserIfNoToken(id: number) {
  localStorage.removeItem('user')
  await axios.post(`/api/users/logout/${id}`)
}


export async function callApi(url: any, method: any, data: any | null) {

  // @ts-ignore
  let user = JSON.parse(localStorage.getItem('user'))
  // @ts-ignore
  let token = await JSON.parse(localStorage.getItem('token'))
  let tokenData: any

  if (token) {
    tokenData = await jwtDecode(token)
  } else {
    await logoutUserIfNoToken(user.id)
  }

  return axios({
    url: url,
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: data,
  })
}