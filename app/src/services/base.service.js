import axios from 'axios'

export class BaseService {
  constructor(baseUrl) {
    this.baseUrl = `https://gameflix.herokuapp.com/api/${baseUrl}`
  }

  get() {
    return axios.get(this.baseUrl)
  }

  post(body) {
    return axios.post(this.baseUrl, body)
  }

  put(body) {
    return axios.post(this.baseUrl, body)
  }

  delete(body) {
    return axios.post(this.baseUrl, body)
  }
}
