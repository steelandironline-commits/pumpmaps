import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {title:'PUMPMAPS — The Memecoin World Map',description:'Explore demo memecoin territories, rankings and community battles on an interactive map.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
