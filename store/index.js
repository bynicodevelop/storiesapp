import { AUTH } from './auth'

export const strict = false

export const state = () => ({
  loading: true,
})

export const mutations = {
  IS_LOADED: (state) => (state.loading = false),
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    console.log('Store - nuxtServerInits')
    console.log(process.env.NODE_ENV)
    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)

    if (process.server && process.static) return

    await dispatch('loadApp')
  },
  async loadApp({ dispatch }) {
    const { uid } = this.$cookies.get('user') ?? {}

    console.log({ uid })

    if (uid != undefined) {
      await dispatch(AUTH.ACTIONS.ON_AUTH_STATE_CHANGED_ACTION, {
        authUser: { uid },
      })
    }
  },
  isLoaded({ commit }) {
    commit('IS_LOADED')
  },
}
