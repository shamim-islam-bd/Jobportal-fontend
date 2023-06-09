// const { middleware } = require('./pages/_middleware');

const { middleware } = require('./middleware/middleware');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:8000",
  }
}

module.exports = nextConfig


// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/:path*',
//         destination: '/:path*',
//       },
//     ];
//   },
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=3600',
//           },
//         ],
//       },
//     ];
//   },
//   async redirects() {
//     return [
//       {
//         source: '/:path*',
//         destination: '/:path*',
//         permanent: false,
//       },
//     ];
//   },
// };