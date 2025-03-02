import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { toast } from 'react-toastify';

const SESSION_TIMEOUT = 3600000; // e.g., 1 hour in milliseconds

export const useSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const sessionStart = localStorage.getItem('sessionStart');
      if (sessionStart) {
        const elapsed = Date.now() - parseInt(sessionStart, 10);
        if (elapsed > SESSION_TIMEOUT) {
          // Session has expired – clear session and log out user
          dispatch(logout());
          localStorage.removeItem('authToken');
          localStorage.removeItem('sessionStart');
          toast.info('Your session has expired. Please log in again.');
        }
      }
    }
  }, [dispatch]);
};
