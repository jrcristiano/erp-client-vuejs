<template>
  <div class="category-list">
    <div class="w-100 d-flex justify-content-between px-3 pt-3">
      <h1>Categorias</h1>
      <router-link :to="{name: 'category-create'}" class="btn btn-primary mt-2 mb-2 font-weight-bold">
          <i class="fas fa-plus"></i> Nova categoria
      </router-link>
    </div>

    <div class="w-100 px-3 pt-1 py-4">
      <Message class="pt-3" />
    </div>

    <table class="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Criado em</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody v-if="categories.length">
          <tr v-for="(category, i) in categories" :key="i">
            <th scope="col">{{ category.id }}</th>
            <td>{{ category.name }}</td>
            <td>{{ category.created_at | format }}</td>
            <td>
              <router-link :to="{ name: 'category-view', params: { id: category.id } }" class="btn btn-primary btn-sm">
                <i class="fas fa-eye"></i>
              </router-link>
              <button class="btn btn-danger btn-sm ml-1">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

  </div>
</template>

<script>
import Message from '@/modules/core/components/shared/errors/Message'
import { fetchAll } from '@/modules/categories/services/category.js'
import moment from 'moment'

export default {
  name: 'categoryList',
  mounted() {
    this.getCategoryList()
  },
  components: {
    Message
  },
  data() {
    return {
      categories: []
    }
  },
  methods: {
    async getCategoryList() {
      let res = await fetchAll()
      this.categories = [...res.data.data]
    }
  },
  filters: {
    format(value) {
      return moment(value).format('DD/MM/Y')
    }
  }
}

</script>