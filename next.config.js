/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: (process.env.NEXT_PUBLIC_AWS_S3_URL).replace(/^https:\/\//, ''),
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        pathname: '/**',
      }
    ]
  }
}

export default nextConfig