<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" align="center">
      <v-avatar size="120">
        <img :src="profile.photoURL" :alt="profile.displayName" />
      </v-avatar>
      <h1>{{ profile.displayName }}</h1>
      <h2 class="mb-2">@{{ profile.slug }}</h2>
      <p v-if="profile.bio != ''">{{ profile.bio }}</p>

      <v-btn color="primary" small>
        {{ $t('components.btn.follow.follow-label') }}
      </v-btn>

      <social-btn
        v-if="profile.twitter_link != ''"
        :link="profile.twitter_link"
        icon="twitter"
      />

      <social-btn
        v-if="profile.instagram_link != ''"
        :link="profile.instagram_link"
        icon="instagram"
      />

      <social-btn
        v-if="profile.facebook_link != ''"
        :link="profile.facebook_link"
        icon="facebook"
      />

      <social-btn
        v-if="profile.snapchat_link != ''"
        :link="profile.snapchat_link"
        icon="snapchat"
      />
    </v-col>
  </v-row>
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

    return {
      profile,
    }
  },
})
</script>
