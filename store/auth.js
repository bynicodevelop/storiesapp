import _ from 'lodash'
import BadCredentialsException from '../exceptions/BadCredentialsException'
import InvalidEmailException from '../exceptions/InvalidEmailException'
import InvalidPasswordException from '../exceptions/InvalidPasswordException'
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException'
import FatalErrorException from '../exceptions/FatalErrorException'
import { profileModel, setProfile } from '../models/profile'

export const AUTH = {
  ACTIONS: {
    ON_AUTH_STATE_CHANGED_ACTION: 'auth/onAuthStateChangedAction',
    GET_PROFILE: 'auth/getProfile',
    SAVE_PROFILE: 'auth/saveProfile',
    SIGNOUT: 'auth/signOut',
  },
  GETTERS: {
    IS_AUTHENTICATED: 'auth/isAuthenticated',
    GET_PROFILE: 'auth/getProfile',
  },
}

export const state = () => ({
  isAuthenticated: false,
  profile: {},
})

export const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  getProfile: (state) => state.profile,
}

export const mutations = {
  IS_AUTHENTICATED: (state, status = false) => (state.isAuthenticated = status),
  SET_PROFILE: setProfile,
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

  async getProfile({ commit }) {
    this.dispatch('loading')

    const { uid } = this.$cookies.get('user') ?? {}

    if (uid == undefined) {
      throw new FatalErrorException()
    }

    const userRef = await this.$fire.firestore
      .collection('users')
      .doc(uid)
      .get()

    if (!userRef.exists) {
      throw new FatalErrorException('User not found')
    }

    commit('SET_PROFILE', {
      ...{ uid: userRef.id },
      ...userRef.data(),
    })

    this.dispatch('isLoaded')
  },

  async saveProfile(
    { commit, state },
    {
      email,
      photoURL,
      displayName,
      slug,
      bio,
      youtube_link,
      twitter_link,
      instagram_link,
      facebook_link,
      snapchat_link,
    }
  ) {
    const { uid } = this.$cookies.get('user') ?? {}

    if (uid == undefined) {
      throw new FatalErrorException()
    }

    const profile = {
      ...state.profile,
      ...{
        email,
        photoURL,
        displayName,
        slug,
        bio,
        youtube_link,
        twitter_link,
        instagram_link,
        facebook_link,
        snapchat_link,
      },
    }

    await this.$fire.firestore.collection('users').doc(uid).update(profile)

    commit('SET_PROFILE', profile)
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
