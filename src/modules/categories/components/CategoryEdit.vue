<template>
  <div class="category-edit">
     <div class="w-100 d-flex justify-content-between px-3 pt-3">
      <h1>Editar categoria</h1>
      <button @click="$router.go(-1)" class="btn btn-primary mt-2 mb-2 font-weight-bold">
          <i class="fas fa-undo"></i> Voltar
      </button>
    </div>

    <form @submit.prevent="save" class="w-100 px-3 py-4">
      <div class="form-group">
        <label for="name" class="font-weight-bold">
          Nome <span class="text-danger">*</span>
        </label>
        <input v-model="$v.form.name.$model"
          :class="{'is-invalid': $v.form.name.$error}"
          aria-describedby="name"
          class="form-control text-uppercase" 
          placeholder="Nome" 
          name="name" 
          id="name"
          minlength="3"
          maxlength="255"
          type="text">

        <div v-if="!$v.form.name.required" class="invalid-feedback">
          O campo nome é obrigatório.
        </div>

        <div v-if="!$v.form.name.minLength" class="invalid-feedback">
          O campo nome deve conter no mínimo 3 caracteres.
        </div>

        <div v-if="!$v.form.name.maxLength" class="invalid-feedback">
          O campo nome deve conter no máximo 255 caracteres.
        </div>

      </div>
      <div class="form-group">
        <button :disabled="$v.form.name.$invalid" class="btn btn-success font-weight-bold">
          <i class="fas fa-check"></i> Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { findById, save } from '@/modules/categories/services/category.js'
import { mapMutations } from 'vuex'

export default {
  name: 'category-edit',
  mounted() {
    this.getCategory()
  },
  data() {
    return {
      form: {},
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255)
      }
    }
  },
  methods: {
    ...mapMutations(['showFlash', 'showError']),
    async getCategory() {
      const id = this.$route.params.id
      let res = await findById(id)
      this.form = {...res.data.data}
    },
    async save() {
      let formValid = !this.$v.form.$invalid
      if (formValid) {
        try {
          const data = Object.assign({}, this.$v.form.$model)
          await save(data, this.$route.params.id)
          this.showFlash('Categoria editada com sucesso.')

        } catch (e) {
          this.showError('Erro ao editar categoria.')
        }

        return this.$router.push({name: 'category-list'})
      }
    }
  }
}
</script>