import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      toast.success(res.data.message)
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Error")
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md border-b border-gray-600 sticky top-0 z-50 bg-black/70 backdrop-blur-md text-white">
      <Link
        to="/"
        className="text-2xl font-extrabold text-cyan-400 hover:text-white transition duration-300"
      >
        JobBoard
      </Link>

      <div className="flex gap-4">
        {!user ? (
          <>
            <Link
              to="/signin"
              className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-cyan-500 hover:text-white transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-cyan-500 hover:text-white transition duration-300"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {user.role === "employer" && (
              <>
                <Link
                  to="/postedjobs"
                  className="px-4 py-2 text-sm font-medium text-green-400 rounded-md hover:bg-green-600 hover:text-white transition duration-300"
                >
                  Job Posted
                </Link>
                <Link
                  to="/post-job"
                  className="px-4 py-2 text-sm font-medium text-green-400 rounded-md hover:bg-green-600 hover:text-white transition duration-300"
                >
                  Post Job
                </Link>
              </>
            )}
            {user.role === "applicant" && (
              <Link
                to="/appliedjobs"
                className="px-4 py-2 text-sm font-medium text-blue-400 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Applied Job
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-400 rounded-md hover:bg-red-600 hover:text-white transition duration-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
