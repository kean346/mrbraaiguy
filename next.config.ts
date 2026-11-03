import type { NextConfig } from 'next';

const sharedHeaders = [
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'Referrer-Policy',value:'same-origin'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
];
const privateFrameHeader = {key:'X-Frame-Options',value:'SAMEORIGIN'};

const config: NextConfig = {
  serverExternalPackages:['mongodb','puppeteer-core','@sparticuz/chromium'],
  poweredByHeader:false,
  outputFileTracingIncludes:{'/api/workspace/*':['./node_modules/@sparticuz/chromium/bin/**','./node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2','./node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2','./node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2','./public/brand/logo.png']},
  async headers(){return [
    {source:'/:path*',headers:sharedHeaders},
    {source:'/:section(dashboard|quotes|clients|menus|settings|audit)/:path*',headers:[privateFrameHeader]},
    {source:'/login',headers:[privateFrameHeader]},
    {source:'/setup',headers:[privateFrameHeader]},
    {source:'/api/:path*',headers:[privateFrameHeader]},
  ];},
};
export default config;
