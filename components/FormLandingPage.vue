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
            label="Votre nom de star"
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
            label="Votre identifiant"
            :error-messages="errors"
            required
            outlined
          ></v-text-field>
        </validation-provider>

        <validation-provider
          name="email"
          v-slot="{ errors }"
          rules="required|email"
        >
          <v-text-field
            v-model="form.email"
            name="email"
            type="email"
            label="Votre email"
            :error-messages="errors"
            required
            outlined
          ></v-text-field>
        </validation-provider>
        <v-btn type="submit" color="#FC57D2" dark block>
          Reservez votre nom
        </v-btn>
      </v-form>
    </validation-observer>

    <p id="form-mentions">
      Informations relatives aux traitements des données : Les informations que
      vous nous transmettez ne sont utilisées que pour vous informer sur la
      sortie de l’application du site stories.fans. Vos informations sont
      stockées sur des serveurs sécurisés et cryptés en Europe.
    </p>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { defineComponent, ref, useStore, watch } from '@nuxtjs/composition-api'
import slugify from 'slugify'
import { BUS_NOTIFICATIONS } from '~/store/bus-notifications'
import SlugAlreadyExistsException from '~/exceptions/SlugAlreadyExistsException'

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
        })
      }
    )

    const registerUser = async () => {
      try {
        await store.dispatch('landing/register', form.value)

        store.dispatch(BUS_NOTIFICATIONS.ACTIONS.SEND, {
          message: 'Your are registered',
        })
      } catch (error) {
        if (error instanceof SlugAlreadyExistsException) {
          store.dispatch(BUS_NOTIFICATIONS.ACTIONS.SEND, {
            message: 'Your slug already exists',
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

<style>
#form-mentions {
  font-style: italic;
  font-size: 0.6rem;
  color: #838383;
}
</style>
