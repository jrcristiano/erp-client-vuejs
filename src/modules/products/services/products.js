import http from '@/modules/core/config/http.js'

export function fetchAll() {
  return http.get('/products')
}

export function save(data, id = null) {
  if (!id) {
    return http.post('/products', data)
  }

  return http.put(`/products/${id}`, data)
}

export function findById(id) {
  return http.get(`/products/${id}`)
}

export function destroy(id) {
  return http.delete(`/products/${id}`)
}
