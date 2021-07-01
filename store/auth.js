export const AUTH = {
  ACTIONS: {
    ON_AUTH_STATE_CHANGED_ACTION: 'auth/onAuthStateChangedAction',
  },
  GETTERS: {
    IS_AUTHENTICATED: 'auth/isAuthenticated',
  },
}

export const state = () => ({
  isAuthenticated: false,
})

export const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
}

export const mutations = {
  IS_AUTHENTICATED: (state, status = false) => (state.isAuthenticated = status),
}

export const actions = {
  async signInWithEmailPassword(_, { email, password }) {
    try {
      const { user } = await this.$fire.auth.signInWithEmailAndPassword(
        email,
        password
      )
      console.log('User connected', user)
    } catch (error) {
      console.log(error)
    }
  },
  async signUpWithEmailPassword(_, { email, password }) {},
  async signOut({ commit }) {
    await this.$fire.auth.signOut()
    commit('IS_AUTHENTICATED')

    this.$cookies.remove('user')
  },
  async onAuthStateChangedAction({ commit }, { authUser }) {
    if (authUser === null) {
      commit('IS_AUTHENTICATED')
      return
    }

    console.log('User authenticated')
    const { uid } = authUser

    commit('IS_AUTHENTICATED', true)
    this.$cookies.set('user', { uid })
  },
}
