 <template> 
  <div class="product-list">
    <div class="w-100 d-flex justify-content-between px-3 pt-3 ">
      <h1>Produtos</h1>

      <div>  
        <router-link :to="{name: 'product-create'}" class="btn btn-primary my-2 font-weight-bold">
          <i class="fas fa-plus"></i> Novo pedido
        </router-link>
      </div>
    </div>

    <div class="w-100 px-3 pt-1">
      <Message class="pt-3" />
    </div>

    <div class="w-100 px-3 pt-3 pb-3">
      <div class="w-25">
        <select name="categoria" 
          id="category" 
          class="form-control"
          @change="filteredProducts"
          v-model="selectedCategory">
            <option value="">SELECIONAR CATEGORIA</option>
            <option value="1">ELETRÔNICOS</option>
            <option value="2">ELETRODOMÉSTICOS</option>
            <option value="3">OUTROS</option>
        </select>
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
            <td>{{ product.category_id }}</td>
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
import { fetchAll, destroy } from '@/modules/products/services/products.js'
import moment from 'moment'
import Message from '@/modules/core/components/shared/errors/Message'
import { mapMutations } from 'vuex'

export default {
  name: 'product-list',
  created () {
    this.getProductList()
  },
  components: {
    Message
  },
  data() {
    return {
      products: [],
      selectedCategory: ''
    }
  },
  methods: {
    ...mapMutations(['showFlash']),
    async getProductList() {
      let res = await fetchAll()
      this.products = [...res.data.data]
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
    filteredProducts() {
      console.log('changed!')
    }
  },
  filters: {
    money(value) {
      let money = (value / 1).toFixed(2).replace('.', ',')
      return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    format(value) {
      return moment(value).format('DD/MM/Y')
    },
    uppercase(value) {
      return value.toUpperCase();
    }
  }
}
</script>