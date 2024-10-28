import { useRouteError, useNavigate } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-5 px-4">
      <div className="max-w-md text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!!!</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-gray-700 mb-4">
          We're sorry, but we encountered an unexpected error.
        </p>
        <p className="text-lg font-bold text-gray-800">
          Error {err.status}: {err.statusText}
        </p>
        <button
          onClick={handleGoHome} // Navigate to the home page
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
