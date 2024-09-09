import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import useResourcesCompalints from "@/app/customeHook/complaints";
import { jwtDecode } from "jwt-decode";

import { useEffect, useState } from "react"
export default function Complaints(){
  const {fetchedComplaintsData,deleteComplaintData,createdComplaintData,loading,error} = useResourcesCompalints()
  

  const {tokens} = useContext(AuthContext)
  const decodeTokens = jwtDecode(tokens.access)
  const token_username = decodeTokens.username
  console.log(token_username)
  
  const handleSendinMessage = (e)=>{
    e.preventDefault();
    const subject = e.target.elements.subject.value
    const category = e.target.elements.category.value
    const priority = e.target.elements.priority.value
    const message = e.target.elements.message.value 

    // tokens releated info
    const address = decodeTokens.address
    const user_name = decodeTokens.username
    const phone_number = decodeTokens.phone_number
    console.log(phone_number)
    console.log(subject,category,priority,message)
    console.log(tokens)
    const complaintDetails = {
      user_name,
      phone_number,
      address,
      subject,
      message,
      category,
      priority, 
    }

    console.log(complaintDetails)
    createdComplaintData(complaintDetails)
    const form = document.getElementById('complaintsSumbitionForm')
    form.reset()

  }
  // ----------------
  
  const [complaintsMessage,setComplaintsMessage] = useState([])
  

  useEffect(() => {
    if (Array.isArray(fetchedComplaintsData)) {
      setComplaintsMessage(fetchedComplaintsData);
    } else {
      setComplaintsMessage([]);
    }
  }, [fetchedComplaintsData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading complaints: {error.message}</div>;
  return(
    <>
    
    <div>
    <div class=" flex items-center justify-center">
        <div class="bg-white  rounded-lg px-8 py-4  w-full max-w-4xl">
            <h2 class="text-2xl font-semibold text-gray-800 mb-3 text-center">Send a Message</h2>
            <form onSubmit={handleSendinMessage} id="complaintsSumbitionForm" method="POST">
                <div class="grid grid-cols-1 gap-3">

                    {/* <!-- Subject (full width) --> */}
                    <div class="mb-4">
                        <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
                        <input type="text" id="subject" name="subject" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter the subject" required/>
                    </div>

                    {/* <!-- Category and Priority (two columns) --> */}
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* <!-- Category --> */}
                        <div class="mb-4">
                            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                            <select id="category" name="category" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="maintenance">Maintenance</option>
                                <option value="payment">Payment</option>
                                <option value="noise">Noise Complaint</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* <!-- Priority --> */}
                        <div class="mb-4">
                            <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
                            <select id="priority" name="priority" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {/* <!-- Message (full width) --> */}
                    <div class="mb-4">
                        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" name="message" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your message" required></textarea>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <div class="mt-6">
                        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Send Message</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<div className=" min-h-screen flex items-center justify-center p-4">
  <div className="bg-gray-100 shadow-lg rounded-lg w-full max-w-4xl p-6">
    <div className="flex items-center mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 text-blue-700 mr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>



      <h2 className="text-2xl font-semibold text-gray-800">Message History</h2>
    </div>

    <div className="space-y-4">
      {/* Message Cards */}
      {complaintsMessage.map((message, index) => {
        if (message.user_name === token_username) {
          return (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                {/* Subject with Icon */}
                <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2 text-sky-700">
  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>


                  <h3 className="text-lg font-semibold text-gray-800">Subject: {message.subject}</h3>
                </div>

                {/* Date */}
                <span className="text-sm text-gray-500">


📅 {message.created_at.slice(0, 10)} | ⏰ {message.created_at.slice(11, 16)}
                </span>
              </div>

              {/* Category and Priority */}
              <div className=" mb-2">
                
                <p className="text-sm text-gray-700">
                  <strong>Category:</strong> {message.category}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Priority:</strong> {message.priority}
                </p>
              </div>

              {/* Message */}
              <div className="mb-4 bg-lime-100 p-6 rounded-lg mr-5">
                <p className="text-sm text-gray-700"><strong>Message:</strong></p>
                <p className="text-gray-600">{message.message}</p>
              </div>

              {/* Response */}
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
          );
        }
      })}
    </div>
  </div>
</div>

    
    </>
  )
}