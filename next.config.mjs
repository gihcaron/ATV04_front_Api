/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'rickandmortyapi.com',
          pathname: '/**',
        },
      ],
    },
    allowedDevOrigins: ['http://192.168.56.1'], 
  };
  
  export default nextConfig;