import _ from 'lodash'
import SlugAlreadyExistsException from '~/exceptions/SlugAlreadyExistsException'

export const actions = {
  async register(ctx, { email, username, slug }) {
    const refUserRegistered = await this.$fire.firestore
      .collection('landing')
      .where('slug', '==', slug)
      .get()

    if (refUserRegistered.docs.length > 0) {
      throw new SlugAlreadyExistsException()
    }

    try {
      await this.$fire.firestore
        .collection('landing')
        .add({ email: email.toLowerCase(), username, slug: slug.toLowerCase() })
    } catch (error) {
      console.log(error)
    }
  },
}
