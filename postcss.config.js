module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? {cssnano: {}}: {})
  },
}
