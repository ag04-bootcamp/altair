import img from "assets/cover.jpg";
import axios from "axios";
import LoadingSpinner from "general-components/spinner.component.tsx";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./home.styles.scss";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);

  const [loaded, setLoaded] = useState(false);

  let profilePic = useSelector((state: any) => state.login.profilePicture);

  const loginHandler = () => {
    navigate("/login");
  };

  const signUpHandler = () => {
    navigate("/sign-up");
  };

  const onLoadHandler = () => {
    // return (loaded = true);
    setLoaded(true);
  };

  const healthRecordHandler = () => {
    navigate("/health-record");
  };

  const allRecordsHandler = () => {
    navigate("/all-records");
  };

  return (
    <div className="hero">
      <div className="heading-container">
        <h1 className="heading">
          Welcome to <span>altair</span>
        </h1>
        <h2>
          With our help, you can easily track your <span>health status</span>
        </h2>

        {!isLoggedIn && (
          <p className="description">
            You can easily create your own profile, fill in the required
            parameters and get feedback about your current health status. Create
            new health records and have access to all previous ones, so that you
            can have insight of all previous measurements.
          </p>
        )}

        {isLoggedIn && (
          <p className="description">
            Now that you're one of us, we can get started. Create your health
            records, update your profile and much more. Stay healthy :)
          </p>
        )}

        {!isLoggedIn && (
          <button onClick={loginHandler} className="startColor start">
            Login
          </button>
        )}

        {!isLoggedIn && (
          <button
            onClick={signUpHandler}
            className="health-color margin-left start"
          >
            Sign Up
          </button>
        )}

        {isLoggedIn && (
          <button onClick={healthRecordHandler} className="startColor start">
            New Record
          </button>
        )}

        {isLoggedIn && (
          <button
            onClick={allRecordsHandler}
            className="health-color margin-left start"
          >
            Previous Records
          </button>
        )}
      </div>

      {!loaded && <LoadingSpinner />}
      <img
        onLoad={onLoadHandler}
        className="cover-img"
        src={img}
        alt="Healthy food and vegetables"
      />
    </div>
  );
};

export default Home;
