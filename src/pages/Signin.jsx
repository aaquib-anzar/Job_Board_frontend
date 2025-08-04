import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

export default function Signin({ setUser }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string(),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signin`,
        values,
        { withCredentials: true }
      );
      toast.success("Login Successfully");
      setUser(res.data.user);
      navigate("/");
      resetForm();
    } catch (err) {
      console.error(err);
      setErrors({ email: "Invalid email or password" });
      toast.error("Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = () => setShowPassword((prev) => !prev);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/google-login`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      if (res.data.redirect) {
        toast.error("Sign up first");
        navigate(res.data.url);
      } else {
        toast.success("Login Successfully");
        setUser(res.data.user);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Sign In
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-300 mb-1"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  placeholder="you@example.com"
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div className="text-red-400 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-300 mb-1"
                >
                  Password
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 pr-12 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  placeholder="••••••••"
                />
                <span
                  onClick={handleToggle}
                  className="mt-3 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                <ErrorMessage name="password">
                  {(msg) => (
                    <div className="text-red-400 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 text-white transition duration-300"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-center font-semibold px-1">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500">
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="text-gray-400">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Google Sign In Button */}
        <div className="text-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => toast.error("Login Failed")}
          />
        </div>
      </div>
    </div>
  );
}
