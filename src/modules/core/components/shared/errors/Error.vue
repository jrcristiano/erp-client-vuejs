<template>
  <div class="alert alert-danger alert-dismissible fade show" 
    v-if="error.show"
    role="alert">
      <i class="fas fa-check"></i> {{ error.message }}
    <button @click="hideError" type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'message',
  methods: {
    ...mapMutations(['hideError']),
  },
  computed: {
    ...mapState(['error'])
  },
}

</script>