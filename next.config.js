/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com','pbs.twimg.com'],
  },
  productionBrowserSourceMaps: true
};

module.exports = NextConfig;
