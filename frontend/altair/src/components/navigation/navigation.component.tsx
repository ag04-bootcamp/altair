import { default as Logo } from "assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logOut } from "redux/login.ts";
import "animate.css";
import image from "assets/profile.jpg";
import "./navigation.styles.scss";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log("Location changed");
    setMenuOpen(false);
  }, [location]);

  const openOnClick = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  ////////////////////////////////////////////////////////////////
  // CSS TRANSITION

  const [menuClasses, setMenuClasses] = useState("d-none");

  /////////////////////////////////////////////////////////////7

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);

  const navigate = useNavigate();

  const logoHandler = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    setMenuOpen(false);
    dispatch(logOut());

    navigate("/");
    console.log(isLoggedIn);
  };

  return (
    <nav className="navigation">
      <div className="logo">
        <span className="headingLogo">
          <img
            onClick={logoHandler}
            src={Logo}
            className="logo-img"
            alt="logo"
          />
        </span>
      </div>
      <div className="nav-container">
        {isLoggedIn && <Link to="/">Home</Link>}

        {<Link to="/files">Files</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}

        {isLoggedIn && (
          <>
            <div onClick={openOnClick} className="img-container">
              <img
                src={image}
                alt="profile picture"
                className="nav-profile-pic"
              />
            </div>

            <CSSTransition
              in={menuOpen}
              timeout={800}
              classNames={{
                enterActive: "animate__fadeInUp",
                exitActive: "animate__fadeOutDown",
              }}
              unmountOnExit
              className={`animate__animated menu  my-4 ${menuClasses}`}
            >
              <div className="menu">
                {isLoggedIn && (
                  <Link
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    to="/profile"
                  >
                    Profile
                  </Link>
                )}
                {isLoggedIn && (
                  <Link onClick={logoutHandler} to="/">
                    Logout
                  </Link>
                )}
              </div>
            </CSSTransition>
          </>
        )}

        {/* <Link className="last" to="/contact">
          Contact
        </Link> */}
      </div>
    </nav>
  );
};

export default Navigation;
