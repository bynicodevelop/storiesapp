<template>
  <div>
    <v-list three-line class="mb-10">
      <template v-for="(item, index) in profiles">
        <v-list-item
          :key="index"
          link
          :to="{ name: 'slug', params: { slug: `@${item.slug}` } }"
        >
          <v-list-item-avatar>
            <v-img :src="item.photoURL"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.displayName"></v-list-item-title>
            <v-list-item-subtitle v-html="item.bio"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider
          v-if="index < profiles.length - 1"
          :key="`divider-${index}`"
          inset
        ></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useAsync,
  useStore,
} from '@nuxtjs/composition-api'
import { PROFILE } from '~/store/profile'

export default defineComponent({
  setup() {
    const store = useStore()

    useAsync(async () => {
      await store.dispatch(PROFILE.ACTIONS.LIST_PROFILE)
    })

    const profiles = computed(
      () => store.getters[PROFILE.GETTERS.LIST_PROFILES]
    )

    return {
      profiles,
    }
  },
})
</script>
