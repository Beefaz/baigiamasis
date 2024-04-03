import { useContext } from 'react';
import { AuthContext } from '../components/wrappers/AuthProvider.jsx';

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
