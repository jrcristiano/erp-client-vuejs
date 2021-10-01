import { http } from '../../core/config/http'

export default {
  all() {
    return http.get('/products')
  },
  save(data, id = null) {
    if (!id) {
      return http.post('/products', data)
    }
  },
  findById(id) {
    return http.get(`/products/${id}`)
  },
  destroy(id) {
    return http.delete(`/products/${id}`)
  }
}
