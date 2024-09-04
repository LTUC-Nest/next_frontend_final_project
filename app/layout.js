// app/layout.js
"use client";

import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import AuthWrapper from './context/authContext'; // تأكد من المسار الصحيح
import { ThemeProvider } from 'next-themes';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
          <ThemeProvider attribute="class">
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthWrapper>
      </body>
    </html>
  );
}
