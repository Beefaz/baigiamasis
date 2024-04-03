import {Navigate} from "react-router-dom"
import useAuth from "../../hooks/useAuth.jsx";

const UserRoute = ({children}) => {
  const {getUser} = useAuth();

  if (!getUser()) {
    return <Navigate to="/"/>
  }
  return children

};

export default UserRoute;
