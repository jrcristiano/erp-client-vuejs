<template>
    <div>
      <div class="w-100 d-flex justify-content-center">
        <img class="mx-auto"
        width="800" 
        height="800" 
        :src="NotFound" 
        alt="Not Found" />
      </div>
    </div>
</template>

<script>
import NotFound from '@/assets/not-found.jpg'

export default {
  name: 'not-found',
  data() {
    return {
      NotFound
    }
  }
}
</script>
