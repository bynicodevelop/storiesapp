import _ from 'lodash'
import ParameterRequiredException from '~/exceptions/ParameterRequiredException'
import UserNotFoundException from '~/exceptions/UserNotFoundException'

export const PROFILE = {
  GETTERS: {
    GET_PROFILE: 'profile/getProfile',
  },
  ACTIONS: {
    SLUG_EXISTS: 'profile/slugExists',
    EMAIL_EXISTS: 'profile/emailExists',
    LOAD_PROFILE: 'profile/loadProfile',
  },
}

export const state = () => ({
  profile: {},
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
      tiktok_link,
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
}

export const getters = {
  getProfile: (state) => state.profile,
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
}
