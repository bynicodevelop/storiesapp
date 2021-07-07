<template>
  <div>
    <v-list>
      <v-list-item-group>
        <v-list-item link :to="{ name: 'settings-profile' }">
          <v-list-item-content>
            <v-list-item-title> Mes données personnelles </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-content>
            <v-list-item-title> Me déconnecter </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { defineComponent, useRouter, useStore } from '@nuxtjs/composition-api'
import { AUTH } from '~/store/auth'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const logout = async () => {
      await store.dispatch(AUTH.ACTIONS.SIGNOUT)

      router.push({ name: 'auth' })
    }

    return { logout }
  },
})
</script>
