import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation (basic)
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Here you could send the data to an API or email service
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Contact Us
      </h2>

      {submitted ? (
        <p className="text-center text-green-600 font-semibold">
          Thank you for reaching out! We’ll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message here"
              rows="5"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-bold bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
          >
            Send Message
          </button>
        </form>
      )}

      {/* Contact Information */}
      <div className="mt-12 text-center">
        <p className="text-gray-700 font-semibold">Or reach us at:</p>
        <p className="mt-2 text-gray-600">Bangalore, Karnataka, 560076</p>
        <p className="mt-1 text-gray-600">Phone: +91 7003189753</p>
        <p className="mt-1 text-gray-600">Email: santosh37kr@gmail.com</p>
      </div>
    </div>
  );
};

export default ContactUs;
