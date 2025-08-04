import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const ApplyJobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const initialValues = {
    coverLetter: "",
    resume: null,
  };

  const validationSchema = Yup.object({
    coverLetter: Yup.string().required("Cover Letter is required"),
    resume: Yup.mixed().required("Resume is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const formData = new FormData();
    formData.append("coverLetter", values.coverLetter),
      formData.append("resume", values.resume);

    try {
      const res = await axios.post(
        `${BASE_URL}/applyjob/apply/${jobId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(res.data.message)
      setStatus({ success: res.data.message });
      navigate("/getalljobs");
    } catch (error) {
      console.error("Apply Error:", error.response?.data || error.message);
      setStatus({
        error:
          error.response?.data?.message || "Failed to apply. Try again later.",
      });
      toast.error("Failed to apply. Try again later.")
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Apply for Job</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, status }) => (
          <Form className="space-y-6">
            {status?.success && (
              <p className="text-green-400">{status.success}</p>
            )}
            {status?.error && <p className="text-red-400">{status.error}</p>}

            <div>
              <label htmlFor="coverLetter" className="block mb-2 text-sm">
                Cover Letter
              </label>
              <Field
                as="textarea"
                name="coverLetter"
                rows="5"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
              />
              <ErrorMessage
                name="coverLetter"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="resume" className="block mb-2 text-sm">
                Upload Resume (PDF only)
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={(e) =>
                  setFieldValue("resume", e.currentTarget.files[0])
                }
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
              />
              <ErrorMessage
                name="resume"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApplyJobForm;
