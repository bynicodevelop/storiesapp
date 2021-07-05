import { jest } from '@jest/globals'
import { cloneDeep } from 'lodash'
import * as index from '@/store/index'
import { AUTH } from '~/store/auth'

describe('index', () => {
  let actions

  const cloneStore = cloneDeep(index)

  beforeEach(() => {
    actions = cloneStore.actions
  })

  describe('- nuxtServerInit', () => {
    test('Check commit was called with IS_LOADED string', () => {
      const dispatch = jest.fn()

      actions.nuxtServerInit({ dispatch })

      expect(dispatch).toHaveBeenCalledWith('loadApp')
    })
  })

  describe('- loadApp', () => {
    test('Check dispatch function was called', () => {
      actions.$cookies = {
        get: (string) => {
          expect(string).toBe('user')

          return { uid: 'uid' }
        },
      }

      const dispatch = jest.fn().mockResolvedValue(null)

      actions.loadApp({ dispatch })

      expect(dispatch).toHaveBeenCalledWith(
        AUTH.ACTIONS.ON_AUTH_STATE_CHANGED_ACTION,
        { authUser: { uid: 'uid' } }
      )
    })

    test("Check dispatch function wasn't called", () => {
      actions.$cookies = {
        get: (string) => {
          expect(string).toBe('user')

          return {}
        },
      }

      const dispatch = jest.fn().mockResolvedValue(null)

      actions.loadApp({ dispatch })

      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('- isLoaded', () => {
    test('Check commit was called with IS_LOADED string', () => {
      const commit = jest.fn()

      actions.isLoaded({ commit })

      expect(commit).toHaveBeenCalledWith('IS_LOADED')
    })
  })
})
