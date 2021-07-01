<template>
  <div>
    <v-btn type="button" color="success" @click="onSignOut">Logout</v-btn>
  </div>
</template>

<script>
import { useStore, useRouter } from '@nuxtjs/composition-api'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const onSignOut = async () => {
      await store.dispatch('auth/signOut')
      router.push({ name: 'auth' })
    }

    return { onSignOut }
  },
})
</script>
