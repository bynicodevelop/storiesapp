<template>
  <v-row align-self="center">
    <v-col cols="12" sm="6" offset-sm="3">
      <h1>{{ $t('pages.auth.index.title') }}</h1>
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          name="email"
          :label="$t('pages.auth.index.input.email.label')"
          id="email"
          type="email"
          v-model="form.email"
        />
        <v-text-field
          name="password"
          :label="$t('pages.auth.index.input.password.label')"
          id="password"
          type="password"
          v-model="form.password"
        />
        <v-btn type="submit" color="success">{{
          $t('pages.auth.index.btn.connection.label')
        }}</v-btn>
        <v-btn text link :to="{ name: 'auth-register' }">
          {{ $t('pages.auth.index.btn.create-account.label') }}
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
