<template>
  <div class="category-list">
    <div class="w-100 d-flex justify-content-between px-3 pt-3">
      <h1>Novo cliente</h1>
      <router-link :to="{name: 'client-list'}" class="btn btn-primary mt-2 mb-2 font-weight-bold">
          <i class="fas fa-undo"></i> Voltar
      </router-link>
    </div>

    <div class="w-100">
      <form @submit.prevent="save">
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
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'client-create',
  monted() {
    
  },
  data() {
    return {

    }
  }
}
</script>
