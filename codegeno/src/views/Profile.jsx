// Dashboard/Dashboard.jsx
import React from 'react';
import Sidebar from '../tests/SideBar';
import LatestPosts from '../tests/LatestPost';
import Settings from '../tests/Settings';
import '../tests/hoofd.css';


const Dashboard = ({ user }) => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <h2>Dashboard</h2>
                {/* Main content area */}
                <Activities />
                <LatestPosts user={user} /> {/* Ensure user is passed here */}
                <Settings user={user} />
            </div>
        </div>
    );
};

export default Dashboard;
