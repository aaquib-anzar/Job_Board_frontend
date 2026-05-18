import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "applicant",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    role: Yup.string().oneOf(["applicant", "employer"], "Invalid role").required("Role is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, values, {
        withCredentials: true,
      });
      toast.success("Registered Successfully")
      setUser(res.data.user); // assuming res.data.user is returned on success
      navigate("/signin");
      resetForm();
    } catch (err) {
      console.error(err);
      setErrors({ email: "Email may already be in use" });
      toast.error("Registration failed")
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Register</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                  Name
                </label>
                <Field
                  name="name"
                  id="name"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                />
                <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>
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
                >    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                <ErrorMessage name="password">
                  {(msg) => (
                    <div className="text-red-400 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>


              <div>
                <label htmlFor="role" className="block text-sm text-gray-300 mb-1">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  id="role"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="applicant">Applicant</option>
                  <option value="employer">Employer</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 text-white transition duration-300"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              <p className="text-center font-semibold px-1">Have an account? <Link to="/signin" className="text-blue-500">Login</Link></p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
