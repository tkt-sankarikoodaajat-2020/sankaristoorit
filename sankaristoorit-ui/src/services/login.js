import axios from 'axios'
import { API_URL } from '../config'

const baseUrl = API_URL + '/tips'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }