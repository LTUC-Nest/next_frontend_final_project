import { useState } from 'react';

export default function Footer() {
  return (
    <footer className=" bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-start">
            <a href="/" className="flex items-center mb-4">
              <img src="Nest.png" alt="Nest" className="h-16 mr-3" />
            </a>
            <p className="text-center text-gray-400 dark:text-gray-500">
              Your trusted partner in real estate management
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex">
            <a href="#" className="text-gray-300 hover:text-gray-100 dark:hover:text-gray-200 mx-4" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-gray-100 dark:hover:text-gray-200 mx-4" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.931 1.931 0 0 1-1.8 2.045Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-700 dark:border-gray-600" />

        {/* Footer Bottom */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-center text-gray-100 dark:text-gray-300">
            © 2024 <a href="/" className="hover:underline hover:text-gray-300 dark:hover:text-gray-100">Nest™</a>. All Rights Reserved.
          </span>
        </div>
      </div>

      {/* Back to Top Button */}
      <a
        href="#top"
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4.354l-7.071 7.071 1.414 1.414L12 7.182l5.657 5.657 1.414-1.414L12 4.354z" />
        </svg>
      </a>
    </footer>
  );
}
