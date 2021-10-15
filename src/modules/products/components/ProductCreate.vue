<template>
  <div class="product-create">
    <div class="w-100 d-flex justify-content-between px-3 pt-3 ">
      <h1>Novo produto</h1>

      <div class="actions">
        <button @click="$router.back()" class="btn btn-primary my-2 font-weight-bold">
          <i class="fas fa-undo"></i> Voltar
        </button>
      </div>
    </div>

    <form @submit.prevent="save" class="py-4 px-3" method="post">
      <div class="form-group mb-4">
          <div class="row">
              <div class="col-6">
                  <label class="font-weight-bold" for="name">
                      Nome <span class="text-danger font-weight-bold">*</span>
                  </label>
                  <input type="text" 
                    v-model.lazy="$v.form.name.$model"
                    aria-describedby="name"
                    class="form-control" 
                    :class="{'is-invalid': $v.form.name.$error}"
                    @change="$v.form.name.$touch()"
                    placeholder="Nome"
                    id="name">

                <div v-if="!$v.form.name.required" 
                  id="name" 
                  class="invalid-feedback">
                    O campo nome é obrigatório.
                </div>

                <div v-if="!$v.form.name.minLength" 
                  id="validationServer03Feedback" 
                  class="invalid-feedback">
                    O campo nome deve contar pelo menos 3 caracteres.
                </div>

                <div v-if="!$v.form.name.maxLength" 
                  id="validationServer03Feedback" 
                  class="invalid-feedback">
                    O campo nome deve contar pelo menos 255 caracteres.
                </div>
              </div>

              <div class="col-6">
                <label class="font-weight-bold" for="price">
                    Preço <span class="text-danger font-weight-bold">*</span>
                </label>
                <input v-model.lazy="$v.form.price.$model"
                  v-money="money"
                  class="form-control" 
                  id="price" 
                  placeholder="Preço" 
                  type="text"
                  :class="{ 'is-invalid': $v.form.price.$error && $v.form.price.$touch() }"
                  @change="$v.form.price.$touch()" />

                <div v-if="!$v.form.price.required" id="validationServer03Feedback" class="invalid-feedback">
                  O campo preço é obrigatório.
                </div>

                <div v-if="!$v.form.price.between && $v.form.price.$touch()" id="validationServer03Feedback" class="invalid-feedback">
                  O campo preço deve ter valor superior a 0,01.
                </div>
              </div>
          </div>
      </div>

      <div class="form-group mb-3">
          <label class="font-weight-bold" for="category_id">
            Categoria <span class="text-danger font-weight-bold">*</span>
          </label>
          <select v-model="$v.form.category_id.$model" 
            class="form-control" 
            name="category_id" 
            id="category_id"
            :class="{ 'is-invalid': $v.form.category_id.$error }">
            <option value="">SELECIONAR CATEGORIA DO PRODUTO</option>
            <option v-for="(category, i) in categories" :key="i" :value="category.id">
              {{ category.name }}
            </option>
          </select>

          <div v-if="$v.form.category_id.$error" id="validationServer03Feedback" class="invalid-feedback">
            O campo categoria é obrigatório.
          </div>
      </div>

      <div class="form-group mb-3">
        <label class="font-weight-bold" for="description">
          Descrição
        </label>
        <textarea v-model="$v.form.description.$model" 
          class="form-control" 
          name="description" 
          id="description" 
          cols="30"></textarea>
      </div>

    <button @click="$v.$touch()"
      :disabled="$v.$invalid"
      type="submit" 
      class="btn btn-success">
        <i class="fas fa-check"></i> Salvar
    </button>
  </form>
  </div>
</template>

<script>

import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
import { save } from '@/modules/products/services/product.js'
import { fetchAll as allCategories } from '@/modules/categories/services/category.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'product-create',
  mounted() {
    this.getCategories()
  },
  data() {
    return {
      money: {
        decimal: '.',
        thousands: '',
        precision: 2,
        masked: false
      },
      form: {
        name: '',
        price: '',
        description: '',
        category_id: ''
      },
      categories: []
    }
  },
  validations: {
    form: {
      name: { 
        required, 
        minLength: minLength(3),
        maxLength: maxLength(255)
      },
      price: {
        required, 
        between: between(0.01, 9999999)
      },
      category_id: { required },
      description: {}
    }
  },
  computed: {
    ...mapState(['flash'])
  },
  methods: {
    ...mapMutations(['showFlash', 'showError']),
    async save() {
      let formValid = !this.$v.$invalid
      if (formValid) {
        try {
          const data = Object.assign({}, this.$v.form.$model)
          await save(data)
          this.showFlash('Produto salvo com sucesso.')

        } catch (e) {
          this.showError('Erro ao salvar produto.')
        }

        return this.$router.push({name: 'product-list'})
      }
    },
    async getCategories() {
      const res = await allCategories()
      this.categories = [...res.data.data]
    }
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase()
    }
  }
}
</script>


