import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import { debounce } from 'debounce'
import { PROFILE } from '~/store/profile'
import slugify from 'slugify'

export default function ({ store }) {
  const { dispatch } = store

  extend('required', {
    ...required,
    message: 'This field is required',
  })

  extend('email', {
    ...email,
    message: 'This field must be a valid email',
  })

  extend('unique_slug', {
    validate: debounce(
      async (value) =>
        !(await dispatch(PROFILE.ACTIONS.SLUG_EXISTS, { slug: value })),
      300
    ),
    message: 'Slug is already used',
  })

  extend('unique_email', {
    validate: debounce(
      async (value) =>
        !(await dispatch(PROFILE.ACTIONS.EMAIL_EXISTS, { email: value })),
      300
    ),
    message: 'Email is already used',
  })

  extend('is_slug', {
    validate: (value) => value.toLowerCase() == slugify(value).toLowerCase(),
    message: 'This slug is invalid (only alphanumeric characters and -)',
  })
}
