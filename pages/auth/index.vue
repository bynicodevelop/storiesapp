<template>
  <v-row align-self="center">
    <v-col cols="12" sm="6" offset-sm="3">
      <h1>Login</h1>
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
        <v-btn text link :to="{ name: 'auth-register' }">
          Create an account
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { useRouter, useStore } from '@nuxtjs/composition-api'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  layout: 'auth',
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
