<template>
  <v-btn
    v-if="isMobile && routeName != 'index' && routeName != 'home'"
    text
    link
    @click.prevent="onBack"
  >
    <v-icon>mdi-chevron-left</v-icon>
  </v-btn>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isMobile = ref(false)
    const { $vuetify } = useContext()
    const route = useRoute()
    const router = useRouter()

    const routeName = ref(route.value.name)

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize)
    })

    const onResize = () => {
      isMobile.value = $vuetify.breakpoint.width < 600
    }

    watch(
      () => ref(route.value.name),
      (routeNameValue) => (routeName.value = routeNameValue.value)
    )

    const onBack = () => router.go(-1)

    return {
      onBack,
      isMobile,
      routeName,
    }
  },
})
</script>
