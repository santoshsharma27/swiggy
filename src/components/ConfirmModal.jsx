function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white rounded-lg p-6 max-w-xs sm:max-w-sm mx-auto w-full sm:w-auto shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center text-gray-800">
          Confirm Action
        </h2>
        <p className="text-gray-600 text-sm sm:text-base text-center">
          Are you sure you want to clear the cart?
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
