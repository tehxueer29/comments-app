import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });