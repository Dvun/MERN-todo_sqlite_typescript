import jwtDecode from 'jwt-decode'
import axios from 'axios'


const tokenTimeControl = async (user: any, isTokenValid: boolean) => {
  if (!isTokenValid) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    }
    const res = await axios.post(`/api/users/resetToken`, user, options)
    // @ts-ignore
    const localUser = await JSON.parse(localStorage.getItem('user'))
    if (res.data.user === null || localUser === null || res.data === 'Invalid Token!') {
      localStorage.removeItem('user')
      return
    }
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(res.data))
  }
}


export const callApi = async () => {
  // @ts-ignore
  const user = JSON.parse(localStorage.getItem('user'))
  let tokenData: any

  try {
    tokenData = jwtDecode(user.token)
  } catch (e) {
    localStorage.removeItem('user')
    return
  }
  const currentData = Math.round(Date.now() / 1000)
  if (tokenData.exp === undefined) {
    return
  }
  const diff = tokenData.exp - currentData
  const isTokenValid = diff > 60


  await tokenTimeControl(user, isTokenValid)
}

