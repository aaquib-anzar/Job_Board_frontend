import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom"

function JobDetails({ user }) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/job/getjob/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);
  const handleApplyClick = () => {
    navigate(`/applyjob/${job._id}`);
  };
  if (loading)
    return <p className="text-center text-white mt-20">Loading...</p>;
  if (!job)
    return <p className="text-center text-red-400 mt-20">Job not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-4 mt-4 ">
      <div className="max-w-3xl mx-auto bg-white/5 p-8 rounded-2xl border border-gray-700 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
          {job.title}
        </h1>

        <div className="space-y-2 text-base md:text-lg text-gray-300">
          <p>
            <span className="font-semibold text-gray-400">Company:</span>{" "}
            {job.company}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Location:</span>{" "}
            {job.location}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Job Type:</span>{" "}
            {job.jobType}
          </p>
          <p>
            <span className="font-semibold text-gray-400">
              Skills Required:
            </span>{" "}
            {job.skills}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Posted On:</span>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6 text-gray-200">
          <h2 className="text-xl font-semibold mb-2 text-cyan-300">
            Job Description
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-sm md:text-base">
            {job.description}
          </p>
        </div>
        {/*Apply Button*/}
        <div className="mt-8 flex flex-row gap-6 flex-wrap items-center">
          {user?.role === "applicant" ? (
            <button
              onClick={handleApplyClick}
              className="px-6 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition duration-200"
            >
              Apply For This Job →
            </button>
          ) : user?.role === "employer" ? (
            <button
              disabled
              className="px-6 py-2 rounded-md bg-gray-600 text-white font-medium cursor-not-allowed"
            >
              Employers cannot apply
            </button>
          ) : null}

          <Link
            to="/getalljobs"
            className="inline-block text-cyan-400 hover:underline hover:text-white transition duration-200"
          >
            ← Back to all jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
