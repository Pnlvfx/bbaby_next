/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'www.paypal.com',
      "images.pexels.com",
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    GOOGLE_CLIENT_ID: '527300585899-mh0q9kh2fpijep43k37oriuafsl8m9hi.apps.googleusercontent.com'
  },
  productionBrowserSourceMaps: true,
}

module.exports = NextConfig;

