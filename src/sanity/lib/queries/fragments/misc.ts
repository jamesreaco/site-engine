export const baseQuery = `
  _id,
  _key,
  _type
`

export const paddingQuery = `
  paddingTop,
  paddingBottom
`

export const buttonQuery = `
  _key,
  showButton,
  buttonText,
  buttonVariant,
  buttonType,
  buttonWidth,
  buttonFileUrl {
    asset->{ url }
  },
  buttonPageReference->{
    _id,
    _type,
    title,
    "slug": slug.current
  },
  buttonEmailAddress,
  buttonExternalUrl,
  buttonAnchorLocation,
  buttonAnchorId
`