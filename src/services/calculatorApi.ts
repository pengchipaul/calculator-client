import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  throw error.response.data
});


const responseData = (response: AxiosResponse) => response.data


const requests = {
  post: (url: string, body: {}) => axios.post(url, body).then(responseData)
}

const Calculator = {
  add: (numberInput: { "Numbers": Number[]}) => requests.post('/calculate/add', numberInput),
  substract: (numberInput: { "Numbers": Number[]}) => requests.post('/calculate/substract', numberInput),
  multiply: (numberInput: { "Numbers": Number[]}) => requests.post('/calculate/multiply', numberInput),
  divide: (numberInput: { "Numbers": Number[]}) => requests.post('/calculate/divide', numberInput),
  splitEq: (numberInput: { "Numbers": Number[]}) => requests.post('/calculate/spliteq', numberInput),
  splitNum: (numberInput: { "Numbers": Number[]}) => requests.post('/calculate/splitnum', numberInput)
}

export default Calculator