import { default as Logo } from "assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logOut, setProfilePicture } from "redux/login.ts";
import "animate.css";
import image from "assets/profile.jpg";
import "./navigation.styles.scss";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadedPic, setUploadedPic] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);

  const navigate = useNavigate();

  const userId = useSelector((state: any) => state.login.id);
  let profilePic = useSelector((state: any) => state.login.profilePicture);

  useEffect(() => {
    if (isLoggedIn) {
      const getProfilePic = async () => {
        let res = await axios.get(
          `http://localhost:8080/file/${userId}/profile`
        );
        console.log(res.data);

        if (res.statusText === "OK") {
          setUploadedPic(res.data[0]);
          return dispatch(setProfilePicture(uploadedPic));
        }
        if (res.statusText !== "OK") {
          return dispatch(setProfilePicture(image));
        }
      };

      getProfilePic();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const openOnClick = () => {
    setMenuOpen(!menuOpen);
  };

  ////////////////////////////////////////////////////////////////
  // CSS TRANSITION

  const [menuClasses, setMenuClasses] = useState("d-none");

  /////////////////////////////////////////////////////////////7

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
                src={
                  profilePic
                    ? `http://localhost:8080/file/${userId}/profile/${profilePic.name}`
                    : image
                }
                alt="profile picture"
                className="nav-profile-pic"
              />
            </div>

            <CSSTransition
              in={menuOpen}
              timeout={800}
              classNames={{
                enterActive: "animate__fadeInRight",
                exitActive: "animate__fadeOutRight",
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

                {isLoggedIn && <Link to="/health-record">Health Record</Link>}

                {isLoggedIn && (
                  <Link onClick={logoutHandler} to="/">
                    Logout
                  </Link>
                )}
              </div>
            </CSSTransition>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
