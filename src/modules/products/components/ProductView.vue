 <template> 
  <div class="product-list">
    <div class="w-100 d-flex justify-content-between px-3 pt-3">
      <h1 class="font-weight-bold text-uppercase">{{ product.name }}</h1>

      <div>
        <button @click="$router.back()" class="btn btn-primary font-weight-bold">
            <i class="fas fa-undo"></i> Voltar
        </button>
        <router-link :to="{name: 'product-edit'}" class="btn btn-warning font-weight-bold ml-2">
          <i class="fas fa-edit"></i> Editar produto
        </router-link>
        <button @click="destroy(product.id)" class="btn btn-danger font-weight-bold ml-2">
          <i class="fas fa-trash"></i> Remover produto
        </button>
      </div>
    </div>

    <div class="container-fluid p-4">
      <div class="row">
        <div class="col-6 mb-4">
          <span class="font-weight-bold">Preço</span>
          <div class="w-100 border rounded p-2">
            R$ {{ product.price | money }}
          </div>
        </div>
        <div v-if="product.category" class="col-6 mb-3">
          <span class="font-weight-bold mb-4">Categoria</span>
          <div class="w-100 border rounded p-2 text-uppercase">
            {{ product.category.name }}
          </div>
        </div>
        <div class="col-12 mb-4">
          <span class="font-weight-bold">Descrição</span>
          <div v-if="product.description" class="w-100 border rounded p-2">
            {{ product.description }}
          </div>
          <div v-else class="w-100 border rounded p-2 text-uppercase">
            <router-link :to="{ name: 'product-edit' }">Adicionar uma descrição a este produto</router-link>
          </div>
        </div>

        <div class="col-6 mb-3">
          <span class="font-weight-bold">Criado em</span>
          <div class="w-100 border rounded p-2">
            {{ product.created_at | format }}
          </div>
        </div>
        <div class="col-6 mb-3">
          <span class="font-weight-bold">Quantidade em estoque</span>
          <div class="w-100 border rounded p-2">
            10
          </div>
        </div>
      </div>
    </div>
      
    </div>
</template>

<script>
// @ is an alias to /src
import { findById, destroy } from '@/modules/products/services/product.js'
import moment from 'moment'
import { mapMutations } from 'vuex'

export default {
  name: 'product-view',
  created() {
    this.getProduct()
  },
  data() {
    return {
      product: {}
    }
  },
  methods: {
    async getProduct() {
      try {
        const id = this.$route.params.id
        let res = await findById(id)

        this.product = {...res.data.data}
      } catch (e) {
        this.$router.push({name: 'not-found'})
      }
    },
    async destroy(id) {
      if (confirm('Deseja mesmo remover este dado?')) {
        await destroy(id)
        this.showFlash('O produto foi removido com sucesso.')
        return this.$router.back()
      }
    },
    ...mapMutations(['showFlash'])
  },
  filters: {
    money(value) {
      let money = (value / 1).toFixed(2).replace('.', ',')
      return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    format(value) {
      return moment(value).format('DD/MM/YYYY')
    }
  }
}
</script>