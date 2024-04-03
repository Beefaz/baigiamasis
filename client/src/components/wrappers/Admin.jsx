import useAuth from "../../hooks/useAuth.jsx";

const Admin = ({children}) => {
  const {getUser} = useAuth();
  const {role} = getUser()

  if (role !== 'admin') {
    return <></>
  }
  return <>{children}</>

};

export default Admin;
