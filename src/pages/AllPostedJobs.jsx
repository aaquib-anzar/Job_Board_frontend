import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function AllPostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/job/postedjobs`, {
          withCredentials: true,
        });
        setJobs(res.data.jobs);
      } catch (error) {
        console.error("Error fetching posted jobs:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  const handleUpdate = (jobId) => {
    navigate(`/updatejob/${jobId}`)
  };
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`${BASE_URL}/job/deletejob/${jobId}`, {
        withCredentials: true,
      });
      toast.success("Job deleted successflly")
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error.message);
      toast.error("Job deletion failed")
    }
  };
  const handleApplications = (jobId) => {
    navigate(`/applications/${jobId}`)
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          Jobs You've posted
        </h1>
        {loading ? (
          <p className="text-gray-400">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-400">You haven't posted any jobs yet.</p>
        ) : (
          <ul className="sapce-y-6">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="bg-white/5 p-6 rounded-xl border border-gray-700 shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-cyan-300">
                      {job.title}
                    </h2>
                    <p className="text-sm text-gray-400">{job.company}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Posted on:{new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(job._id)}
                      className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 rounded-md text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-md text-white"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleApplications(job._id)}
                      className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 rounded-md text-white"
                    >
                      Applications
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AllPostedJobs;
