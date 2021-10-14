<template>
  <div class="category-view">
    <div class="w-100 d-flex justify-content-between px-3 pt-3">
      <h1>{{ this.category.name }}</h1>
      <router-link :to="{name: 'category-list'}" class="btn btn-primary mt-2 mb-2 font-weight-bold">
          <i class="fas fa-undo"></i> Voltar
      </router-link>
    </div>
  </div>
</template>

<script>
import { findById } from '@/modules/categories/services/category.js'

export default {
  name: 'category-view',
  mounted() {
    this.getCategory()
  },
  data() {
    return {
      category: {}
    }
  },
  methods: {
    async getCategory() {
      const id = this.$route.params.id
      let res = await findById(id)
      this.category = {...res.data.data}
    }
  }
}
</script>