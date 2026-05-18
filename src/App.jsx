import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './pages/Footer';
import {Toaster} from "react-hot-toast"
import Navbar from "../src/pages/Navbar"

function App({ user, setUser }) {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar user={user} setUser={setUser} />
      <Toaster position="top-right" toastOptions={{duration:3000}}/>
      <div className="px-4 sm:px-8 lg:px-16 py-6">
        <Outlet />
      </div>
      <Footer user={user}/>
    </div>
  );
}

export default App;
