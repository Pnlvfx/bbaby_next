/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com', 'styles.redditmedia.com'],
  },
  productionBrowserSourceMaps: true
};

module.exports = NextConfig;
