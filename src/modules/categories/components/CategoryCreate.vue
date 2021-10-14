<template>
  <div class="category-list">
    <div class="w-100 d-flex justify-content-between px-3 pt-3">
      <h1>Nova categoria</h1>
      <router-link :to="{name: 'category-list'}" class="btn btn-primary mt-2 mb-2 font-weight-bold">
          <i class="fas fa-undo"></i> Voltar
      </router-link>
    </div>
  </div>
</template>