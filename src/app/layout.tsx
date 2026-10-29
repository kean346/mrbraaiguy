import '@fontsource/dm-sans/400.css';import '@fontsource/dm-sans/500.css';import '@fontsource/dm-sans/600.css';import '@fontsource/cormorant-garamond/400.css';import '@fontsource/cormorant-garamond/500.css';import './globals.css';import type {Metadata} from 'next';
export const metadata:Metadata={title:'Mr Braai Guy · Quotation Studio',description:'Private quotation studio for Mr Braai Guy'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-ZA" data-scroll-behavior="smooth"><body>{children}</body></html>}
