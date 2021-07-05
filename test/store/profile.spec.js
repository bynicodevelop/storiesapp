import { cloneDeep } from 'lodash'
import * as profile from '@/store/profile'
import ParameterRequiredException from '~/exceptions/ParameterRequiredException'

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
})
