const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable during local dev, active in production builds
});

module.exports = withPWA({
  // Your existing Next.js config goes here
});