// LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-dark">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 border-8 border-t-8 border-primary border-solid rounded-full animate-spin"></div>
        <div className="absolute w-24 h-24 border-8 border-t-8 border-transparent border-primary-dark rounded-full animate-pulse"></div>
      </div>
      <p className="mt-4 text-xl font-semibold text-primary-dark dark:text-text-light">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
