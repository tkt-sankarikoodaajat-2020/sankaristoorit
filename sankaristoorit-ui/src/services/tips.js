import axios from 'axios'
import { API_URL } from '../config'

const baseUrl = API_URL + '/tips'


const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async newObject => {
  let token = localStorage.getItem('token')
  if (!token) token = ''
  const config = {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(console.log('tip deleted'))
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const get_title = async (url) => {
  try {
    const res = await axios.get(baseUrl + '/get_title/' + encodeURIComponent(url))
    return res.data.title
  } catch (e) {
    return
  }
}

export default { getAll, create, remove, get_title, update }
