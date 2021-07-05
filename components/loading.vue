<template>
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useStore,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const loading = computed(() => store.state.loading)

    return {
      loading,
    }
  },
})
</script>

<style scoped>
.loading-page {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
