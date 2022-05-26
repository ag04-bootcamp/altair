import { default as Logo } from "assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "redux/login.ts";
import "./navigation.styles.scss";



const Navigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);

  const navigate = useNavigate();

  const logoHandler = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/");
    console.log(isLoggedIn);
  };

  return (
    <nav className="navigation">
      <div className="logo">
        <span className="headingLogo">
          <img onClick={logoHandler} src={Logo} className="logo-img" alt="logo" />
        </span>
      </div>
      <div className="nav-container">
        {isLoggedIn && <Link to="/">Home</Link>}
        {isLoggedIn && <Link to="/profile">Profile</Link>}
        {<Link to="/files">Files</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && (
          <Link onClick={logoutHandler} to="/">
            Logout
          </Link>
        )}
        <Link className="last" to="/contact">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
