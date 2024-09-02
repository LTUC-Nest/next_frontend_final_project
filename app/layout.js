"use client";
import "./globals.css";
import ThemeWrapper from "./context/themeContext";
import  AuthContext  from "./context/authContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>
          <AuthContext>
          <main>{children}</main>
          </AuthContext>
        </ThemeWrapper>
      </body>
    </html>
  );
}
