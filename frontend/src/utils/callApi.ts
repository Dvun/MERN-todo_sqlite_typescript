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

  // const currentTime = Math.round(Date.now() / 1000)
  // const diff = tokenData.exp - currentTime
  // const isAccessTokenValid = diff > 60
  // if (!isAccessTokenValid) {
  //   const options = {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   }
  //
  //   // const res = await axios.post('/api/users/refreshToken', user, options)
  //   // if (res.data === 'Please login!') {
  //   //   localStorage.removeItem('user')
  //   //   await axios.post(`/api/users/logout/${user.id}`)
  //   // }
  //   // if (res.status === 201) {
  //   //   localStorage.removeItem('user')
  //   //   localStorage.setItem('user', JSON.stringify(res.data))
  //   // } else {
  //   //   localStorage.removeItem('user')
  //   //   await axios.post(`/api/users/logout/${user.id}`)
  //   // }
  // }
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