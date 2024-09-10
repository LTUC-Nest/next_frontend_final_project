import React from 'react';

const ComplaintCard = ({ message, token_username }) => {
    return message.user_name === token_username ? (
        <div className="dark:bg-gray-900 border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2 text-sky-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800">Subject: {message.subject}</h3>
                </div>
                <span className="text-sm text-gray-500">
                    📅 {message.created_at.slice(0, 10)} | ⏰ {message.created_at.slice(11, 16)}
                </span>
            </div>
            
            {/* Category and Priority */}

            <div className="mb-2">
                <p className="text-sm text-gray-700">
                    <strong>Category:</strong> {message.category}
                </p>
                <p className="text-sm text-gray-700">
                    <strong>Priority:</strong> {message.priority}
                </p>
            </div>
            <div className="mb-4 bg-lime-100 p-6 rounded-lg mr-5">
                <p className="text-sm text-gray-700"><strong>Message:</strong></p>
                <p className="text-gray-600">{message.message}</p>
            </div>
            {message.response ? (
                <div className="mb-4 ml-8 bg-lime-200 p-8 rounded-lg">
                    <p className="text-sm text-gray-700"><strong>Response:</strong></p>
                    <p className="text-gray-600">{message.response}</p>
                </div>
            ) : (
                <div className="bg-yellow-100 p-3 rounded-md text-yellow-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.5-11.5a1 1 0 112 0v4a1 1 0 11-2 0v-4zm0 6.5a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                    </svg>
                    <p>No Response Yet</p>
                </div>
            )}
        </div>
    ) : null;
};

export default ComplaintCard;
