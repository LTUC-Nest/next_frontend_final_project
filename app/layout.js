"use client";
import "./globals.css";
import ThemeWrapper from "./context/theme";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeWrapper>
        <body>
          <Header />
          {children}
        </body>
      </ThemeWrapper>
    </html>
  );
}