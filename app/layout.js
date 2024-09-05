// app/layout.js

import AuthWrapper from './context/authContext'; // تأكد من المسار الصحيح
import { ThemeProvider } from 'next-themes';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
          <ThemeProvider attribute="class">
            <main>{children}</main>
          </ThemeProvider>
        </AuthWrapper>
      </body>
    </html>
  );
}
