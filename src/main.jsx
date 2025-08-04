import React, { StrictMode, useState, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import PostJob from "./pages/PostJob.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import AllJobs from "./pages/AllJobs.jsx";
import ApplyJobForm from "./pages/ApplyForm.jsx";
import AppliedJobs from "./pages/AppliedJobs.jsx";
import AllPostedJobs from "./pages/AllPostedJobs.jsx";
import Applications from "./pages/Applications.jsx";
import UpdateJob from "./pages/UpdateJob.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx";
import { AuthContext } from "./utils/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function MainApp() {
  const { user, setUser } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App user={user} setUser={setUser} />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signin",
          element: <Signin setUser={setUser} />,
        },
        {
          path: "signup",
          element: <Register setUser={setUser} />,
        },
        {
          path: "post-job",
          element: <PostJob user={user} />,
        },
        {
          path: "job/:id",
          element: <JobDetails user={user} />,
        },
        {
          path: "getalljobs",
          element: <AllJobs user={user} />,
        },

        {
          path: "applyjob/:jobId",
          element: <ApplyJobForm />,
        },

        {
          path: "appliedjobs",
          element: <AppliedJobs />,
        },

        {
          path: "postedjobs",
          element: <AllPostedJobs user={user} />,
        },

        {
          path: "updatejob/:jobId",
          element: <UpdateJob />,
        },

        {
          path: "applications/:jobId",
          element: <Applications />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = {clientId}>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
