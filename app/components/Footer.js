import { useState } from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center mb-8">
          <a href="/" className="flex items-center mb-4">
            <img src="Nest.png" alt="Nest" className="h-16 mr-3" />
          </a>
          <p className="text-center text-gray-400 dark:text-gray-500">
            Your trusted partner in real estate management
          </p>
        </div>



        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

        {/* Contact Information */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold uppercase mb-4 text-gray-100 dark:text-gray-300">Contact Us</h2>
          <p className="mb-2">Email: <a href="mailto:support@nest.com" className="hover:underline hover:text-gray-300 dark:hover:text-gray-100">support@nest.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:underline hover:text-gray-300 dark:hover:text-gray-100">+1 (234) 567-890</a></p>
        </div>


          {/* Resources */}
          <div className="text-center">
            <h2 className="text-lg font-semibold uppercase mb-4 text-gray-100 dark:text-gray-300">Resources</h2>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="https://flowbite.com/" className="hover:underline hover:text-gray-300 dark:hover:text-gray-100">Property Management Guides</a>
              </li>
              <li>
                <a href="https://tailwindcss.com/" className="hover:underline hover:text-gray-300 dark:hover:text-gray-100">Investment Tips</a>
              </li>
            </ul>
          </div>


          {/* Legal */}
          <div className="text-center">
            <h2 className="text-lg font-semibold uppercase mb-4 text-gray-100 dark:text-gray-300">Legal</h2>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#" className="hover:underline hover:text-gray-300 dark:hover:text-gray-100">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-gray-300 dark:hover:text-gray-100">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-700 dark:border-gray-600" />

        {/* Social Media Icons */}
        <div className="flex justify-center mb-8">
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
          <a href="#" className="text-gray-300 hover:text-gray-100 dark:hover:text-gray-200 mx-4" aria-label="Dribbble">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" />
            </svg>
          </a>
          <span className="text-sm text-center sm:text-left text-gray-100 dark:text-gray-300">
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
