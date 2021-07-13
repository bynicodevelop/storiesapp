export const profileModel = {
  uid: '',
  slug: '',
  displayName: '',
  photoURL: '',
  bio: '',
  nFollowers: 0,
  nFollowed: 0,
  facebook_link: '',
  twitter_link: '',
  instagram_link: '',
  snapchat_link: '',
}

export const setProfile = (
  state,
  {
    uid,
    email,
    photoURL,
    displayName,
    slug,
    bio,
    nFollowers,
    nFollowed,
    youtube_link,
    twitter_link,
    instagram_link,
    facebook_link,
    snapchat_link,
  }
) => {
  // console.log({
  //   uid,
  //   email,
  //   photoURL,
  //   displayName,
  //   slug,
  //   bio,
  //   nFollowers: nFollowers ?? 0,
  //   nFollowed: nFollowed ?? 0,
  //   youtube_link,
  //   twitter_link,
  //   instagram_link,
  //   facebook_link,
  //   snapchat_link,
  // })

  state.profile = {
    ...profileModel,
    ...state.profile,
    ...{
      uid,
      email,
      photoURL,
      displayName,
      slug,
      bio,
      nFollowers: nFollowers ?? 0,
      nFollowed: nFollowed ?? 0,
      youtube_link,
      twitter_link,
      instagram_link,
      facebook_link,
      snapchat_link,
    },
  }
}
