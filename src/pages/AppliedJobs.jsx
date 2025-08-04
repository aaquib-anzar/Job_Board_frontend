import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/applyjob/myjobs`, {
          withCredentials: true,
        });
        setApplications(res.data.applications);
      } catch (err) {
        console.error("Error fetching applications", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-300";

      case "reviewed":
        return "bg-blue-500/10 text-blue-300";

      case "accepted":
        return "bg-green-500/10 text-green-300";

      case "rejected":
        return "bg-red-500/10 text-red-300";

      default:
        return "bg-yellow-500/10 text-yellow-300";
    }
  };
  const handleDelete = async(applicationid) => {
    try {
      const res = await axios.delete(`${BASE_URL}/applyjob/delete/${applicationid}`,{withCredentials:true})
      toast.success(res.data.message)
      setApplications(applications.filter((app) => app._id !== applicationid))
      
      
    } catch (error) {
      console.error("Application delete error",error.message)
      toast.error("Failed to delete the application")
    }

  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-cyan-400">
          My Applied Jobs
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">
            Loading your applications...
          </p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white/5 shadow-lg rounded-xl p-6 border border-gray-700  hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-xl font-semibold text-cyan-300">
                      {app.job?.title || "Untitled"}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {app.job?.company || "Unknown Company"}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
                        app.status
                      )}`}
                    >
                      Status: {app.status}
                    </span>

                    <button
                      onClick={() => handleDelete(app._id)}
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-md text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mt-2">
                  <strong>Cover Letter:</strong> {app.coverLetter}
                </p>

                <div className="mt-3 flex  justify-between text-sm text-gray-400">
                  <p>
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
