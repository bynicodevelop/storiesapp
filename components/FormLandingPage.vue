<template>
  <div>
    <validation-observer>
      <v-form class="mb-5" @submit.prevent="registerUser">
        <validation-provider
          name="username"
          v-slot="{ errors }"
          rules="required"
        >
          <v-text-field
            v-model="form.username"
            name="username"
            :label="$t('components.form-landing.input.username.label')"
            :error-messages="errors"
            outlined
            required
          ></v-text-field>
        </validation-provider>

        <validation-provider
          name="slug"
          v-slot="{ errors }"
          rules="required|unique_slug|is_slug"
        >
          <v-text-field
            v-model="form.slug"
            name="slug"
            :label="$t('components.form-landing.input.slug.label')"
            :error-messages="errors"
            required
            outlined
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
            :label="$t('components.form-landing.input.email.label')"
            :error-messages="errors"
            required
            outlined
          ></v-text-field>
        </validation-provider>
        <v-btn type="submit" color="#FC57D2" dark block>
          {{ $t('components.form-landing.button.label') }}
        </v-btn>
      </v-form>
    </validation-observer>

    <p id="form-mentions">{{ $t('components.form-landing.mentions') }}</p>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  defineComponent,
  ref,
  useContext,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import slugify from 'slugify'
import { BUS_NOTIFICATIONS } from '~/store/bus-notifications'
import SlugAlreadyExistsException from '~/exceptions/SlugAlreadyExistsException'
import EmailAlreadyExistsException from '~/exceptions/EmailAlreadyExistsException'

export default defineComponent({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  setup() {
    const store = useStore()

    const form = ref({
      email: '',
      username: '',
      slug: '',
    })

    watch(
      () => ref(form.value.username),
      (username) => {
        form.value.slug = slugify(username.value, {
          replacement: '-',
        }).toLowerCase()
      }
    )

    const registerUser = async () => {
      try {
        await store.dispatch('landing/register', form.value)

        store.dispatch(BUS_NOTIFICATIONS.ACTIONS.SEND, {
          message: 'components.form-landing.messages.registered',
        })
      } catch (error) {
        if (error instanceof SlugAlreadyExistsException) {
          store.dispatch(BUS_NOTIFICATIONS.ACTIONS.SEND, {
            message: 'components.form-landing.messages.slug_already_exists',
          })
        }

        if (error instanceof EmailAlreadyExistsException) {
          store.dispatch(BUS_NOTIFICATIONS.ACTIONS.SEND, {
            message: 'components.form-landing.messages.email_already_exists',
          })
        }
      }
    }

    return {
      form,
      registerUser,
    }
  },
})
</script>

<style lang="sass">
#form-mentions
  font-style: italic
  font-size: 0.6rem
  color: #838383
</style>
