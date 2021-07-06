<template>
  <v-snackbar v-model="show" :timeout="timeout">
    {{ $t(message) }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { defineComponent, ref, useStore, watch } from '@nuxtjs/composition-api'
import { BUS_NOTIFICATIONS } from '~/store/bus-notifications'

export default defineComponent({
  setup() {
    const store = useStore()

    const timeout = ref(4000)

    const message = ref(null)
    const show = ref(false)

    watch(
      () => ref(store.getters[BUS_NOTIFICATIONS.GETTERS.GET_FLASH_MESSAGE]),
      (bus) => {
        if (bus.value.show) {
          message.value = bus.value.message
          show.value = bus.value.show
        }
      }
    )

    watch(show, (value) => {
      if (!value) {
        store.dispatch(BUS_NOTIFICATIONS.ACTIONS.RESET)

        message.value = ''
        show.value = false
      }
    })

    return {
      show,
      timeout,
      message,
    }
  },
})
</script>
