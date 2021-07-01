<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      coucou {{ name }} {{ $t('message') }}
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      name: 'john',
    }
  },
})
</script>
