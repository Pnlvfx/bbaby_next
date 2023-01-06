export const postRequestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const LOGO = '/logo.png'
export const siteUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://www.bbabystyle.com'
    : 'http://localhost:3000'
