import { http } from '@/modules/core/config/http.js'

export function fetchAll() {
  return http.get('/categories')
}

export function findById(id) {
  return http.get(`/categories/${id}`)
}