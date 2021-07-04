import _ from 'lodash'
import ParameterRequiredException from '~/exceptions/ParameterRequiredException'

export const state = () => ({ bus: { message: null, show: false } })

export const mutations = {
  SEND_MESSAGE(state, data) {
    const { message } = data

    state.bus.message = message
    state.bus.show = true
  },
  RESET(state) {
    state.bus = { message: null, show: false }
  },
}

export const actions = {
  flashMessage({ commit }, data) {
    const { message } = data

    if (_.isEmpty(message)) {
      throw new ParameterRequiredException('Message is required')
    }

    commit('SEND_MESSAGE', { message })
  },

  reset({ commit }) {
    commit('RESET')
  },
}
