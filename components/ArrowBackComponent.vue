<template>
  <div v-resize="onResize">
    <v-btn
      v-if="width < 600 && !excludeRouteName.includes(routeName)"
      text
      link
      @click.prevent="onBack"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const width = ref(0)
    const excludeRouteName = ['index', 'home', 'profile']
    const route = useRoute()
    const router = useRouter()

    const routeName = ref(route.value.name)

    watch(
      () => ref(route.value.name),
      (routeNameValue) => (routeName.value = routeNameValue.value)
    )

    const onBack = () => router.go(-1)

    const onResize = () => (width.value = window.innerWidth)

    return {
      onBack,
      routeName,
      excludeRouteName,
      onResize,
      width,
    }
  },
})
</script>
