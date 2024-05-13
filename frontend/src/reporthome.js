import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import './UserDashboard.css';
function Reporthome(props){
    const navigate=useNavigate();
    const medirep=()=>{
        navigate(`/viewreport/${props.id}`)
    }
    return(
        <>
        <h1>Welcome to Your Dashboard</h1>
      <div className="user-dashboard">
        

        {/* Appointments Overview Component */}
        <div className="dashboard-section">
         <button>Appointments Overview</button>
          {/* Include the Appointments Overview Component */}
        </div>

        {/* Patients List Component */}
        <div className="dashboard-section">
        <button>Patients List</button>
          {/* Include the Patients List Component */}
        </div>

        {/* Messages Inbox Component */}
        <div className="dashboard-section">
        <button>Messages Inbox</button>
          {/* Include the Messages Inbox Component */}
        </div>

        {/* Billing and Payments Component */}
        <div className="dashboard-section">
        <button>Billing and Payments</button>
          {/* Include the Billing and Payments Component */}
        </div>

        {/* Medical Records Component */}
        <div className="dashboard-section">
        <button>Medical Records</button>
          {/* Include the Medical Records Component */}
        </div>

        {/* Settings and Profile Component */}
        <div className="dashboard-section">
        <button>Settings and Profile</button>
          {/* Include the Settings and Profile Component */}
        </div>

        {/* Reports and Analytics Component */}
        <div className="dashboard-section">
        <button onClick={medirep}>Medical Report</button>
          {/* Include the Reports and Analytics Component */}
        </div>
      </div>

        </>
    )
};

export default Reporthome;