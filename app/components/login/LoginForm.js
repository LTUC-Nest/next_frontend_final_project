'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/app/context/authContext';

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await login({ username, password });
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-700">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">Sign In</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">Sign in to access your account</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="relative mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 dark:text-gray-400 text-sm mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full border-b-2 border-gray-300 dark:border-gray-600 py-2 px-1 text-gray-900 dark:text-gray-100 bg-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none"
              placeholder=" "
              autoComplete="username"
              required
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 dark:text-gray-400 text-sm mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border-b-2 border-gray-300 dark:border-gray-600 py-2 px-1 text-gray-900 dark:text-gray-100 bg-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none"
              placeholder=" "
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          >
            Log In
          </button>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <a
              href="#!"
              className="font-semibold text-blue-500 hover:underline dark:text-blue-400"
            >
              Sign up
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
