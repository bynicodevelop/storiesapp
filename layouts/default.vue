<template>
  <v-app dark>
    <v-main>
      <v-container>
        <loading />
        <Nuxt />
        <notifications />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app>
      <v-col class="text-center">
        &copy; Copyright {{ new Date().getFullYear() }} - Stories.fans
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { defineComponent, onMounted, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('isLoaded')
    })
  },
})
</script>

<style lang="sass">
.v-footer
  background-color: #FFF !important
</style>
