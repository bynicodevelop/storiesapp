import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { AUTH } from '~/store/auth'

export default defineNuxtMiddleware(({ store, route, redirect }) => {
  console.log('Middleware - Auth')
  const routesAllowed = ['auth', 'index', 'fans', 'auth-register']

  if (
    store.getters[AUTH.GETTERS.IS_AUTHENTICATED] &&
    routesAllowed.includes(route.name)
  ) {
    redirect('/home')
  }

  if (routesAllowed.includes(route.name)) {
    return
  }

  if (
    !routesAllowed.includes(route.name) &&
    store.getters[AUTH.GETTERS.IS_AUTHENTICATED]
  ) {
    return
  }

  if (
    !routesAllowed.includes(route.name) &&
    !store.getters[AUTH.GETTERS.IS_AUTHENTICATED]
  ) {
    return redirect('/auth')
  }
})
