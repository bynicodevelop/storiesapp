import _ from 'lodash'
import ParameterRequiredException from '~/exceptions/ParameterRequiredException'

export const PROFILE = {
  SLUG_EXISTS: 'profile/slugExists',
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
}
