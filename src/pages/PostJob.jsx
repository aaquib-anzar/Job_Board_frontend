import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function PostJob({ user }) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/signin" replace />;
  }
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    company: "",
    location: "",
    description: "",
    jobType: "",
    salary: "",
    skills: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    company: Yup.string().required("Company name is required"),
    location: Yup.string().required("Location is required"),
    jobType: Yup.string().required("Job Type is required"),
    description: Yup.string().required("Job description is required"),
    salary: Yup.string(),
    skills: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/job/createjob`,
        values,
        {
          withCredentials: true,
        }
      );
      toast.success("Job posted successfully!");
      navigate("/getalljobs");
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-gray-700">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
          Post a Job
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* 2 Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-1">Job Title</label>
                  <Field
                    name="title"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Company Name</label>
                  <Field
                    name="company"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                  />
                  <ErrorMessage
                    name="company"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Location</label>
                  <Field
                    name="location"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Job Type</label>
                  <Field
                    as="select"
                    name="jobType"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select Job type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </Field>
                  <ErrorMessage
                    name="jobType"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Salary</label>
                <Field
                  name="salary"
                  placeholder="e.g. ₹8 LPA or $90k/year"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Required Skills</label>
                <Field
                  name="skills"
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Job Description</label>
                <Field
                  as="textarea"
                  name="description"
                  rows="5"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                {isSubmitting ? "Posting..." : "Submit Job"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
