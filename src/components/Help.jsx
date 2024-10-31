import { useEffect } from "react";

const helpTopics = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, browse through our menu, select your items, and click on the 'Add to Cart' button. Once you're ready, proceed to checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit cards, debit cards, and popular digital wallets.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, you will receive a tracking link via email or SMS. You can also check your order status in the 'My Orders' section of your account.",
  },
  {
    question: "Can I modify my order after placing it?",
    answer:
      "If you need to modify your order, please contact our support team as soon as possible. Changes can only be made if the order has not yet been prepared.",
  },
];

const HelpPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 px-6 py-12 pt-24 md:px-12 lg:px-24">
      <h1 className="mb-10 text-center text-4xl font-bold text-gray-800">
        Help & Support
      </h1>

      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {helpTopics.map((topic, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-4 shadow-md transition duration-300 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {topic.question}
              </h3>
              <p className="mt-2 text-gray-600">{topic.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Contact Us
        </h2>
        <p className="mb-2 text-gray-600">
          If you have any other questions or need further assistance, feel free
          to reach out:
        </p>
        <p className="text-gray-600">
          Email: <span className="text-blue-500">santosh37kr@gmail.com</span>
        </p>
        <p className="text-gray-600">
          Phone: <span className="text-blue-500">+91 (700) 3189-453</span>
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
