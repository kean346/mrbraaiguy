import type { NextConfig } from 'next';

const sharedHeaders = [
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'Referrer-Policy',value:'same-origin'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
];
const privateFrameHeader = {key:'X-Frame-Options',value:'SAMEORIGIN'};

const config: NextConfig = {
  serverExternalPackages:['mongodb','puppeteer-core'],
  poweredByHeader:false,
  async headers(){return [
    {source:'/:path*',headers:sharedHeaders},
    {source:'/:section(dashboard|quotes|clients|menus|settings|audit)/:path*',headers:[privateFrameHeader]},
    {source:'/login',headers:[privateFrameHeader]},
    {source:'/api/:path*',headers:[privateFrameHeader]},
  ];},
};
export default config;
