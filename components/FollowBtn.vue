<template>
  <v-btn v-if="show" color="primary" small @click="follow(profile.uid)">
    {{ $t('components.btn.follow.follow-label') }}
  </v-btn>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { PROFILE } from '~/store/profile'

export default defineComponent({
  setup() {
    const { $cookies } = useContext()
    const store = useStore()

    const show = ref(false)
    const { uid } = $cookies.get('user')

    const profile = computed(() => store.getters[PROFILE.GETTERS.GET_PROFILE])

    watch(profile, (value) => (show.value = !(uid == value.uid)))

    const follow = async (uid) =>
      store.dispatch(PROFILE.ACTIONS.FOLLOW, { followUid: uid })

    return { show, profile, follow }
  },
})
</script>
