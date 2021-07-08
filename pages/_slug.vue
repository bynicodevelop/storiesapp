<template>
  <profile-header-component :profile="profile" />
</template>

<script>
import {
  computed,
  defineComponent,
  useAsync,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import ProfileHeaderComponent from '~/components/ProfileHeaderComponent.vue'
import { PROFILE } from '~/store/profile'

export default defineComponent({
  components: { ProfileHeaderComponent },
  setup() {
    const store = useStore()
    const route = useRoute()

    useAsync(() =>
      store.dispatch(PROFILE.ACTIONS.LOAD_PROFILE, {
        slug: route.value.params.slug.replace('@', ''),
      })
    )

    const profile = computed(() => store.getters[PROFILE.GETTERS.GET_PROFILE])

    return {
      profile,
    }
  },
})
</script>
