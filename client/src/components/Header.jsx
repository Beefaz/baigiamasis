import logo from "../assets/images/png/lrs-logo.png";
import logoutSvg from "../assets/images/svg/logout.svg";
import '../styles/header.scss';
import useAuth from "../hooks/useAuth.jsx";


const Header = () => {
  const {getUser, logout} = useAuth();
  const {username} = getUser();
  return <header className="header">
    <div className="header-content">
      <img className="logo" src={logo} alt="seimas-logo"/>
      <div className="header-content__right">
        {username && <div className="user">{username}</div>}
        <button onClick={logout}>
          <img src={logoutSvg} alt="logout"/>
        </button>
      </div>
    </div>
  </header>
}

export default Header;
