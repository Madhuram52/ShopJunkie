// DashNavItem.jsx
import React from 'react';

const DashNavItem = ({ label, onClick }) => {
  return (
    <div className="dashboard-nav-item" onClick={onClick}>
      {label}
    </div>
  );
};

export default DashNavItem;
