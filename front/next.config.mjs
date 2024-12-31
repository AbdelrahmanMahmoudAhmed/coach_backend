
//@ts-check
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false,
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: 'https',
    //       hostname: process.env.NEXT_PUBLIC_IMG_HOSTNAME,
    //       port: '',
    //     },
    //   ],
    // },

    // experimental: {
    //   instrumentationHook: true,
    // },
  }; 
export default withNextIntl(nextConfig);
