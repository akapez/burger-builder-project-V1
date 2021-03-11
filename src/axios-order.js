import axios from 'axios'

const BASE_URL = process.env.REACT_APP_DATABASE_URL

const instance = axios.create({
  baseURL: BASE_URL,
})

export default instance
