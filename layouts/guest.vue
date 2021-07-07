<template>
  <v-app dark>
    <v-main>
      <v-app-bar>
        <arrow-back-component :is-mobile="isMobile" />

        <v-avatar size="25" class="mr-2">
          <img src="/images/logo.jpg" alt="Logo - Stories.fans" />
        </v-avatar>

        <v-toolbar-title>Stories.fans</v-toolbar-title>
      </v-app-bar>
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
  ref,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $vuetify } = useContext()
    const store = useStore()
    const isMobile = ref(false)

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize)
      store.dispatch('isLoaded')
    })

    const onResize = () => {
      isMobile.value = $vuetify.breakpoint.width < 600
    }

    return {
      isMobile,
    }
  },
})
</script>
