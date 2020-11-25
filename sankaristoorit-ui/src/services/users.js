import axios from 'axios'
import { API_URL } from '../config'

const baseUrl = API_URL + '/users'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(console.log('user deleted'))
}

export default { getAll, create, remove }