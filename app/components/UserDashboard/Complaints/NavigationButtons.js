import React from 'react';

const NavigationButtons = ({ currentIndex, maxIndex, goToPrevious, goToNext }) => {
  return (
    <div className="absolute inset-x-0 top-0 flex justify-between p-2 shadow-lg ">
      <button 
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className={`bg-primary text-white p-2 rounded ${currentIndex === 0 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
        aria-label="Previous complaint"
      >
        Previous
      </button>
      <button 
        onClick={goToNext}
        disabled={currentIndex === maxIndex}
        className={`bg-primary text-white p-2 rounded ${currentIndex === maxIndex ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
        aria-label="Next complaint"
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
