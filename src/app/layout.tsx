import type { Metadata } from 'next';
import { Inter, Oxanium } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oxanium = Oxanium({ subsets: ['latin'], variable: '--font-oxanium' });

export const metadata: Metadata = {
  title: 'Năng Lượng Xanh Lớp 5',
  description: '1 trang web - 8 module tương tác cho học sinh lớp 5'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${oxanium.variable} min-h-screen bg-coal`}>
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
