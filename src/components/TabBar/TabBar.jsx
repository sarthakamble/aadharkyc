// TabBar.jsx
import React from 'react';
import './TabBar.css';

const TabBar = (props) => {
  const { activeTab, onTabChange, isAadharDisabled, isKycDisabled, isSuccessDisabled } = props;

  return (
    <div className="tab-bar">
      <div
        className={`custom-tab ${activeTab === 'aadhar' ? 'active' : ''} ${isAadharDisabled ? 'disabled' : ''}`}
        onClick={() => !isAadharDisabled && onTabChange('aadhar')}
      >
        Aadhar Authentication
      </div>
      <div
        className={`custom-tab ${activeTab === 'kyc' ? 'active' : ''} ${isKycDisabled ? 'disabled' : ''}`}
        onClick={() => !isKycDisabled && onTabChange('kyc')}
      >
        KYC Details
      </div>
      <div
        className={`custom-tab ${activeTab === 'success' ? 'active' : ''} ${isSuccessDisabled ? 'disabled' : ''}`}
        onClick={() => !isSuccessDisabled && onTabChange('success')}
      >
        Account Opened Successfully
      </div>
      <div
        className={`custom-tab ${activeTab === 'pan-verification' ? 'active' : ''} ${isSuccessDisabled ? 'disabled' : ''}`}
        onClick={() => !isSuccessDisabled && onTabChange('pan-verification')}
      >
        PAN Verification
      </div>
    </div>
  );
};

export default TabBar;
