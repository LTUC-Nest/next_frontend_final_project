import ComplaintsResources from "@/app/customHook/ComplaintsResources";
import { useState } from "react";

export default function Response({ onClose, messageInfo }) {
  const { patchedComplaintData } = ComplaintsResources();
  const [responseValue, setResponseValue] = useState("");

  const handleResponseChange = (e) => {
    setResponseValue(e.target.value); // Update state with the new input
  };

  const handleResponseMessage = (e) => {
    patchedComplaintData(messageInfo.id, "response", responseValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg-dark-header bg-opacity-50 z-50 dark:bg-bg-dark dark:bg-opacity-70">
      <div className="bg-bg-light p-6 rounded-lg shadow-lg w-full max-w-md dark:bg-bg-dark dark:text-text-light">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary mr-2 dark:text-primary-dark"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89-3.79a2 2 0 011.82 0L21 8m-9 4v9m0-9l-7.39-3.73A2 2 0 003 8v9a2 2 0 002 2h14a2 2 0 002-2V8M9 21h6"
            />
          </svg>
          <h2 className="text-lg font-semibold text-text-dark dark:text-text-light">
            Respond to <span className="text-primary dark:text-primary-dark">{messageInfo.user_name}</span>'s
            Complaint
          </h2>
        </div>

        {/* Label and Textarea */}
        <label
          htmlFor="response"
          className="block text-sm font-medium text-text-dark mb-2 dark:text-text-light"
        >
          Your Response
        </label>
        <textarea
          onChange={handleResponseChange}
          id="response"
          name="response"
          rows="6"
          className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-dark focus:border-primary-dark sm:text-sm dark:border-gray-600 dark:bg-bg-dark dark:placeholder-text-light dark:focus:ring-primary dark:focus:border-primary"
          placeholder="Enter your response here..."
          required
        ></textarea>

        {/* Buttons Section */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleResponseMessage}
            type="submit"
            className="flex items-center bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-primary-dark focus:ring-opacity-75 transition duration-150 dark:bg-primary-dark dark:hover:bg-primary dark:text-text-light dark:focus:ring-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            Send Response
          </button>

          <button
            onClick={onClose}
            type="button"
            className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 dark:bg-red-700 dark:hover:bg-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
