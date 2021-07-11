import _ from 'lodash'
import ParameterRequiredException from '~/exceptions/ParameterRequiredException'
import UserNotFoundException from '~/exceptions/UserNotFoundException'

export const PROFILE = {
  GETTERS: {
    GET_PROFILE: 'profile/getProfile',
    LIST_PROFILES: 'profile/listProfiles',
  },
  ACTIONS: {
    SLUG_EXISTS: 'profile/slugExists',
    EMAIL_EXISTS: 'profile/emailExists',
    LOAD_PROFILE: 'profile/loadProfile',
    LIST_PROFILE: 'profile/listProfiles',
  },
}

export const state = () => ({
  profile: {},
  profiles: [],
})

export const mutations = {
  PROFILE_LOADED: (
    state,
    {
      slug,
      displayName,
      photoURL,
      bio,
      facebook_link,
      twitter_link,
      instagram_link,
      snapchat_link,
    }
  ) =>
    (state.profile = {
      slug,
      displayName,
      photoURL,
      bio,
      facebook_link,
      twitter_link,
      instagram_link,
      snapchat_link,
    }),
  ADD_PROFILES: (state, data) => {
    state.profiles = state.profiles.concat(
      data.filter(({ uid }) => !state.profiles.find((r) => r.uid == uid))
    )
  },
}

export const getters = {
  getProfile: (state) => state.profile,
  listProfiles: (state) => state.profiles,
}

export const actions = {
  async slugExists(ctx, { slug }) {
    if (_.isEmpty(slug)) {
      throw new ParameterRequiredException('slug_required')
    }

    const result = await this.$fire.firestore
      .collection('landing')
      .where('slug', '==', slug)
      .get()

    return result.docs.length > 0
  },

  async emailExists(ctx, { email }) {
    if (_.isEmpty(email)) {
      throw new ParameterRequiredException('slug_required')
    }

    const result = await this.$fire.firestore
      .collection('landing')
      .where('email', '==', email)
      .get()

    return result.docs.length > 0
  },

  async loadProfile({ commit }, { slug }) {
    const result = await this.$fire.firestore
      .collection('users')
      .where('slug', '==', slug)
      .limit(1)
      .get()

    if (result.docs.length == 0) {
      throw new UserNotFoundException()
    }

    commit('PROFILE_LOADED', result.docs[0].data())
  },

  async listProfiles({ commit }) {
    const results = await this.$fire.firestore
      .collection('users')
      .limit(20)
      .get()

    if (results.docs.length == 0) {
      return
    }

    const data = results.docs.map((doc) => {
      const { displayName, photoURL, bio, slug } = doc.data()

      return {
        uid: doc.id,
        ...{ displayName, photoURL, bio, slug },
      }
    })

    commit('ADD_PROFILES', data)
  },
}
