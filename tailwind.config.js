/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glitch: {
          bg: '#060a0f',
          dark: '#080d14',
          card: '#0c1219',
          cardBorder: 'rgba(255, 255, 255, 0.08)',
          cyan: '#4deeea',
          cyanGlow: '#5ce1e6',
          pink: '#ff2a85',
          pinkGlow: '#ff4fa8',
          cream: '#f4ede3',
          creamHover: '#ffffff',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
        brand: ['"Syne"', 'sans-serif']
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(77, 238, 234, 0.45), 0 0 30px rgba(77, 238, 234, 0.25)',
        'neon-pink': '0 0 15px rgba(255, 42, 133, 0.45), 0 0 30px rgba(255, 42, 133, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  },
  plugins: []
}
