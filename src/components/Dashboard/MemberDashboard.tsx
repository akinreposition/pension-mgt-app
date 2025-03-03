import React from 'react';
import Navbar from '../navigation/Navbar';
import ContributionManager from '../dashboard/ContributionManager';
import ReportGenerator from './ReportGenerator';

const MemberDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Reusable Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">Member Dashboard</h1>
        <ContributionManager />
        <ReportGenerator />
        {/* NotificationCenter removed here since it's now in the Navbar dropdown */}
      </div>
    </div>
  );
};

export default MemberDashboard;
