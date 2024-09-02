// app/layout.js
"use client";

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toggleDarkMode, applySavedTheme } from '../hooks/theme'; // تأكد من ضبط المسار بشكل صحيح
import "./globals.css";

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply saved theme on component mount
    const savedTheme = applySavedTheme();
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <html lang="en">
      <body>
        <Header onToggleDarkMode={handleToggleDarkMode} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
