import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const InfoButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center shadow-lg shadow-cyan-700/200 bg-bg-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 m-3"
    >
      <FaInfoCircle className="text-lg" />
      <span>More Info</span>
    </button>
  );
};

export default InfoButton;


{/* <div>
<InfoButton onClick={() => onOpenModal(agreement)} />
</div> */}