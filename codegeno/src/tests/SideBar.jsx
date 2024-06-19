// Sidebar/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../tests/hoofd.css';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li><Link to="/dashboard">Activities</Link></li>
        <li><Link to="/dashboard/latestpost">Latest Posts</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
