import jwtDecode from 'jwt-decode'
import axios from 'axios'


export async function callApi() {
  // @ts-ignore
  let user = JSON.parse(localStorage.getItem('user'))
  let tokenData: any

  try {
    tokenData = jwtDecode(user.token)
  } catch (e) {
    localStorage.removeItem('user')
    await axios.post(`/api/users/logout/${user.id}`)
  }

  const currentTime = Math.round(Date.now() / 1000)
  const diff = tokenData.exp - currentTime
  const isAccessTokenValid = diff > 60
  if (!isAccessTokenValid) {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user && user.token}`,
      },
    }

    const res = await axios.post('/api/users/refreshToken', user, options)
    if (res.data === 'Please login!') {
      localStorage.removeItem('user')
      await axios.post(`/api/users/logout/${user.id}`)
    }
    if (res.status === 201) {
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(res.data))
    } else {
      localStorage.removeItem('user')
      await axios.post(`/api/users/logout/${user.id}`)
    }
  }
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user && user.token}`,
    },
  }
}
