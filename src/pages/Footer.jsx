import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Job-board</h3>
          <p className="text-sm">
            Job-board helps developers find their dream job by connecting them with top companies. Browse remote, hybrid, and in-office roles in software development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-cyan-300 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/getalljobs" className="hover:text-white transition">Jobs</Link></li>
            <li><Link to="/post-job" className="hover:text-white transition">Post a Job</Link></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold text-cyan-300 mb-4">Contact</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-cyan-400" /> support@job-board.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-cyan-400" /> India
            </li>
          </ul>
          <div className="flex mt-4 space-x-4 text-xl text-cyan-400">
            <a href="#" className="hover:text-white"><FaGithub /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Job-board. All rights reserved.
      </div>
    </footer>
  );
}
