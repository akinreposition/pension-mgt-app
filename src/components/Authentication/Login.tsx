import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'member' | 'admin' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) {
      alert('Please select a user type');
      return;
    }
    // Add client-side validation and error handling as needed
    dispatch(login({ email, password, role: userType }));
    if (userType === 'member') {
      // navigate('/member-dashboard');
      navigate('/dashboard');
    } else if (userType === 'admin') {
      // navigate('/admin-dashboard');
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6 flex-row">
          <span className="text-sm text-gray-700">User Type</span>
          <div className="flex justify-around mt-2">
            <button type='button' onClick={() => setUserType('member')} className={`px-4 py-2 rounded ${userType === 'member' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              Member
            </button>
            <button type="button" onClick={() => setUserType('admin')} className={`px-4 py-2 rounded ${userType === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              Admin
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
