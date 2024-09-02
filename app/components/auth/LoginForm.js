'use client';

import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

function LoginForm() {
  // const [accountType, setAccountType] = useState('tenant');
  // const [isRegistering, setIsRegistering] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [passwordStrength, setPasswordStrength] = useState(0);

  const {login} = useContext(AuthContext)
 
  const handleSubmit = (e) => {
    

    e.preventDefault();
    const username = e.target.username.value
    const password = e.target.password.value

    console.log(username,password)
    login({username,password})


    
  };


// ---------------------------------------------------------------------------------------------------------------------- 
  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match!');
  //     return;
  //   }
  //   if (passwordStrength < 3) {
  //     alert('Password is too weak!');
  //     return;
  //   }
  // };
  // const handlePasswordChange = (e) => {
  //   const newPassword = e.target.value;
  //   setPassword(newPassword);
  //   setPasswordStrength(zxcvbn(newPassword).score + 1);
  // };
  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPassword(e.target.value);
  // };
  // const handleToggleForm = () => {
  //   setIsRegistering(!isRegistering);
  // };
// ---------------------------------------------------------------------------------------------------------------------- 

  // const passwordsMatch = password === confirmPassword;

  return (

<>
<div className="mt-20 relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-2 text-gray-500">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-5">
            <form action="" onSubmit={handleSubmit}>
              <div className="relative mt-6">
                <input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="NA"
                />
                <label
                  htmlFor="username"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Username
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>
              <div className="my-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                  Login in
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Don&#x27;t have an account yet?
                <a
                  href="#!"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Sign up
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
</>

    // <section className="bg-bg-light dark:bg-bg-dark">
    //   <div className="flex justify-center min-h-screen">
    //     <div className="hidden bg-cover lg:block"></div>

    //     <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
    //       <div className="w-full">
    //         <h1 className="text-4xl font-bold tracking-wider dark:text-text-light text-[#5d3f31] capitalize">
    //           {accountType === 'tenant' ? 'Tenant Login' : 'Property Owner Login'}
    //         </h1>

    //         <p className="mt-4 dark:text-gray-400 text-lg text-[#724c3a]">
    //           {accountType === 'tenant'
    //             ? 'Please log in to your tenant account.'
    //             : 'Please log in to your property owner account.'}
    //         </p>

    //         <div className="mt-6">
    //           <h1 className="text-[#724c3a] dark:text-gray-300">Select type of account</h1>

    //           <div className="mt-3 md:flex md:items-center md:-mx-2">
    //             <button
    //               onClick={() => setAccountType('tenant')}
    //               className={`flex justify-center w-full px-6 py-3 rounded-md md:w-auto md:mx-2 focus:outline-none ${accountType === 'tenant' ? 'bg-primary text-white' : 'text-primary border border-primary'}`}
    //             >
    //               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    //                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    //               </svg>
    //               <span className="mx-2">Tenant</span>
    //             </button>

    //             <button
    //               onClick={() => setAccountType('property-owner')}
    //               className={`flex justify-center w-full px-6 py-3 mt-4 rounded-md md:mt-0 md:w-auto md:mx-2 ${accountType === 'property-owner' ? 'bg-primary text-white' : 'text-primary border border-primary'}`}
    //             >
    //               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    //                 <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    //               </svg>
    //               <span className="mx-2">Property Owner</span>
    //             </button>
    //           </div>
    //         </div>

    //         {accountType === 'tenant' ? (
    //           <form onSubmit={handleLogin} className="mt-8">
    //             <div>
    //               <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Email address</label>
    //               <input
    //                 type="email"
    //                 name='email'
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 placeholder="johnsnow@example.com"
    //                 className="block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
    //               />
    //             </div>

    //             <div className="mt-4">
    //               <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Password</label>
    //               <input
    //                 type="password"
    //                 name='password'
    //                 value={password}
    //                 onChange={handlePasswordChange}
    //                 placeholder="Enter your password"
    //                 className="block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
    //               />
    //             </div>

    //             <button
    //               type="submit"
    //               className="flex justify-center w-full px-6 py-3 mt-6 text-l tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md hover:bg-primary/80 focus:outline-none focus:ring focus:ring-primary/50 focus:ring-opacity-50"
    //             >
    //               <span>Login</span>
    //             </button>
    //           </form>
    //         ) : (
    //           <div>
    //             {!isRegistering ? (
    //               <form onSubmit={handleLogin} className="mt-8">
    //                 <div>
    //                   <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Email address</label>
    //                   <input
    //                     type="email"
    //                     name = 'email'
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     placeholder="johnsnow@example.com"
    //                     className="block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
    //                   />
    //                 </div>

    //                 <div className="mt-4">
    //                   <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Password</label>
    //                   <input
    //                     type="password"
    //                     name='password'
    //                     value={password}
    //                     onChange={handlePasswordChange}
    //                     placeholder="Enter your password"
    //                     className="block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
    //                   />
    //                 </div>

    //                 <button
    //                   type="submit"
    //                   className="flex justify-center w-full px-6 py-3 mt-6 text-l tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md hover:bg-primary/80 focus:outline-none focus:ring focus:ring-primary/50 focus:ring-opacity-50"
    //                 >
    //                   <span>Login</span>
    //                 </button>
    //               </form>
    //             ) : (
    //               <form onSubmit={handleRegister} className="mt-8">
    //                 <div>
    //                   <label className="block mb-2 text-sm dark:text-text-light text-text-dark">First Name</label>
    //                   <input
    //                     type="text"
    //                     value={firstName}
    //                     onChange={(e) => setFirstName(e.target.value)}
    //                     placeholder="John"
    //                     className="block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
    //                   />
    //                 </div>

    //                 <div className="mt-4">
    //                   <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Last Name</label>
    //                   <input
    //                     type="text"
    //                     value={lastName}
    //                     onChange={(e) => setLastName(e.target.value)}
    //                     placeholder="Snow"
    //                     className="block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
    //                   />
    //                 </div>

    //                 <div className="mt-4">
    //                   <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Email address</label>
    //                   <input
    //                     type="email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     placeholder="johnsnow@example.com"
    //                     className="block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
    //                   />
    //                 </div>

    //                 <div className="mt-4">
    //                   <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Phone Number</label>
    //                   <input
    //                     type="tel"
    //                     value={phone}
    //                     onChange={(e) => setPhone(e.target.value)}
    //                     placeholder="+1234567890"
    //                     className="block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
    //                   />
    //                 </div>

    //                 <div className="mt-4">
    //                   <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Password</label>
    //                   <input
    //                     type="password"
    //                     name='password'
    //                     value={password}
    //                     onChange={handlePasswordChange}
    //                     placeholder="Enter your password"
    //                     className={`block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 ${passwordStrength < 3 ? 'border-red-500' : 'border-green-500'}`}
    //                   />
    //                   <small className={`text-xs mt-1 ${passwordStrength < 3 ? 'text-red-500' : 'text-green-500'}`}>
    //                     {passwordStrength < 3 ? 'Password is too weak' : 'Password strength is good'}
    //                   </small>
    //                 </div>

    //                 <div className="mt-4">
    //                   <label className="block mb-2 text-sm dark:text-text-light text-text-dark">Confirm Password</label>
    //                   <input
    //                     type="password"
    //                     value={confirmPassword}
    //                     onChange={handleConfirmPasswordChange}
    //                     placeholder="Confirm your password"
    //                     className={`block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 ${passwordsMatch ? 'border-green-500' : 'border-red-500'}`}
    //                   />
    //                   <small className={`text-xs mt-1 ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
    //                     {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
    //                   </small>
    //                 </div>

    //                 <button
    //                   type="submit"
    //                   className="flex justify-center w-full px-6 py-3 mt-6 text-l tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md hover:bg-primary/80 focus:outline-none focus:ring focus:ring-primary/50 focus:ring-opacity-50"
    //                 >
    //                   <span>Register</span>
    //                 </button>
    //               </form>
    //             )}
    //             <div className="mt-4 text-sm">
    //               <button onClick={handleToggleForm} className="text-primary hover:underline">
    //                 {isRegistering ? 'Already have an account? Login' : 'Create a new account'}
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default LoginForm;