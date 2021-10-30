<template>
    <div class="category-list">
    <div class="w-100 d-flex justify-content-between px-3 pt-3">
      <h1>Clientes</h1>
      <router-link :to="{name: 'client-create'}" class="btn btn-primary mt-2 mb-2 font-weight-bold">
          <i class="fas fa-plus"></i> Novo cliente
      </router-link>
    </div>

    <div class="w-100 px-3 pt-1 py-4">
      <Success class="pt-3" />
      <Error class="pt-3" />
    </div>

    <table class="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">CPF/CNPJ</th>
            <th scope="col">Telefone</th>
            <th scope="col">Criado em</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody v-if="clients.length">
            <tr v-for="(client, i) in clients" :key="i">
                <th scope="row">{{ client.id }}</th>
                <td class="text-uppercase">{{ client.name }}</td>
                <td class="text-uppercase">{{ client.email }}</td>
                <td>{{ client.cpf_cnpj }}</td>
                <td>{{ client.phone }}</td>
                <td>{{ client.created_at | format }}</td>
                <td>
                  <router-link class="btn btn-primary btn-sm font-weight-bold" to="">
                    <i class="fas fa-eye"></i>
                  </router-link>
                  <button class="btn btn-danger btn-sm font-weight-bold ml-2">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center text-uppercase" colspan="7">
              <i class="fas fa-sad-tear"></i> Não há dados a serem exibidos.
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>

import { fetchAll } from '@/modules/clients/services/client.js'

import Success from '@/modules/core/components/shared/errors/Success'
import Error from '@/modules/core/components/shared/errors/Error'

import moment from 'moment'

export default {
  mounted() {
    this.init()
  },
  data() {
    return {
      clients: []
    }
  },
  components: {
    Success,
    Error
  },
  methods: {
    init() {
      this.getClientList()
    },
    async getClientList() {
      const res = await fetchAll()
      this.clients = [...res.data.data]
    }
  },
  filters: {
    format(value) {
      return moment(value).format('DD/MM/Y')
    } 
  }
}
</script>