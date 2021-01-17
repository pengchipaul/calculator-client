import axios from 'axios'
import { request } from 'http'
import { IRecord } from '../types/RecordType'

axios.defaults.baseURL = 'http://localhost:5000/api'

const requests = {
  post: (url: string, body: {}) => axios.post(url, body)
}

const Report = {
  pdf: (recordInput: { "Records": IRecord[]}) => requests.post('/report/pdf', recordInput)
}

export default Report