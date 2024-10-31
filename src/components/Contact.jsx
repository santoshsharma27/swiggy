import { useEffect, useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="mx-auto mt-12 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Contact Us
      </h2>

      {submitted ? (
        <p className="text-center font-semibold text-green-600">
          Thank you for reaching out! We’ll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white shadow-md transition-all duration-200 ease-in-out hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send Message
          </button>
        </form>
      )}

      {/* Contact Information */}
      <div className="mt-12 text-center">
        <p className="font-semibold text-gray-700">Or reach us at:</p>
        <p className="mt-2 text-gray-600">Bangalore, Karnataka, 560076</p>
        <p className="mt-1 text-gray-600">Phone: +91 7003189753</p>
        <p className="mt-1 text-gray-600">Email: santosh37kr@gmail.com</p>
      </div>
    </div>
  );
};

export default ContactUs;
