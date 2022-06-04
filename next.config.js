/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com', 'styles.redditmedia.com'],
  },
};

module.exports = NextConfig;
