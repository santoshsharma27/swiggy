import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the current form mode based on URL
  const isLogin = location.pathname === "/login";

  // Formik configurations for login and signup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "", // Used only in Signup
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      ...(isLogin
        ? {} // Skip confirmPassword validation for login
        : {
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Required"),
          }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        // Simulate login/signup API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/"); // Redirect on success
      } catch (err) {
        setError(`Invalid ${isLogin ? "login" : "signup"} attempt`);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleToggleForm = () => {
    // Toggle between login and signup routes
    navigate(isLogin ? "/signup" : "/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {error && (
            <div className="text-red-600 text-center font-medium mb-4">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Input for Signup */}
          {!isLogin && (
            <div className="mb-6">
              <label
                className="block text-gray-600 font-semibold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Re-enter your password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
                ? "Login"
                : "Sign Up"}
          </button>
        </form>

        {/* Link to Toggle Between Login and Signup */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={handleToggleForm}
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
