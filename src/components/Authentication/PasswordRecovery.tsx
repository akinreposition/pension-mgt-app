import React, { useState } from 'react';
// import axios from 'axios';
import { toast } from 'react-toastify';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual password recovery API endpoint
      // await axios.post('/api/auth/recover-password', { email });
      
      toast.success('Recovery email sent. Please check your inbox.');
      setTimeout(() => {
        // Replace with your actual routing logic
        window.location.href = '/login';
      }, 20000);
    } catch (error) {
      toast.error('Error sending recovery email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleRecovery} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Password Recovery</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Enter your email address</label>
          <input
            type="email"
            id="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-300 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? 'Sending...' : 'Send Recovery Email'}
        </button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
