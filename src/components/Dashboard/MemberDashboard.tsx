import React from 'react';

const MemberDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Member Dashboard</h1>
      {/* Profile, contribution stats, data visualizations, etc */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          {/* Display passport photograph, personal info, next of kin, employer info */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Contribution Statistics</h2>
          {/* Implement interactive charts using a chart library (e.g., Recharts or Chart.js) */}
        </div>
      </div>
      {/* Recent Contribution Transactions */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Recent Contributions</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the last 5 transactions */}
            <tr>
              <td className="px-6 py-4">2025-01-15</td>
              <td className="px-6 py-4">$200.00</td>
              <td className="px-6 py-4">Mandatory</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberDashboard;
