<template>
  <div class="product-edit">
    <div class="w-100 d-flex justify-content-between px-3 pt-3 ">
      <h1>Editar produto</h1>

      <div class="actions">
        <button @click="$router.back()" class="btn btn-primary my-2 font-weight-bold">
          <i class="fas fa-undo"></i> Voltar
        </button>
      </div>
    </div>

    <form @submit.prevent="edit" class="py-4 px-3" method="post">
      <div class="form-group mb-4">
          <div class="row">
              <div class="col-6">
                  <label class="font-weight-bold" for="validationServer03">
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

                <div v-if="!$v.form.price.between" id="validationServer03Feedback" class="invalid-feedback">
                  O campo preço deve ter valor superior a 0,01.
                </div>
              </div>
          </div>
      </div>

      <div class="form-group mb-3">
          <label class="font-weight-bold" for="category_id">
            Categoria <span class="text-danger font-weight-bold">*</span>
          </label>
          <select @change="onChangeCategory"
            class="form-control" 
            name="category_id" 
            id="category_id"
            :class="{ 'is-invalid': $v.form.category_id.$error }">
              <option value="">SELECIONAR CATEGORIA DO PRODUTO</option>
              <option :selected="$v.form.category_id.$model == 1" value="ELETRÔNICOS">ELETRÔNICOS</option>
              <option :selected="$v.form.category_id.$model == 2" value="ELETRODOMÉSTICOS">ELETRODOMÉSTICOS</option>
              <option :selected="$v.form.category_id.$model == 3" value="OUTROS">OUTROS</option>
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
import { save, findById } from '@/modules/products/services/products.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'product-create',
  created() {
    this.getProduct()
  },
  data() {
    return {
      money: {
        decimal: '.',
        thousands: '',
        precision: 2,
        masked: false
      },
      form: {}
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
      category_id: { required },
      description: {}
    }
  },
  computed: {
    ...mapState(['flash'])
  },
  methods: {
    ...mapMutations(['showFlash', 'showError']),
    async getProduct() {
      const id = this.$route.params.id
      const res = await findById(id)

      this.form = {...res.data.data}
    },
    async edit() {
      const formValid = !this.$v.$invalid
      if (formValid) {
        try {
          const data = Object.assign({}, this.$v.form.$model)
          console.log(await save(data, this.$route.params.id))
          this.showFlash('Produto editado com sucesso.')

        } catch (e) {
          this.showError('Erro ao editar produto.')
        }

        return this.$router.push({name: 'product-list'})
      }
    },
    onChangeCategory(e) {
      this.form.category_id = e.target.value
    }
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase()
    }
  }
}
</script>
