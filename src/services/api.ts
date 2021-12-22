import axios from 'axios'
import { api_address } from '../variables'

export const api = axios.create({
  baseURL: api_address
})