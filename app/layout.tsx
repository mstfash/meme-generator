import Navbar from '@/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'imageToMeme - Meme Generator',
  description: 'Generate memes from images',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <link rel="shortcut icon" href="/favicon-32x32.png" />
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="max-w-screen-xl m-auto p-5">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
