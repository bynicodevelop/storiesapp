<template>
  <v-row>
    <v-col>
      <validation-observer>
        <v-form class="mb-5" @submit.prevent="save">
          <h2 class="mb-5">Informations générales</h2>

          <validation-provider
            name="username"
            v-slot="{ errors }"
            rules="required"
          >
            <v-text-field
              v-model="form.displayName"
              name="username"
              :label="
                $t('pages.settings.profile.form.input.display-name.label')
              "
              :error-messages="errors"
              outlined
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            name="username"
            v-slot="{ errors }"
            rules="required|unique_slug|is_slug"
          >
            <v-text-field
              v-model="form.slug"
              name="username"
              :label="$t('pages.settings.profile.form.input.slug.label')"
              :error-messages="errors"
              outlined
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            name="email"
            v-slot="{ errors }"
            rules="required|email|unique_email"
          >
            <v-text-field
              v-model="form.email"
              name="email"
              type="email"
              :label="$t('pages.settings.profile.form.input.email.label')"
              :error-messages="errors"
              required
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider name="username" v-slot="{ errors }" rules="">
            <v-textarea
              v-model="form.bio"
              outlined
              name="bio"
              :label="$t('pages.settings.profile.form.input.bio.label')"
              :error-messages="errors"
              counter="255"
            ></v-textarea>
          </validation-provider>

          <h2 class="mb-5">Informations sociales</h2>

          <validation-provider name="youtube_link" v-slot="{ errors }" rules="">
            <v-text-field
              v-model="form.youtube_link"
              name="youtube_link"
              :label="
                $t('pages.settings.profile.form.input.youtube_link.label')
              "
              :error-messages="errors"
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider name="twitter_link" v-slot="{ errors }" rules="">
            <v-text-field
              v-model="form.twitter_link"
              name="twitter_link"
              :label="
                $t('pages.settings.profile.form.input.twitter_link.label')
              "
              :error-messages="errors"
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider
            name="instagram_link"
            v-slot="{ errors }"
            rules=""
          >
            <v-text-field
              v-model="form.instagram_link"
              name="instagram_link"
              :label="
                $t('pages.settings.profile.form.input.instagram_link.label')
              "
              :error-messages="errors"
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider
            name="facebook_link"
            v-slot="{ errors }"
            rules=""
          >
            <v-text-field
              v-model="form.facebook_link"
              name="facebook_link"
              :label="
                $t('pages.settings.profile.form.input.facebook_link.label')
              "
              :error-messages="errors"
              outlined
            ></v-text-field>
          </validation-provider>

          <validation-provider
            name="snapchat_link"
            v-slot="{ errors }"
            rules=""
          >
            <v-text-field
              v-model="form.snapchat_link"
              name="snapchat_link"
              :label="
                $t('pages.settings.profile.form.input.snapchat_link.label')
              "
              :error-messages="errors"
              outlined
            ></v-text-field>
          </validation-provider>

          <v-btn type="submit" color="#FC57D2" dark block>
            {{ $t('pages.settings.profile.form.btn.label') }}
          </v-btn>
        </v-form>
      </validation-observer>
    </v-col>
  </v-row>
</template>

<script>
import {
  computed,
  defineComponent,
  useAsync,
  useStore,
} from '@nuxtjs/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { AUTH } from '~/store/auth'
import { BUS_NOTIFICATIONS } from '~/store/bus-notifications'

export default defineComponent({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  setup() {
    const store = useStore()

    useAsync(() => store.dispatch(AUTH.ACTIONS.GET_PROFILE))

    const form = computed(() => store.getters[AUTH.GETTERS.GET_PROFILE])

    const save = async () => {
      // TODO: Si exception déconnecter l'utilisateur
      await store.dispatch(AUTH.ACTIONS.SAVE_PROFILE, form.value)

      await store.dispatch(BUS_NOTIFICATIONS.ACTIONS.SEND, {
        message: 'pages.settings.profile.form.messages.updated',
      })
    }

    return { form, save }
  },
})
</script>
