import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn, setName } from "redux/login.ts";
import "./login-form.styles.scss";


const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // const data = {
    //   userName,
    //   password,
    // };
  };

  const loginHandler = async (event) => {
    try {
      const response = await axios.get("http://localhost:8080/users");

      const correctUser = response.data.filter(
        (user) => user.userName === userName
      );

      if (correctUser[0].length === 0) return;
      if (correctUser[0].password !== password) {
        alert("Wrong password! Please try again.");
        return;
      }

      if (correctUser[0].password === password) {
        dispatch(logIn(correctUser[0].id));
        dispatch(setName(userName));

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = (event) => {
    navigate("/");
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>
      <label htmlFor="userName">Username</label>
      <input type="text" required onChange={userNameHandler} id="firstName" />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        onChange={passwordHandler}
        required
        id="password"
      />

      <div>
        <span className="sign-up-link"> Don't have an account yet? </span>
        <Link className="sign-up-link underline" to="/sign-up">
          Sign Up
        </Link>
        <span className="sign-up-link"> now</span>
      </div>

      <div>
        <button onClick={loginHandler} className="loginBtn">
          Login
        </button>
        <button onClick={cancelHandler} className="signUpBtn ">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
