/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  // // redirects: async () => [
  // //   {
  // //     source: '/',
  // //     has: [{type: 'host', value: 'localhost'}],
  // //     destination: 'https://www.bbabystyle.com',
  // //     permanent: true
  // //   }
  // // ],
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
  productionBrowserSourceMaps: true,
}

module.exports = NextConfig
