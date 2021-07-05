import { cloneDeep } from 'lodash'
import * as profile from '@/store/profile'
import ParameterRequiredException from '~/exceptions/ParameterRequiredException'

describe('profile', () => {
  let actions

  const cloneStore = cloneDeep(profile)

  beforeEach(() => {
    actions = cloneStore.actions
  })

  //   this.$fire.firestore
  //   .collection('landing')
  //   .where('slug', '==', slug)
  //   .get()

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

    it('Should retrun exception if slug is empty', async () => {
      expect(async () => await actions.slugExists({}, {})).rejects.toThrow(
        ParameterRequiredException
      )
    })
  })
})
