import http from '@/modules/core/config/http.js'

export function fetchAll() {
  return http.get('/categories')
}

export function save(data, id = null) {
  if (!id) {
    return http.post('/categories', data)
  }

  return http.put(`/categories/${id}`, data)
}

export function findById(id) {
  return http.get(`/categories/${id}`)
}

export function destroy(id) {
  return http.delete(`/categories/${id}`)
}
