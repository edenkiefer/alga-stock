import axios from 'axios'

const http = axios.create({
  baseURL: 'http://127.0.0.1:3024',
  headers: {
    authorization: 'Bearer 123'
  }
})

export default http