<template>
  <v-bottom-navigation v-resize="onResize" v-if="width < 600" grow>
    <v-btn link :to="{ name: 'home' }" value="home">
      <span>Home</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn link :to="{ name: 'profile' }" value="profile">
      <span>Profile</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const width = ref(0)

    const onResize = () => (width.value = window.innerWidth)

    return { onResize, width }
  },
})
</script>
