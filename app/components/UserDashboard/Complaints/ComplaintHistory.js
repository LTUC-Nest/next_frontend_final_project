// components/UserDashboard/Complaints/MessageHistory.js
import { TransitionGroup } from "react-transition-group";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/authContext";
import ComplaintsResources from "@/app/customHook/ComplaintsResources";
import {jwtDecode} from "jwt-decode";
import ComplaintCard from "./ComplaintCard";

export default function ComplaintHistory() {
  const { fetchedComplaintsData, loading, error } = ComplaintsResources();
  const { tokens } = useContext(AuthContext);
  const decodeTokens = jwtDecode(tokens.access);
  const token_username = decodeTokens.username;

  const [complaintsMessage, setComplaintsMessage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(fetchedComplaintsData)) {
      setComplaintsMessage(fetchedComplaintsData.filter(message => message.user_name === token_username));
    } else {
      setComplaintsMessage([]);
    }
  }, [fetchedComplaintsData, token_username]);

  const handleNext = () => {
    if (currentIndex < complaintsMessage.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading complaints: {error.message}</div>;

  return (
    <div className="flex items-center justify-center p-4 animate__animated animate__bounceInUp">
      <div className="shadow-lg rounded-lg w-full max-w-4xl p-6">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 text-blue-700 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Message History</h2>
        </div>

        {complaintsMessage.length > 0 ? (
          <>
            <TransitionGroup className="space-y-4">
              {/* استخدام مكون MessageCard */}
              <ComplaintCard
                message={complaintsMessage[currentIndex]}
                token_username={token_username}
                currentIndex={currentIndex}
              />
            </TransitionGroup>

            {/* Buttons for navigation */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === complaintsMessage.length - 1}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentIndex === complaintsMessage.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
}
