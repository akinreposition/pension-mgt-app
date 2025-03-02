import ContributionManager from './ContributionManager';
import ReportGenerator from './ReportGenerator';
import NotificationCenter from '../Notification/NotificationCenter';

const MemberDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Member Dashboard</h1>
      {/* Other member dashboard components (profile, charts, etc.) */}
      <ContributionManager />
      <ReportGenerator />
      <NotificationCenter />
    </div>
  );
};

export default MemberDashboard;
