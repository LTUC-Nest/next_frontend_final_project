import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import ComplaintsResources from "@/app/customHook/ComplaintsResources";
import { jwtDecode } from "jwt-decode";

export default function ComplaintForm() {
  const { createdComplaintData } = ComplaintsResources();
  const { tokens } = useContext(AuthContext);
  const decodeTokens = jwtDecode(tokens.access);
  const token_username = decodeTokens.username;

  const handleSendinMessage = (e) => {
    e.preventDefault();
    const subject = e.target.elements.subject.value;
    const category = e.target.elements.category.value;
    const priority = e.target.elements.priority.value;
    const message = e.target.elements.message.value;

    // tokens related info
    const address = decodeTokens.address;
    const user_name = decodeTokens.username;
    const phone_number = decodeTokens.phone_number;

    const complaintDetails = {
      user_name,
      phone_number,
      address,
      subject,
      message,
      category,
      priority,
    };

    createdComplaintData(complaintDetails);
    const form = document.getElementById("complaintsSumbitionForm");
    form.reset();
  };

  return (
    <div class="flex items-center justify-center text-text-dark animate__animated animate__bounceInUp">
      <div class="bg-white drak:bg-gray-900 rounded-lg px-8 py-4 w-full max-w-4xl">
        <h2 class="text-2xl font-semibold text-gray-800 mb-3 text-center">
          Send a Message
        </h2>
        <form onSubmit={handleSendinMessage} id="complaintsSumbitionForm" method="POST">
          <div class="grid grid-cols-1 gap-3">
            {/* Subject */}
            <div class="mb-4">
              <label for="subject" class="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter the subject"
                required
              />
            </div>

            {/* Category and Priority */}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="mb-4">
                <label for="category" class="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="payment">Payment</option>
                  <option value="noise">Noise Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="priority" class="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div class="mb-4">
              <label for="message" class="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div class="mt-6">
              <button
                type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
