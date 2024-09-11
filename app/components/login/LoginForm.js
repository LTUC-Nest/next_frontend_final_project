'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/app/context/authContext';

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle form values
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    setError(''); // Reset the error state before making the request

    try {
      await login({ username, password });
      // Optionally, redirect or show a success message here
    } catch (err) {
      // Assuming err could be an Error object with a message
      const errorMessage = err?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="animate__animated animate__bounceIn flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-700">
        <h1 className="text-3xl font-bold text-text-dark dark:text-text-light text-center mb-4">Sign In</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">Sign in to access your account</p>
        {error && <p className="text-red-500 text-center mb-4" aria-live="assertive">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-text-dark dark:text-text-light text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full border-b-2 border-primary dark:border-primary-dark py-2 px-3 text-gray-900 dark:text-gray-100 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-dark dark:focus:border-primary focus:outline-none transition-colors duration-200"
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-text-dark dark:text-text-light text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border-b-2 border-primary dark:border-primary-dark py-2 px-3 text-gray-900 dark:text-gray-100 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-dark dark:focus:border-primary focus:outline-none transition-colors duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
