<template>
  <div id="navbar" class="bg-primary vh-100">

      <div class="w-100 d-flex justify-content-center p-4">
        <img width="160" height="80" :src="Logo" alt="SoftGenese">
      </div>

      <div class="w-100 py-1 px-3">
          <span class="text-white font-weight-bold">Cristiano</span>
      </div>

      <ul class="nav flex-column mb-3">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" 
            class="nav-link border-top-cyan border-bottom-cyan text-center"
            exact>
              <i class="fas fa-chart-pie"></i> Dashboard
            </router-link>
        </li>
      </ul>

      <ul class="nav flex-column mb-4">
        <div class="w-100 py-1 px-3">
          <span class="text-white font-weight-bold">Registros</span>
        </div>

        <li class="nav-item">
          <router-link class="nav-link" :to="{name: register.route}" 
            v-for="(register, i) in nav.registers" 
            :key="i" 
            :class="register.class"
            exact>
              <i class="ml-3" :class="register.icon"></i> {{ register.title }}
          </router-link>
        </li>
      </ul>

      <!-- <ul class="nav flex-column mb-4">
        <div class="w-100 py-1 px-3">
          <span class="text-white font-weight-bold">Financeiro</span>
        </div>

        <router-link class="nav-link" 
          :to="{name: fin.route}" v-for="(fin, i) in nav.financial" 
          :key="i" 
          :class="fin.class">
            <i class="ml-3" :class="fin.icon"></i> {{ fin.title }}
        </router-link>
      </ul>

      <ul class="nav flex-column mb-4">
        <div class="w-100 py-1 px-3">
          <span class="text-white font-weight-bold">Operacional</span>
        </div>

        <router-link class="nav-link" 
          :to="{name: op.route}" v-for="(op, i) in nav.operacional" 
          :key="i" 
          :class="op.class">
            <i class="ml-3" :class="op.icon"></i> {{ op.title }}
        </router-link>
      </ul>

      <div class="w-100 py-1 px-3">
          <span class="text-white font-weight-bold">Mais</span>
      </div>

      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" 
            class="nav-link border-top-cyan border-bottom-cyan"
            exact>
              <i class="fas fa-sign-out-alt ml-3"></i> Logout
            </router-link>
        </li>
      </ul>-->
  </div>
</template>

<script>

import Logo from '@/assets/light-logo.png'

export default {
  data() {
    return {
      nav: {
        registers: [
          {icon: 'fas fa-shopping-cart', class: 'border-top-cyan', route: 'product-list', title: 'Produtos'},
          {icon: 'fas fa-layer-group', class: 'border-top-cyan', route: 'category-list', title: 'Categorias'},
          {icon: 'fas fa-user-tie', class: 'border-bottom-cyan border-top-cyan', route: 'client-list', title: 'Clientes'},
          {icon: 'fas fa-gift', class: 'border-bottom-cyan', route: 'provider-list', title: 'Fornecedores'},
          {icon: 'fas fa-users-cog', class: 'border-bottom-cyan', route: 'manager-list', title: 'Gerentes'},
          {icon: 'fas fa-university', class: 'border-bottom-cyan', route: 'bank-list', title: 'Bancos'}
        ],
        financial: [
          {icon: 'fas fa-file-invoice-dollar', class: 'border-bottom-cyan border-top-cyan', route: 'bill-list', title: 'Contas a pagar'},
          {icon: 'fas fa-piggy-bank', class: 'border-bottom-cyan', route: 'bills-receive-list', title: 'Contas a receber'},
          {icon: 'fas fa-box-open', class: 'border-bottom-cyan', route: 'cash-flow-list', title: 'Fluxo de caixa'},
          {icon: 'fas fa-exchange-alt', class: 'border-bottom-cyan', route: 'transfer-list', title: 'Transferências'},
        ],
        operacional: [
          {
            icon: 'fas fa-file-invoice-dollar', 
            class: 'border-bottom-cyan border-top-cyan', 
            route: 'call-center-list', 
            title: 'Central de atendimento'
          }
        ]
      },
      Logo
    }
  },
}
</script>

<style scoped>
  #navbar {
    overflow-y: scroll;
  }

  .nav-link {
      color: white;
      font-size: 14px !important;
  }

  .nav-link:hover {
      color: white;
      background-color: #006BFF;
      font-size: 14px !important;
  }

  .nav-link-active {
    background-color: #006BFF;
  }

  .border-top-cyan {
    border-top: 1px solid #6cb2eb;
  }

  .border-bottom-cyan {
    border-bottom: 1px solid #6cb2eb;
  }
</style>