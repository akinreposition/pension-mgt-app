import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'member'>('member');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const token = 'dummy-auth-token';

      localStorage.setItem('authToken', token);
      localStorage.setItem('sessionStart', Date.now().toString());

      dispatch(login({ email, password, role }));

      toast.success('Login successful!');
      navigate(role === 'admin' ? '/dashboard/admin' : '/dashboard/member');
    } catch (error) {
      toast.error('Invalid email or password.');
      setIsSubmitting(false);
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

        {/* Role Selection */}
        <div className="mb-4 text-center text-sm text-gray-600">
          <p>
            Login as 
            <span 
              className={`mx-4 cursor-pointer ${role === 'admin' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`} 
              onClick={() => setRole('admin')}
            >
              Admin
            </span> 
            or 
            <span 
              className={`ml-4 cursor-pointer ${role === 'member' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`} 
              onClick={() => setRole('member')}
            >
              Member
            </span>
          </p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center mt-4">
          <Link to="/password-recovery" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
