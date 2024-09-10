import React, { useState } from 'react';
import Modal from 'react-modal';

const ComplaintForm = ({ createdComplaintData, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    if (onClose) onClose();
  };

  const handleSendinMessage = (e) => {
    e.preventDefault();
    const subject = e.target.elements.subject.value;
    const category = e.target.elements.category.value;
    const priority = e.target.elements.priority.value;
    const message = e.target.elements.message.value;

    const complaintDetails = {
      subject,
      message,
      category,
      priority,
    };

    createdComplaintData(complaintDetails);
    const form = document.getElementById("complaintsSubmissionForm");
    form.reset();
    closeModal();
  };

  return (
    <>
      <button 
        onClick={openModal} 
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md shadow-md"
      >
        Submit a Complaint
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Complaint Form"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-bg-dark bg-opacity-50"
      >
        <div className="animate__animated animate__bounceInUp bg-bg-light dark:bg-bg-dark p-6 rounded-lg shadow-md relative z-10 w-full max-w-3xl border border-primary-dark dark:border-primary">
          <h2 className="text-lg font-semibold mb-4 text-text-dark dark:text-text-light text-center">
            Send a Message
          </h2>

          <form
            onSubmit={handleSendinMessage}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            id="complaintsSubmissionForm"
            method="POST"
          >
            {/* Subject */}
            <div className="col-span-2">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-text-dark dark:text-text-light mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                placeholder="Enter the subject"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-text-dark dark:text-text-light mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              >
                <option value="maintenance">Maintenance</option>
                <option value="payment">Payment</option>
                <option value="noise">Noise Complaint</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-text-dark dark:text-text-light mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Message */}
            <div className="col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-text-dark dark:text-text-light mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded-md text-sm mr-2 hover:bg-red-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm hover:bg-green-600"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ComplaintForm;
