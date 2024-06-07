/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-1491528323818-fdd1faba62cc',
      },
    ],
  },
}

export default nextConfig
