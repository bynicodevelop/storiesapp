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
                      async onSnapshot(cb) {
                        cb({
                          docs: [
                            {
                              data: () => {
                                return { displayName: 'John Doe' }
                              },
                            },
                          ],
                        })
                      },
                    }
                  },
                }
              },
            }
          },
        },
      }

      actions.loadProfile({ commit }, { slug: 'slug' })

      expect(commit).toHaveBeenCalledWith('PROFILE_LOADED', {
        displayName: 'John Doe',
      })
    })

    it('Should expect an error if user not exist', () => {
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
                      async onSnapshot(cb) {
                        cb({
                          docs: [],
                        })
                      },
                    }
                  },
                }
              },
            }
          },
        },
      }

      actions.loadProfile({ commit }, { slug: 'slug' })

      expect(commit).toHaveBeenCalledWith('PROFILE_NOT_FOUND')
    })
  })

  describe('- listProfiles', () => {
    it('Should call commit to load profiles', async () => {
      const commit = jest.fn()

      actions.$fire = {
        firestore: {
          collection(collectionName) {
            expect(collectionName).toBe('users')

            return {
              limit(n) {
                expect(n).toBe(20)

                return {
                  get() {
                    return {
                      docs: [
                        {
                          id: 'uid1',
                          data() {
                            return {
                              email: 'john@domain.tld',
                              displayName: 'john',
                              slug: 'slug',
                            }
                          },
                        },
                        {
                          id: 'uid2',
                          data() {
                            return {
                              email: 'john@domain.tld',
                              displayName: 'jane',
                              slug: 'slug',
                            }
                          },
                        },
                      ],
                    }
                  },
                }
              },
            }
          },
        },
      }

      await actions.listProfiles({ commit })

      expect(commit).toHaveBeenCalledWith('ADD_PROFILES', [
        {
          uid: 'uid1',
          displayName: 'john',
          bio: '',
          nFollowers: 0,
          nFollowed: 0,
          slug: 'slug',
          photoURL: '',
        },
        {
          uid: 'uid2',
          displayName: 'jane',
          bio: '',
          nFollowers: 0,
          nFollowed: 0,
          slug: 'slug',
          photoURL: '',
        },
      ])
    })

    it('Should not to call commit to load profiles', async () => {
      const commit = jest.fn()

      actions.$fire = {
        firestore: {
          collection(collectionName) {
            expect(collectionName).toBe('users')

            return {
              limit(n) {
                expect(n).toBe(20)

                return {
                  get() {
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

      await actions.listProfiles({ commit })

      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('- follow', () => {
    it('Should follow a profile', async () => {
      const commit = jest.fn()

      actions = {
        ...actions,
        $cookies: {
          get(param) {
            expect(param).toBe('user')

            return { uid: '0987' }
          },
        },
        $fire: {
          firestore: {
            collection(collectionName) {
              expect(collectionName).toBe('users')

              return {
                doc(uid) {
                  expect(uid).toBe('1234')

                  return {
                    collection(subCollectionName) {
                      expect(subCollectionName).toBe('followers')

                      return {
                        doc(followerUid) {
                          expect(followerUid).toBe('0987')

                          return {
                            get() {
                              return {
                                exists: false,
                              }
                            },
                            set(data) {
                              expect(data).toStrictEqual({
                                userRef: 'users/0987',
                              })
                            },
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

      await actions.follow({ commit }, { followUid: '1234' })

      expect(commit).toHaveBeenCalledWith('USER_FOLLOWED')
    })

    it('Should unfollow a profile', async () => {
      const commit = jest.fn()

      actions = {
        ...actions,
        $cookies: {
          get(param) {
            expect(param).toBe('user')

            return { uid: '0987' }
          },
        },
        $fire: {
          firestore: {
            collection(collectionName) {
              expect(collectionName).toBe('users')

              return {
                doc(uid) {
                  expect(uid).toBe('1234')

                  return {
                    collection(subCollectionName) {
                      expect(subCollectionName).toBe('followers')

                      return {
                        doc(followerUid) {
                          expect(followerUid).toBe('0987')

                          return {
                            get() {
                              return {
                                exists: true,
                              }
                            },
                            delete() {},
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

      await actions.follow({ commit }, { followUid: '1234' })

      expect(commit).toHaveBeenCalledWith('USER_UNFOLLOWED')
    })
  })
})
