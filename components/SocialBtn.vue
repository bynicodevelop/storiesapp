<template>
  <v-btn text link small :href="link" target="_blank">
    <v-icon>mdi-{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    link: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
})
</script>
