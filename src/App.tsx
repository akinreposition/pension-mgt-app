import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { useSession } from './hooks/useSession';
// import ProfileScreen from './components/profile/ProfileScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useSession();

  return (
    <div className="min-h-screen bg-gray-100">
      <AppRoutes />
      {/* <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <ProfileScreen />
      </div> */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
