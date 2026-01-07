
import axios from "axios";

const strapiRequest = axios.create({
  baseURL: `https://gorgeous-renewal-25d306a45d.strapiapp.com/api`,
  timeout: 100000,
})

const errorHandler = (error, hooks) => {
  
  return Promise.reject(error.response)
}


strapiRequest.interceptors.response.use((response) => {
  return  response?.data
}, errorHandler)

export default strapiRequest
