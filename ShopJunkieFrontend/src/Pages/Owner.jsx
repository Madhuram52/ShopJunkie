// OwnerComponent.jsx
import React, { useState } from 'react';
import DashNavBar from '../Components/OwnerComponents/DashNavBar';
import AddItem from '../Components/OwnerComponents/AddItem';
import UpdateItem from '../Components/OwnerComponents/UpdateItem';
import TrackProducts from '../Components/OwnerComponents/TrackProducts';
import Billing from '../Components/OwnerComponents/Billing';

function Owner(){
  const [selectedNavItem, setSelectedNavItem] = useState('');

  const renderComponent = () => {
    switch (selectedNavItem) {
      case 'additem':
        return <AddItem />;
      case 'updateitem':
        return <UpdateItem />;
      case 'trackprod':
        return <TrackProducts />;
      case 'billingprod':
        return <Billing />;
      default:
        return null;
    }
  };

  return (
    <div className="owner-dashboard">
      <DashNavBar onSelectNavItem={setSelectedNavItem} />
      <div className="dashboard-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Owner;
