<template>
  <v-app dark>
    <v-main>
      <v-container>
        <loading-component />
        <Nuxt />
        <notifications />
      </v-container>
    </v-main>
    <footer-component />
  </v-app>
</template>

<script>
import {
  defineComponent,
  onMounted,
  useMeta,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('isLoaded')
    })
  },
})
</script>
