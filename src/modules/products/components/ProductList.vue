 <template> 
  <div class="product-list">
    <div class="w-100 d-flex justify-content-between px-3 pt-3 ">
      <h1>Produtos</h1>

      <div>
        <button class="btn btn-danger mr-1">
          <i class="fas fa-sort-amount-down"></i> Estoque baixo
        </button>
        
        <router-link :to="{name: 'product-create'}" class="btn btn-primary my-2 font-weight-bold">
          <i class="fas fa-plus"></i> Novo pedido
        </router-link>
      </div>
    </div>

    <div class="w-100 p-3">
      <div class="alert alert-success alert-dismissible fade show" 
        v-if="flash.show"
        role="alert">
          <i class="fas fa-check"></i> {{ flash.message }}
        <button @click="hideFlash" type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>

      <table class="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Categoria</th>
            <th scope="col">Criado em</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody v-if="products.length">
          <tr v-for="(product, i) in products" :key="i">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name | uppercase }}</td>
            <td>R$ {{ product.price | money }}</td>
            <td>{{ product.category | uppercase }}</td>
            <td>{{ product.created_at | format }}</td>
            <td>
              <router-link :to="{ name: 'product-view', params: { id: product.id } }" class="btn-sm mr-1 btn btn-primary">
                <i class="fas fa-eye" />
              </router-link>
              <button @click="destroy(product.id)" class="btn-sm btn btn-danger">
                <i class="fas fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center text-uppercase" colspan="6">
              <i class="fas fa-sad-tear"></i> Não há dados a serem exibidos.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
// @ is an alias to /src
import { all, destroy } from '@/modules/products/services/products.js'
import moment from 'moment';
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'product-list',
  created () {
    this.getProducts()
  },
  components: {

  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    ...mapMutations(['hideFlash']),
    async getProducts() {
      let res = await all()
      this.products = res.data
    },
    async destroy(id) {
      if (confirm('Deseja mesmo remover este dado?')) {
        this.products = this.products.filter(product => {
          return product.id != id
        })

        this.showFlash('O produto foi removido com sucesso.')
        await destroy(id)
      }
    },
    ...mapMutations(['showFlash'])
  },
  computed: {
    ...mapState(['flash'])
  },
  filters: {
    money(value) {
      let money = (value / 1).toFixed(2).replace('.', ',')
      return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    format(value) {
      return moment(value).format('Y/MM/DD')
    },
    uppercase(value) {
      return value.toUpperCase();
    }
  }
}
</script>