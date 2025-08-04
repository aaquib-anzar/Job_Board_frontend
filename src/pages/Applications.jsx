import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import toast from "react-hot-toast"
function Applications() {
   const {jobId} = useParams()
   const[applications, setApplications] = useState([])
   const[loading, setLoading] = useState(true)
   const BASE_URL = import.meta.env.VITE_API_BASE_URL
    
   useEffect(() => {
    const fetchApplications = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/applyjob/job/${jobId}`,{withCredentials:true})
            setApplications(res.data.applications)
        } catch (error) {
            console.error("Error Applications", error.message)
        }finally{
            setLoading(false)
        }
    }
    fetchApplications()
   },[jobId])

   const handleStatusUpdate = async(applicationid, newStatus) => {
    try{
        const res = await axios.put(`${BASE_URL}/applyjob/updatestatus/${applicationid}`,{status:newStatus}, {withCredentials:true})
        toast.success(res.data.message)
        setApplications((prev) => prev.map((app) => app._id === applicationid ?{...app, status:newStatus}:app))
    }catch(error){
        console.error("Status update failed:", error.message);
        toast.error("Failed to update the status")
    }
   }
   
   if (loading) return <p className="text-center text-white mt-10">Loading applications...</p>;

   if (applications.length === 0)
   return <p className="text-center text-gray-400 mt-10">No applications found.</p>;

  return (
    <div className='min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-4'>
        <div className='max-w-5xl mx-auto'>
            <h1 className='text-3xl font-bold text-cyan-400 mb-8 text-center'>Job Applications</h1>
        </div>
        <div className='sapce-y-8'>
            {applications.map((app) => (
                <div key={app._id} className='bg-white/5 p-6 rounded-xl border border-gray-700 shadow'>
                    <h2 className='text-xl font-semibold text-cyan-300 mb-2'>Applicant:{app.applicant?.name || "Unknown"}</h2>
                    <p className='text-sm text-gray-400'>Email:{app.applicant?.email}</p>
                    <div className='mt-3'>
                        <p className='text-gray-200 text-sm whitespace-pre-line'>
                            <span className='font-semibold text-gray-400'>Cover Letter:</span>{" "}
                            {app.coverLetter}
                        </p>
                    </div>
                    {app.resume && (
                         <a
                         href={app.resume}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-cyan-300 hover:underline mt-3 block text-sm"
                       >
                         📄 View Resume
                       </a>
                    )}
                    <div className='mt-4'>
                        <label className='font-semibold text-sm text-gray-300 mb-1 block'>Update Status</label>
                        <select value={app.status} onChange={(e) => handleStatusUpdate(app._id,e.target.value)} className='bg-gray-800 text-white border border-gray-600 rounded px-3 py-1 mt-1 text-sm'>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>      
    </div>
  )
}

export default Applications
