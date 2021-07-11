import { jest } from '@jest/globals'
import { cloneDeep } from 'lodash'
import * as auth from '@/store/auth'

import BadCredentialsException from '~/exceptions/BadCredentialsException'
import InvalidEmailException from '~/exceptions/InvalidEmailException'
import InvalidPasswordException from '~/exceptions/InvalidPasswordException'
import UserAlreadyExistsException from '~/exceptions/UserAlreadyExistsException'
import FatalErrorException from '~/exceptions/FatalErrorException'

describe('auth', () => {
  let actions, state

  const cloneStore = cloneDeep(auth)

  beforeEach(() => {
    actions = cloneStore.actions
    state = cloneStore.state
  })

  describe('- signInWithEmailPassword', () => {
    it('Should called with nominal case', async () => {
      actions.$fire = {
        auth: {
          signInWithEmailAndPassword: jest.fn().mockResolvedValue(null),
        },
      }

      await actions.signInWithEmailPassword(
        {},
        {
          email: 'john@domain.tld',
          password: '123456',
        }
      )

      expect(actions.$fire.auth.signInWithEmailAndPassword).toHaveBeenCalled()
    })

    it('Should expect an error when email not found', () => {
      expect(
        async () =>
          await actions.signInWithEmailPassword(
            {},
            {
              email: '',
              password: '123456',
            }
          )
      ).rejects.toThrow(Error)

      expect(
        async () =>
          await actions.signInWithEmailPassword(
            {},
            {
              email: '',
              password: '123456',
            }
          )
      ).rejects.toThrow('Email is required')
    })

    it('Should expect an error when email not found', () => {
      expect(
        async () =>
          await actions.signInWithEmailPassword(
            {},
            {
              email: 'john@domain.tld',
              password: '',
            }
          )
      ).rejects.toThrow(Error)

      expect(
        async () =>
          await actions.signInWithEmailPassword(
            {},
            {
              email: 'john@domain.tld',
              password: '',
            }
          )
      ).rejects.toThrow('Password is required')
    })

    it('Should expect an error when user not found (wrong email)', () => {
      actions.$fire = {
        auth: {
          signInWithEmailAndPassword: () => {
            throw { code: 'auth/user-not-found' }
          },
        },
      }

      expect(
        async () =>
          await actions.signInWithEmailPassword(
            {},
            {
              email: 'john@domain.tld',
              password: '123456',
            }
          )
      ).rejects.toThrow(BadCredentialsException)
    })

    it('Should expect an error when user not found (wrong password)', () => {
      actions.$fire = {
        auth: {
          signInWithEmailAndPassword: () => {
            throw { code: 'auth/wrong-password' }
          },
        },
      }

      expect(
        async () =>
          await actions.signInWithEmailPassword(
            {},
            {
              email: 'john@domain.tld',
              password: '123456',
            }
          )
      ).rejects.toThrow(BadCredentialsException)
    })
  })

  describe('- signUpWithEmailPassword', () => {
    it('Should register user with nominal case', async () => {
      actions.$fire = {
        auth: {
          createUserWithEmailAndPassword: jest.fn().mockResolvedValue(null),
        },
      }

      await actions.signUpWithEmailPassword(
        {},
        {
          email: 'john@domain.tld',
          password: '123456',
        }
      )

      expect(
        actions.$fire.auth.createUserWithEmailAndPassword
      ).toHaveBeenCalled()
    })

    it('Should expect an error, when email is not set', () => {
      expect(
        async () =>
          await actions.signUpWithEmailPassword(
            {},
            {
              email: '',
              password: '123456',
            }
          )
      ).rejects.toThrow(InvalidEmailException)
    })

    it('Should expect an error, when password is not set', () => {
      expect(
        async () =>
          await actions.signUpWithEmailPassword(
            {},
            {
              email: 'john@domain.tld',
              password: '',
            }
          )
      ).rejects.toThrow(InvalidPasswordException)
    })

    it('Should expect an error, when user already exist', () => {
      actions.$fire = {
        auth: {
          createUserWithEmailAndPassword: () => {
            throw { code: 'auth/email-already-exists' }
          },
        },
      }

      expect(
        async () =>
          await actions.signUpWithEmailPassword(
            {},
            {
              email: 'john@domain.tld',
              password: '123456',
            }
          )
      ).rejects.toThrow(UserAlreadyExistsException)
    })
  })

  describe('- getProfile', () => {
    it('Should call commit method to set profile', async () => {
      const commit = jest.fn()

      actions = {
        ...actions,
        $cookies: {
          get(param) {
            expect(param).toBe('user')

            return {
              uid: 'uid',
            }
          },
        },
        $fire: {
          firestore: {
            collection(collectionName) {
              expect(collectionName).toBe('users')

              return {
                doc(uid) {
                  expect(uid).toBe('uid')

                  return {
                    get() {
                      return {
                        exists: true,
                        data() {
                          return {
                            displayName: 'John Doe',
                          }
                        },
                      }
                    },
                  }
                },
              }
            },
          },
        },
      }

      await actions.getProfile({ commit })

      expect(commit).toHaveBeenCalledWith('SET_PROFILE', {
        displayName: 'John Doe',
      })
    })

    it('Should expect an error if the cookies is empty', () => {
      const commit = jest.fn()

      actions.$cookies = {
        get(param) {
          expect(param).toBe('user')

          return undefined
        },
      }

      expect(async () => await actions.getProfile({ commit })).rejects.toThrow(
        FatalErrorException
      )
    })

    it('Should expect an error when user id not exist', () => {
      const commit = jest.fn()

      actions = {
        ...actions,
        $cookies: {
          get(param) {
            expect(param).toBe('user')

            return {
              uid: 'uid',
            }
          },
        },
        $fire: {
          firestore: {
            collection(collectionName) {
              expect(collectionName).toBe('users')

              return {
                doc(uid) {
                  expect(uid).toBe('uid')

                  return {
                    get() {
                      return {
                        exists: false,
                      }
                    },
                  }
                },
              }
            },
          },
        },
      }

      expect(async () => await actions.getProfile({ commit })).rejects.toThrow(
        FatalErrorException
      )
    })
  })

  describe('- saveProfile', () => {
    it('Should save profile data (nominal case)', async () => {
      const commit = jest.fn()

      const profile = {
        displayName: 'John',
        email: 'john@domain.tld',
        photoURL: '',
        slug: '',
        bio: '',
        youtube_link: '',
        twitter_link: '',
        instagram_link: '',
        facebook_link: '',
        snapchat_link: '',
      }

      state.profile = profile

      const profileForm = { ...profile, ...{ displayName: 'John Doe' } }

      actions = {
        ...actions,
        $cookies: {
          get(param) {
            expect(param).toBe('user')

            return {
              uid: 'uid',
            }
          },
        },
        $fire: {
          firestore: {
            collection(collectionName) {
              expect(collectionName).toBe('users')

              return {
                doc(uid) {
                  expect(uid).toBe('uid')

                  return {
                    update(data) {
                      expect(data).toStrictEqual(profileForm)
                    },
                  }
                },
              }
            },
          },
        },
      }

      await actions.saveProfile({ commit, state }, profileForm)

      expect(commit).toHaveBeenCalledWith('SET_PROFILE', {
        ...state.profile,
        ...profileForm,
      })
    })

    it('Should expect an error if cookies is not set', async () => {
      const commit = jest.fn()

      const profile = {
        displayName: 'John',
        email: 'john@domain.tld',
        photoURL: '',
        slug: '',
        youtube_link: '',
        twitter_link: '',
        instagram_link: '',
        facebook_link: '',
        snapchat_link: '',
      }

      actions.$cookies = {
        get(param) {
          expect(param).toBe('user')

          return undefined
        },
      }

      expect(
        async () => await actions.saveProfile({ commit }, profile)
      ).rejects.toThrow(FatalErrorException)
    })
  })

  describe('- signOut', () => {
    it('Should check user is disconnected (session with cookies)', async () => {
      actions = {
        ...actions,
        ...{
          $fire: {
            auth: {
              signOut: jest.fn().mockResolvedValue(null),
            },
          },
          $cookies: {
            remove: (value) => {
              expect(value).toBe('user')
            },
          },
        },
      }

      const commit = jest.fn()

      await actions.signOut({ commit })

      expect(commit).toHaveBeenCalledWith('IS_AUTHENTICATED')
    })
  })
})
