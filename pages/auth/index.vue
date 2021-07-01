<template>
  <div>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        name="email"
        label="Email"
        id="email"
        type="email"
        v-model="form.email"
      />
      <v-text-field
        name="password"
        label="Password"
        id="password"
        type="password"
        v-model="form.password"
      />
      <v-btn type="submit" color="success">Connection</v-btn>
    </v-form>
  </div>
</template>

<script>
import { useRouter, useStore } from '@nuxtjs/composition-api'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = ref({
      email: '',
      password: '',
    })

    const onSubmit = async () => {
      await store.dispatch('auth/signInWithEmailPassword', form.value)
      router.push({ name: 'home' })
    }

    return {
      form,
      onSubmit,
    }
  },
})
</script>
