
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate=useNavigate();
    const medireport=()=>{
        navigate(`/allreports`)
    }
  return (
   <>
   <h1>Welcome to Admin Dashboard</h1>
      <div className="user-dashboard">
      
        <div className="dashboard-section">
         <button>Appointments</button>
        </div>
        <div className="dashboard-section">
        <button>Patients</button>
        </div>
        <div className="dashboard-section">
        <button>Messages</button>
        </div>
        <div className="dashboard-section">
        <button>Billing and Payments</button>
        </div>
        <div className="dashboard-section">
        <button onClick={medireport}>Medical Reports</button>
        </div>
        <div className="dashboard-section">
        <button>Settings and Profile</button>
        </div>
      </div>


    
   </>
  );
};

export default AdminDashboard;