import _ from 'lodash'
import SlugAlreadyExistsException from '~/exceptions/SlugAlreadyExistsException'
import EmailAlreadyExistsException from '~/exceptions/EmailAlreadyExistsException'

export const actions = {
  async register(ctx, { email, username, slug }) {
    const refUserSlugRegistered = await this.$fire.firestore
      .collection('landing')
      .where('slug', '==', slug)
      .get()

    if (refUserSlugRegistered.docs.length > 0) {
      throw new SlugAlreadyExistsException()
    }

    const refUserEmailRegistered = await this.$fire.firestore
      .collection('landing')
      .where('email', '==', email)
      .get()

    if (refUserEmailRegistered.docs.length > 0) {
      throw new EmailAlreadyExistsException()
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
