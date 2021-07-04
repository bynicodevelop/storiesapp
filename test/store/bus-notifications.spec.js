import { jest } from '@jest/globals'
import { cloneDeep } from 'lodash'

import * as notification from '@/store/bus-notifications'
import ParameterRequiredException from '~/exceptions/ParameterRequiredException'

describe('bus notification', () => {
  let actions, mutations

  const cloneStore = cloneDeep(notification)

  beforeEach(() => {
    actions = cloneStore.actions
    mutations = cloneStore.mutations
  })

  describe('actions', () => {
    describe('- flashMessage', () => {
      it('Should called commit method with SEND_MESSAGE and message', () => {
        const commit = jest.fn()

        actions.flashMessage(
          { commit },
          {
            message: 'Message',
          }
        )

        expect(commit).toHaveBeenCalledWith('SEND_MESSAGE', {
          message: 'Message',
        })
      })

      it('Should expect an error if message is not set', () => {
        const commit = jest.fn()

        expect(() => actions.flashMessage({ commit }, {})).toThrow(
          ParameterRequiredException
        )

        expect(() => actions.flashMessage({ commit }, {})).toThrow(
          'Message is required'
        )
      })
    })

    describe('- reset', () => {
      it('Should called commit method with RESET', () => {
        const commit = jest.fn()

        actions.reset({ commit })

        expect(commit).toHaveBeenCalledWith('RESET')
      })
    })
  })

  describe('mutations', () => {
    describe('SEND_MESSAGE', () => {
      it('State should add message and show notification', () => {
        const state = {
          bus: {
            message: null,
            show: false,
          },
        }

        mutations.SEND_MESSAGE(state, { message: 'message' })

        expect(state.bus.message).toBe('message')
        expect(state.bus.show).toBe(true)
      })

      it('State should add message and show notification (with an existing message)', () => {
        const state = {
          bus: {
            message: 'message',
            show: true,
          },
        }

        mutations.SEND_MESSAGE(state, { message: 'message 2' })

        expect(state.bus.message).toBe('message 2')
        expect(state.bus.show).toBe(true)
      })
    })

    describe('RESET', () => {
      it('State should have not message and show is false', () => {
        const state = {
          bus: {
            message: 'message',
            show: false,
          },
        }

        mutations.RESET(state)

        expect(state.bus.message).toBe(null)
        expect(state.bus.show).toBe(false)
      })
    })
  })
})
