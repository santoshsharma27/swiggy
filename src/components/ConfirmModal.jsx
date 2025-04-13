/* eslint-disable react/prop-types */
function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
      <div className="mx-auto w-full max-w-xs rounded-lg bg-white p-6 shadow-lg sm:w-auto sm:max-w-sm">
        <h2 className="mb-3 text-center text-lg font-semibold text-gray-800">
          Confirm Action
        </h2>
        <p className="text-center text-sm text-gray-600 sm:text-base">
          Are you sure you want to clear the cart?
        </p>

        <div className="mt-6 flex flex-col justify-center space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button
            onClick={onClose}
            className="w-full rounded bg-gray-300 px-4 py-2 text-gray-800 transition duration-200 ease-in-out hover:bg-gray-400 sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full rounded bg-red-500 px-4 py-2 text-white transition duration-200 ease-in-out hover:bg-red-600 sm:w-auto"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
