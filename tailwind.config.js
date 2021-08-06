module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          dark: '#242529',
          darker: '#1D1E22',
          darkest: '#131416',
        },
        brand: {
          patreon: '#FF6871',
          patreondark: '#FF4D42',
        },
        discord: {
          blurple: '#5865F2',
          green: '#57F287',
          red: '#ED4245',
          yellow: '#FEE75C',
        },
      },
    },
  },
  purge: {
    content: ['node_modules/tv-*/dist/tv-*.umd.min.js'],
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['even', 'odd'],
    },
  },
  plugins: [],
};
