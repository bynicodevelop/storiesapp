import { jest } from '@jest/globals'
import { cloneDeep } from 'lodash'
import * as profile from '@/store/profile'
import ParameterRequiredException from '~/exceptions/ParameterRequiredException'
import UserNotFoundException from '~/exceptions/UserNotFoundException'

describe('profile', () => {
  let actions

  const cloneStore = cloneDeep(profile)

  beforeEach(() => {
    actions = cloneStore.actions
  })

  describe('- slugExists', () => {
    it('Should return true', async () => {
      actions.$fire = {
        firestore: {
          collection(collectionName) {
            expect(collectionName).toBe('landing')

            return {
              where(fieldName, comparaison, value) {
                expect(fieldName).toBe('slug')
                expect(comparaison).toBe('==')
                expect(value).toBe('slug')

                return {
                  async get() {
                    return {
                      docs: [{}],
                    }
                  },
                }
              },
            }
          },
        },
      }

      const result = await actions.slugExists({}, { slug: 'slug' })

      expect(result).toBe(true)
    })

    it('Should return false', async () => {
      actions.$fire = {
        firestore: {
          collection(collectionName) {
            expect(collectionName).toBe('landing')

            return {
              where(fieldName, comparaison, value) {
                expect(fieldName).toBe('slug')
                expect(comparaison).toBe('==')
                expect(value).toBe('slug')

                return {
                  async get() {
                    return {
                      docs: [],
                    }
                  },
                }
              },
            }
          },
        },
      }

      const result = await actions.slugExists({}, { slug: 'slug' })

      expect(result).toBe(false)
    })

    it('Should expect an error if slug is empty', async () => {
      expect(async () => await actions.slugExists({}, {})).rejects.toThrow(
        ParameterRequiredException
      )
    })
  })

  describe('- emailExists', () => {
    it('Should return true', async () => {
      actions.$fire = {
        firestore: {
          collection(collectionName) {
            expect(collectionName).toBe('landing')

            return {
              where(fieldName, comparaison, value) {
                expect(fieldName).toBe('email')
                expect(comparaison).toBe('==')
                expect(value).toBe('email')

                return {
                  async get() {
                    return {
                      docs: [{}],
                    }
                  },
                }
              },
            }
          },
        },
      }

      const result = await actions.emailExists({}, { email: 'email' })

      expect(result).toBe(true)
    })

    it('Should return false', async () => {
      actions.$fire = {
        firestore: {
          collection(collectionName) {
            expect(collectionName).toBe('landing')

            return {
              where(fieldName, comparaison, value) {
                expect(fieldName).toBe('email')
                expect(comparaison).toBe('==')
                expect(value).toBe('email')

                return {
                  async get() {
                    return {
                      docs: [],
                    }
                  },
                }
              },
            }
          },
        },
      }

      const result = await actions.emailExists({}, { email: 'email' })

      expect(result).toBe(false)
    })

    it('Should expect an erreor if slug is empty', async () => {
      expect(async () => await actions.emailExists({}, {})).rejects.toThrow(
        ParameterRequiredException
      )
    })
  })

  describe('- loadProfile', () => {
    it('Should return a profile by slug', async () => {
      const commit = jest.fn()
      actions.$fire = {
        firestore: {
          collection(collectionName) {
            expect(collectionName).toBe('users')

            return {
              where(fieldName, comparaison, value) {
                expect(fieldName).toBe('slug')
                expect(comparaison).toBe('==')
                expect(value).toBe('slug')

                return {
                  limit(number) {
                    expect(number).toBe(1)

                    return {
                      async get() {
                        return {
                          docs: [
                            {
                              data: () => {
                                return { displayName: 'John Doe' }
                              },
                            },
                          ],
                        }
                      },
                    }
                  },
                }
              },
            }
          },
        },
      }

      const result = await actions.loadProfile({ commit }, { slug: 'slug' })

      expect(commit).toHaveBeenCalledWith('PROFILE_LOADED', {
        displayName: 'John Doe',
      })
    })

    it('Should expect an error if user not exist', () => {
      actions.$fire = {
        firestore: {
          collection(collectionName) {
            expect(collectionName).toBe('users')

            return {
              where(fieldName, comparaison, value) {
                expect(fieldName).toBe('slug')
                expect(comparaison).toBe('==')
                expect(value).toBe('slug')

                return {
                  limit(number) {
                    expect(number).toBe(1)

                    return {
                      async get() {
                        return {
                          docs: [],
                        }
                      },
                    }
                  },
                }
              },
            }
          },
        },
      }

      expect(
        async () => await actions.loadProfile({}, { slug: 'slug' })
      ).rejects.toThrow(UserNotFoundException)
    })
  })
})
