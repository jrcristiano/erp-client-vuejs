import http from '@/modules/core/config/http.js'

export function fetchAll() {
  return http.get('/clients')
}
