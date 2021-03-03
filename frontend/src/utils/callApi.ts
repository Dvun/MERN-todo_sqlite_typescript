import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {response} from 'express'

async function logoutUserIfNoToken(id: number) {
  localStorage.removeItem('user')
  await axios.post(`/api/users/logout/${id}`)
}


export const callApi = async (url: any, method: any, data: any | null) => {

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
  if (diff < 60) {
    const res = await axios.post('/api/users/refreshToken', user, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    localStorage.removeItem('token')
    localStorage.setItem('token', res.data)
    token = await res.data
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