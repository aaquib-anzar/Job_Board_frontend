import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateJob() {
  const [initialFormValues, setInitialFormvalues] = useState(null);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const validationSchema = Yup.object({
    description: Yup.string(),
    location: Yup.string(),
    salary: Yup.string(),
    skills: Yup.string(),
    title: Yup.string(),
    jobType: Yup.string(),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const updatedField = {};
      for (const key in values) {
        if (values[key] !== initialFormValues[key]) {
          updatedField[key] = values[key];
        }
      }
      if (Object.keys(updatedField).length === 0) {
        toast("No changes to update");
        return;
      }
      const res = await axios.put(
        `${BASE_URL}/job/updatejob/${jobId}`,
        updatedField,
        { withCredentials: true }
      );
      toast.success("Job updated successfully!");
      navigate(`/job/${jobId}`);
      resetForm();
    } catch (error) {
      console.error("Error Update Job", error.message);

      toast.error("Failed to update job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(
        `${BASE_URL}/job/getjob/${jobId}`
        );
        setInitialFormvalues(res.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-gray-700">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
          Update Job
        </h2>
        <Formik
          initialValues={initialFormValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
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
                  <label className="block text-sm mb-1">Required Skills</label>
                  <Field
                    name="skills"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                  />

                  <ErrorMessage
                    name="skills"
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
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                />

                <ErrorMessage
                  name="salary"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
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
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
