import {Navigate} from "react-router-dom"
import useAuth from "../../hooks/useAuth.jsx";

const AdminRoute = ({children}) => {
  const {getUser} = useAuth();
  const user = getUser();
  if (user?.role !== 'admin') {
    return <Navigate to="/"/>
  }
  return children

};

export default AdminRoute;
