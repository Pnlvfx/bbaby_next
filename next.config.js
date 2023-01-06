/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'www.paypal.com',
      'images.pexels.com',
      'localhost',
      'api.bbabystyle.com',
      '192.168.1.22',
      '192.168.1.21',
    ],
  },
  env: {
    GOOGLE_CLIENT_ID:
      '527300585899-mh0q9kh2fpijep43k37oriuafsl8m9hi.apps.googleusercontent.com',
    YOUTUBE_CLIENT_ID:
      '56658651654-j4f0trpq3fejbpkssqndnlqh074mqt8l.apps.googleusercontent.com',
  },
  productionBrowserSourceMaps: true,
  //distDir: '.bbaby',
}

module.exports = NextConfig
