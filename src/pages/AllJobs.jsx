import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Navigate } from "react-router-dom";

export default function AllJobs({ user }) {
  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/signin" replace />;
  }
  const titleRef = useRef();
  const locationRef = useRef();
  const jobTypeRef = useRef();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const fetchJobs = async (pageNum = 1) => {
    setLoading(true)
    try {
      const payload = {
        title: titleRef.current?.value || "",
        location: locationRef.current?.value || "",
        jobType: jobTypeRef.current?.value || "",
        page: pageNum,
        limit: 9
      };
      const res = await axios.get(`${BASE_URL}/job/getjobs`, {
        params: payload,
        withCredentials: true,
      });
      setJobs(res.data || res.data.jobs);
      if(res.data.pages) setTotalPages(res.data.pages)
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchJobs(1)
  }
  const handleClear = async () => {
    try {
      titleRef.current.value = "";
      locationRef.current.value = "";
      jobTypeRef.current.value = "";
      setPage(1);
      fetchJobs(1);
    } catch (error) {
      console.error("Error clearing filters:", error);
    }
  };
  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-8">
        <h2 className="text-3xl font-bold text-cyan-400">All Jobs</h2>
        <Link
          to="/"
          className="text-cyan-300 hover:text-white hover:underline transition"
        >
          ← Back to Home
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center gap-4 bg-gray-900 p-4 rounded-xl shadow-lg"
      >
        <input
          type="text"
          name="location"
          placeholder="Location"
          ref={locationRef}
          className="font-semibold text-black rounded-lg px-4 py-2 bg-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        />

        <input
          type="text"
          name="title"
          placeholder="Role"
          ref={titleRef}
          className="font-semibold text-black rounded-lg px-4 py-2 bg-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        />
        <select
          name="jobType"
          ref={jobTypeRef}
          className="px-4 py-2 rounded-lg bg-white text-black font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        >
          <option value="">Select Job Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          Clear
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-400 mt-20">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">No jobs found.</p>
      ) : (
        <section>
          <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/10 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-cyan-300">
                  {job.title}
                </h3>
                <p className="text-gray-300">
                  {job.company} • {job.location}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Posted on {new Date(job.createdAt).toLocaleDateString()} •{" "}
                  {job.jobType}
                </p>
                <Link
                  to={`/job/${job._id}`}
                  className="inline-block mt-4 text-cyan-400 hover:underline hover:text-white transition duration-200"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>

          {/*Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button 
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
            >
              ← Previous
            </button>
            <span className="text-gray-400">Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
            >
              Next →
            </button>
          </div>
        </section>
      )}
    </div>
  );
  }
