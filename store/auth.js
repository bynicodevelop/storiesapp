import _ from 'lodash'
import BadCredentialsException from '~/exceptions/BadCredentialsException'
import InvalidEmailException from '~/exceptions/InvalidEmailException'
import InvalidPasswordException from '~/exceptions/InvalidPasswordException'
import UserAlreadyExistsException from '~/exceptions/UserAlreadyExistsException'

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
  async signInWithEmailPassword(ctx, { email, password }) {
    if (_.isEmpty(email)) {
      throw new Error('Email is required')
    }

    if (_.isEmpty(password)) {
      throw new Error('Password is required')
    }

    try {
      await this.$fire.auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        throw new BadCredentialsException()
      }
    }
  },

  async signUpWithEmailPassword(ctx, { email, password }) {
    if (_.isEmpty(email)) {
      throw new InvalidEmailException()
    }

    if (_.isEmpty(password)) {
      throw new InvalidPasswordException()
    }

    try {
      await this.$fire.auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throw new UserAlreadyExistsException()
      }
    }
  },

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
