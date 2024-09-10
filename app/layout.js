// app/layout.js
"use client";

import Header from './components/Header/Header';
import Footer from './components/Footer';
import AuthWrapper from './context/authContext'; // تأكد من المسار الصحيح
import { ThemeProvider } from 'next-themes';
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-bg-light dark:bg-bg-dark'>
        <AuthWrapper>
          <ThemeProvider attribute="class">
          <Header />
            <main className="pt-16 flex-grow mt-50">{children}</main>
          <Footer />
          </ThemeProvider>
        </AuthWrapper>
      </body>
    </html>
  );
}
