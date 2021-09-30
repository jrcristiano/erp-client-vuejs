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
                  <label class="font-weight-bold" for="validationServer03">
                      Nome <span class="text-danger font-weight-bold">*</span>
                  </label>
                  <input type="text" 
                    v-model.lazy="$v.form.name.$model"
                    aria-describedby="validationServer03Feedback"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.form.name.$error }"
                    @change="$v.form.name.$touch()"
                    placeholder="Nome"
                    id="validationServer03">

                <div v-if="!$v.form.name.required" id="validationServer03Feedback" class="invalid-feedback">
                  O campo nome é obrigatório.
                </div>

                <div v-if="!$v.form.name.minLength" id="validationServer03Feedback" class="invalid-feedback">
                  O campo nome deve contar pelo menos 3 caracteres.
                </div>

                <div v-if="!$v.form.name.maxLength" id="validationServer03Feedback" class="invalid-feedback">
                  O campo nome deve contar pelo menos 255 caracteres.
                </div>
              </div>

              <div class="col-6">
                <label class="font-weight-bold" for="price">
                    Preço <span class="text-danger font-weight-bold">*</span>
                </label>
                <input v-model.lazy="$v.form.price.$model"
                  class="form-control" 
                  id="price" 
                  placeholder="Preço" 
                  type="number"
                  step="0.01"
                  :class="{ 'is-invalid': $v.form.price.$error }"
                  @change="$v.form.price.$touch()" />

                <div v-if="!$v.form.price.required" id="validationServer03Feedback" class="invalid-feedback">
                  O campo preço é obrigatório.
                </div>

                <div v-if="!$v.form.price.between" id="validationServer03Feedback" class="invalid-feedback">
                  O campo preço deve ter valor superior a 0,01.
                </div>
              </div>
          </div>
      </div>

      <div class="form-group mb-3">
          <label class="font-weight-bold" for="category">
            Categoria <span class="text-danger font-weight-bold">*</span>
          </label>
          <select v-model="$v.form.category.$model" 
            class="form-control" 
            name="category" 
            id="category"
            :class="{ 'is-invalid': $v.form.category.$error }">
            <option value="">SELECIONAR CATEGORIA DO PRODUTO</option>
            <option value="ELETRÔNICOS">ELETRÔNICOS</option>
            <option value="ELETRODOMÉSTICOS">ELETRODOMÉSTICOS</option>
            <option value="OUTROS">OUTROS</option>
          </select>

          <div v-if="$v.form.category.$error" id="validationServer03Feedback" class="invalid-feedback">
            O campo categoria é obrigatório.
          </div>
      </div>

      <div class="form-group mb-3">
        <label class="font-weight-bold" for="description">
          Descrição
        </label>
        <textarea v-model="form.description" 
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
import products from '@/app/services/products'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'product-create',
  created() {
  },
  data() {
    return {
      categories: undefined,
      form: {
        name: '',
        price: '',
        description: '',
        category: ''
      }
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
        between: between(0.1, 9999999)
      },
      category: { required }
    }
  },
  computed: {
    ...mapState(['flash'])
  },
  methods: {
    ...mapMutations(['showFlash']),
    async save() {
      const data = Object.assign({}, this.$v.form.$model)
      const formValid = !this.$v.$invalid

      if (formValid) {
        await products.save(data)
        this.showFlash('Produto salvo com sucesso.')
        return this.$router.push({name: 'product-list'})
      }
    }
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase()
    }
  }
}
</script>


