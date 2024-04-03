// DashNavBar.jsx
import React from 'react';
import DashNavItem from './OwnerNavbarComponents/DashNavItem';
import { Link, useParams } from 'react-router-dom';

const DashNavBar = ({ onSelectNavItem }) => {
  const { sid } = useParams();
  return (
    <>
      <div className="dashboard-nav">
        <DashNavItem label="Add Items" onClick={() => onSelectNavItem('additem')} />
        <DashNavItem label="Update Items" onClick={() => onSelectNavItem('updateitem')} />
        <DashNavItem label="Track Products" onClick={() => onSelectNavItem('trackprod')} />
        <DashNavItem label="Billing Products" onClick={() => onSelectNavItem('billingprod')} />
      </div>
      <div>
        {/* Call handleSwitchMode onClick */}
        <Link to={`/${sid}/customer`}>
          <button>Switch to Customer Mode</button>
        </Link>
      </div>
    </>
  );
};

export default DashNavBar;
