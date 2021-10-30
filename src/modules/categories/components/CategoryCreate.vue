<template>
  <div class="category-list">
    <div class="w-100 d-flex justify-content-between px-3 pt-3">
      <h1>Nova categoria</h1>
      <router-link :to="{name: 'category-list'}" class="btn btn-primary mt-2 mb-2 font-weight-bold">
          <i class="fas fa-undo"></i> Voltar
      </router-link>
    </div>

    <div class="w-100">
      <form @submit.prevent="save" class="py-4 px-3" method="post">
        <div class="form-group">
          <label class="font-weight-bold" for="name">
            Nome <span class="text-danger">*</span>
          </label>
          <input v-model="$v.form.name.$model" 
            :class="{'is-invalid': $v.form.name.$error}"
            aria-describedby="name"
            class="form-control"
            type="text"
            name="name"
            placeholder="Nome"
            id="name" />

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
          <button type="submit" 
            :disabled="$v.$invalid"
            class="btn btn-success font-weight-bold">
              <i class="fas fa-check"></i> Salvar
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
import { save } from '@/modules/categories/services/category.js'

export default {
  name: 'categoryCreate',
  data() {
    return {
      form: {
        name: ''
      }
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
    async save() {
      let formValid = !this.$v.form.$invalid
      if (formValid) {
        try {
          const data = Object.assign({}, this.$v.form.$model)
          await save(data)
          this.showFlash('Categoria cadastrada com sucesso.')

        } catch (e) {
          this.showError('Erro ao salvar categoria.')
        }

        this.$router.push({name: 'category-list'})
      }
    }
  }
}

</script>
