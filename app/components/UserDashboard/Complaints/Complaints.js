import { useState } from "react";
import ComplaintForm from "./ComplaintForm";
import ComplaintHistory from "./ComplaintHistory";

export default function Complaints() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // وظيفة لفتح وإغلاق النافذة المنبثقة
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex justify-center mb-1 animate__animated animate__bounceInUp">
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Open Message Form
        </button>
      </div>

      {/* نافذة منبثقة */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ComplaintForm />
          </div>
        </div>
      )}
      <ComplaintHistory />
    </>
  );
}
