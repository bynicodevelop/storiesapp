<template>
  <v-row justify="center" class="pb-15">
    <v-col cols="12" sm="8" align="center">
      <v-avatar size="120">
        <img :src="profile.photoURL" :alt="profile.displayName" />
      </v-avatar>
      <h1>{{ profile.displayName }}</h1>
      <h2 class="mb-2">@{{ profile.slug }}</h2>
      <p class="text-left font-weight-light" v-if="profile.bio != ''">
        {{ profile.bio }}
      </p>

      <v-row>
        <v-col>
          <p class="ma-0 pa-0 text-h6">
            <strong>{{ profile.nFollowers }}</strong>
          </p>
          <p class="ma-0 pa-0 text-overline">Followers</p>
        </v-col>
        <v-col>
          <p class="ma-0 pa-0 text-h6">
            <strong>{{ profile.nFollowed }}</strong>
          </p>
          <p class="ma-0 pa-0 text-overline">Subscriptions</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <follow-btn />

          <social-btn
            v-if="profile.youtube_link != ''"
            :link="profile.youtube_link"
            icon="youtube"
          />

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
    </v-col>
  </v-row>
</template>

<script>
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'
import { PROFILE } from '~/store/profile'

export default defineComponent({
  setup() {
    const store = useStore()

    const profile = computed(() => store.getters[PROFILE.GETTERS.GET_PROFILE])

    return { profile }
  },
})
</script>
