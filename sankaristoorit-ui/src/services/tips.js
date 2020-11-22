import axios from 'axios'
import { API_URL } from '../config'

const baseUrl = API_URL + '/tips'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(console.log('tip deleted'))
}

export default { getAll, create, remove }