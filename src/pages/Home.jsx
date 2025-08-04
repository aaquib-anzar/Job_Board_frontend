import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SpotlightPreview } from "./SpotlightPreview";
import { InfiniteMovingCards } from "../components/ui/InfiniteMovingCars";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import axios from "axios";
import { items } from "../utils/items";
import { testimonials } from "../utils/data";

export default function Home() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL 
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/job/getjobs`);
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);
  const latestJobs = jobs.slice(0, 3);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <SpotlightPreview />

        {/* Jobs Preview Section */}
        <section className="my-12">
          <div className="flex items-center justify-between mb-6 border-b border-gray-600 pb-2">
            <h2 className="text-3xl font-bold text-cyan-400">Recent Jobs</h2>
            <Link
              to="/getalljobs"
              className="text-sm text-cyan-400 hover:underline hover:text-white transition duration-200"
            >
              View All Jobs →
            </Link>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Replace with dynamic job data */}
            {latestJobs.map((job) => (
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
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 border-b border-gray-700 pb-2">
            Popular Job Categories
          </h2>
          <InfiniteMovingCards items={items} direction="right" speed="slow" />
        </section>
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 border-b border-gray-700 pb-2">
            What People Are Saying
          </h2>

          <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
            <AnimatedTestimonials testimonials={testimonials} />;
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
