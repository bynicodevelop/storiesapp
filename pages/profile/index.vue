<template>
  <div>
    <v-row>
      <v-col align="right">
        <v-btn text link :to="{ name: 'settings' }">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <profile-header-component :display-follow-btn="false" :profile="profile" />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useAsync,
  useStore,
} from '@nuxtjs/composition-api'
import { AUTH } from '~/store/auth'

export default defineComponent({
  setup() {
    const store = useStore()
    useAsync(() => store.dispatch(AUTH.ACTIONS.GET_PROFILE))

    const profile = computed(() => store.getters[AUTH.GETTERS.GET_PROFILE])

    return {
      profile,
    }
  },
})
</script>
