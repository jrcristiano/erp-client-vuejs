import { http } from '../config/http'

export default {
  getCategoryNameAndId() {
    return http.get('/categories')
  },
  findById(id) {
    return http.get(`/categories/${id}`)
  }
}