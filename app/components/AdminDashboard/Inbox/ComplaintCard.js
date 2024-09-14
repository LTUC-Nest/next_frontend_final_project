export default function ComplaintCard({ message, onRespond }) {
    return (
      <div className="bg-white dark:bg-gray-900 border-l-4 border-blue-400 dark:border-blue-600 p-6 shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
        {/* Delete Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 ml-auto text-gray-500 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-600 cursor-pointer"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
   */}
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500 dark:text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 3a1 1 0 100 2h10a1 1 0 100-2H5z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {message.subject}
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            📅 {message.created_at.slice(0, 10)} | ⏰{" "}
            {message.created_at.slice(11, 16)}
          </span>
        </div>
  
        {/* User Info Section */}
        <div className="mb-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2 text-blue-400 dark:text-blue-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
  
            <p>
              <strong>Username:</strong> {message.user_name}
            </p>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2 text-blue-400 dark:text-blue-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
  
            <p>
              <strong>Phone:</strong> {message.phone_number}
            </p>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2 text-blue-400 dark:text-blue-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
  
            <p>
              <strong>Address:</strong> {message.address}
            </p>
          </div>
        </div>
  
        {/* Message Details Section */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Category:</strong> {message.category}
          </p>
          <p
            className={
              message.priority === "high"
                ? "mt-2 text-sm text-black bg-red-500 dark:bg-red-600 w-fit rounded p-0.5 motion-safe:animate-pulse"
                : message.priority === "medium"
                ? "mt-2 text-sm text-black bg-orange-300 dark:bg-orange-400 w-fit rounded p-0.5"
                : "mt-2 text-sm text-black-700 bg-blue-500 dark:bg-blue-600 w-fit rounded p-0.5"
            }
          >
            <strong>Priority:</strong> {message.priority}
          </p>
        </div>
  
        <div className="mb-4 bg-lime-100 dark:bg-lime-700 p-6 rounded-lg mr-5">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Message:</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-200">{message.message}</p>
        </div>
  
        {/* Response Section */}
        <div className="mb-4 ml-8 bg-lime-200 dark:bg-lime-800 p-8 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Your Response:</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            {message.response || "No response yet."}
          </p>
        </div>
  
        {/* Action Section */}
        <div className="flex justify-end">
          <button
            onClick={onRespond}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:ring-opacity-75"
          >
            Respond
          </button>
        </div>
      </div>
    );
  }
  