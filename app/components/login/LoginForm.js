'use client';

import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import Button from '../Button';


export default function LoginForm() {
  const [accountType, setAccountType] = useState('tenant');
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (passwordStrength < 3) {
      alert('Password is too weak!');
      return;
    }
    // Handle registration logic here
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(zxcvbn(newPassword).score + 1);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const passwordsMatch = password === confirmPassword;

  const inputClasses = "block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40";
  
  const dynamicClass = (condition) => condition ? 'border-green-500' : 'border-red-500';
  const dynamicMessage = (condition, positiveMsg, negativeMsg) => condition ? positiveMsg : negativeMsg;

  return (
    <section className="bg-bg-light dark:bg-bg-dark">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block"></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-4xl font-bold tracking-wider dark:text-text-light text-[#5d3f31] capitalize">
              {accountType === 'tenant' ? 'Tenant Login' : 'Property Owner Login'}
            </h1>

            <p className="mt-4 dark:text-gray-400 text-lg text-[#724c3a]">
              {accountType === 'tenant'
                ? 'Please log in to your tenant account.'
                : 'Please log in to your property owner account.'}
            </p>

            <div className="mt-6">
              <h1 className="text-[#724c3a] dark:text-gray-300">Select type of account</h1>

              <div className="mt-3 md:flex md:items-center md:-mx-2 ">
                <Button
                  type="button"
                  onClick={() => setAccountType('tenant')}
                  isActive={accountType === 'tenant'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="mx-2">Tenant</span>
                </Button>

                <Button
                  type="button"
                  onClick={() => setAccountType('property-owner')}
                  isActive={accountType === 'property-owner'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="mx-2">Property Owner</span>
                </Button>
              </div>
            </div>

            {accountType === 'tenant' ? (
              <form onSubmit={handleLogin} className="mt-8">
                <div>
                  <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johnsnow@example.com"
                    className={inputClasses}
                  />
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className={inputClasses}
                  />
                </div>

                <Button
                  type="submit"
                >
                  Login
                </Button>
              </form>
            ) : (
              <div>
                {!isRegistering ? (
                  <form onSubmit={handleLogin} className="mt-8">
                    <div>
                      <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Email address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johnsnow@example.com"
                        className={inputClasses}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        className={inputClasses}
                      />
                    </div>

                    <Button
                      type="submit"
                    >
                      Login
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="mt-8">
                    <div>
                      <label className="block mb-2 text-sm dark:text-text-light text-text-dark">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className={inputClasses}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Snow"
                        className={inputClasses}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Email address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johnsnow@example.com"
                        className={inputClasses}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1234567890"
                        className={inputClasses}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        className={`${inputClasses} ${dynamicClass(passwordStrength < 3)}`}
                      />
                      <small className={`text-xs mt-1 ${passwordStrength < 3 ? 'text-red-500' : 'text-green-500'}`}>
                        {dynamicMessage(passwordStrength < 3, 'Password strength is good', 'Password is too weak')}
                      </small>
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm your password"
                        className={`${inputClasses} ${dynamicClass(!passwordsMatch)}`}
                      />
                      <small className={`text-xs mt-1 ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                        {dynamicMessage(passwordsMatch, 'Passwords match', 'Passwords do not match')}
                      </small>
                    </div>

                    <Button
                      type="submit"
                    >
                      Register
                    </Button>
                  </form>
                )}
                <div className="mt-4 text-sm">
                  <Button
                    type="button"
                    onClick={handleToggleForm}
                    isActive={isRegistering}
                  >
                    {isRegistering ? 'Already have an account? Login' : 'Create a new account'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

