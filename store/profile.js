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
    FOLLOW: 'profile/follow',
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
      uid,
      slug,
      displayName,
      photoURL,
      bio,
      nFollowers,
      nFollowed,
      facebook_link,
      twitter_link,
      instagram_link,
      snapchat_link,
    }
  ) =>
    (state.profile = {
      uid,
      slug,
      displayName,
      photoURL,
      bio,
      nFollowers,
      nFollowed,
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
  USER_FOLLOWED: (state) => null,
  USER_UNFOLLOWED: (state) => null,
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

  loadProfile({ commit }, { slug }) {
    this.$fire.firestore
      .collection('users')
      .where('slug', '==', slug)
      .limit(1)
      .onSnapshot((result) => {
        if (result.docs.length == 0) {
          commit('PROFILE_NOT_FOUND')
          return
        }

        commit('PROFILE_LOADED', {
          ...result.docs[0].data(),
          ...{ uid: result.docs[0].id },
        })
      })
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
      const { displayName, photoURL, bio, slug, nFollowers, nFollowed } =
        doc.data()

      return {
        uid: doc.id,
        ...{
          displayName,
          photoURL: photoURL ?? '',
          bio: bio ?? '',
          slug,
          nFollowers: nFollowers ?? 0,
          nFollowed: nFollowed ?? 0,
        },
      }
    })

    commit('ADD_PROFILES', data)
  },

  async follow({ commit }, { followUid }) {
    const { uid } = this.$cookies.get('user')

    const result = await this.$fire.firestore
      .collection('users')
      .doc(followUid)
      .collection('followers')
      .doc(uid)
      .get()

    if (result.exists === false) {
      await this.$fire.firestore
        .collection('users')
        .doc(followUid)
        .collection('followers')
        .doc(uid)
        .set({
          userRef: `users/${uid}`,
        })

      commit('USER_FOLLOWED')
    } else {
      await this.$fire.firestore
        .collection('users')
        .doc(followUid)
        .collection('followers')
        .doc(uid)
        .delete()

      commit('USER_UNFOLLOWED')
    }
  },
}
