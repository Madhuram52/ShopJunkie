// DashNavBar.jsx
import React from 'react';
import DashNavItem from './OwnerNavbarComponents/DashNavItem';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/auth-context';

const DashNavBar = ({ onSelectNavItem }) => {

  const auth = useContext(AuthContext);
  const shopId = auth.shopId;

  return (
    <div className="dashboard-nav">
      <div className="dash-item-container">
        <DashNavItem label="Add Items" onClick={() => onSelectNavItem('additem')} />
        <DashNavItem label="Update Items" onClick={() => onSelectNavItem('updateitem')} />
        <DashNavItem label="Track Products" onClick={() => onSelectNavItem('trackprod')} />
        <DashNavItem label="Billing Products" onClick={() => onSelectNavItem('billingprod')} />
      </div>
      <div className='dash-cust-button-container'> 
        {/* Call handleSwitchMode onClick */}
        <Link to={`/${shopId}/customer`}>
          <button>Switch to Customer Mode</button>
        </Link>
      </div>
    </div>
  );
};

export default DashNavBar;
