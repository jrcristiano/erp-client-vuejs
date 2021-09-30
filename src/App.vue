<template>
  <div class="container-fluid position-fixed" id="app">
    <div class="row">
      <div class="col-2 px-0">
        <navbar />
      </div>

      <div class="col-10 px-0">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>

* {font-family: 'Roboto', sans-serif;}

</style>

<script>
import Navbar from '@/components/shared/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}

</script>

