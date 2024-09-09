import useResourcesComplaints from "@/app/customeHook/complaints";
import { useState } from "react";

export default function Response({ onClose,messageInfo }) {
const {patchedComplaintData} = useResourcesComplaints()
const [responseValue,setResponseValue] = useState('')

const handleResponseChange = (e) => {
  setResponseValue(e.target.value); // Update state with the new input
};
console.log('>>.',messageInfo)
const handleResponseMessage = (e)=>{
  patchedComplaintData(messageInfo.id,'response',responseValue)
  onClose()
}

  return (
<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <div className="flex items-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89-3.79a2 2 0 011.82 0L21 8m-9 4v9m0-9l-7.39-3.73A2 2 0 003 8v9a2 2 0 002 2h14a2 2 0 002-2V8M9 21h6" />
      </svg>
      <h2 className="text-lg font-semibold text-gray-900">Respond to <span className='text-green-500'>{messageInfo.user_name}</span> Complaint </h2>
    </div>

    {/* Label and Textarea */}
    <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
    <textarea 
      onChange={handleResponseChange} 
      id="response" 
      name="response" 
      rows="6" 
      className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
      placeholder="Enter your response here..." 
      required
    ></textarea>

    {/* Buttons Section */}
    <div className="mt-6 flex justify-end space-x-4">
      <button 
        onClick={handleResponseMessage} 
        type="submit" 
        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150"
      >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

        Send Response
      </button>
      
      <button 
        onClick={onClose} 
        type="button" 
        className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150"
      >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        Cancel
      </button>
    </div>
  </div>
</div>

  );
}
