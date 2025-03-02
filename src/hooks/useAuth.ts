import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};

export default useAuth;
