import {createContext, useEffect, useState} from 'react';
import _axios from "../../helpers/_axios.js";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);

  useEffect(() => {
    if(token) {
      sessionStorage.setItem('token', token);
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
    navigate('/projects');
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
    _axios.logout();
    navigate('/');
  };

  const getUser = () => {
    if(token){
      return JSON.parse(atob(token.split('.')[1]));
    }
  }

  return (
    <AuthContext.Provider value={{getUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
