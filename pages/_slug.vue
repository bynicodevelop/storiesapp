<template>
  <profile-header-component />
</template>

<script>
import {
  computed,
  defineComponent,
  useAsync,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { PROFILE } from '~/store/profile'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    useAsync(() =>
      store.dispatch(PROFILE.ACTIONS.LOAD_PROFILE, {
        slug: route.value.params.slug.replace('@', ''),
      })
    )

    const profile = computed(() => store.getters[PROFILE.GETTERS.GET_PROFILE])

    return { profile }
  },
})
</script>
