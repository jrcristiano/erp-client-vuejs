<template>
  <div class="alert alert-success alert-dismissible fade show" 
    v-if="flash.show"
    role="alert">
      <i class="fas fa-check"></i> {{ flash.message }}
    <button @click="hideFlash" type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'message',
  methods: {
    ...mapMutations(['hideFlash']),
  },
  computed: {
    ...mapState(['flash'])
  },
}

</script>