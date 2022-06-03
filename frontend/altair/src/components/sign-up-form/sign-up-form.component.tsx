import axios from "axios";
import { useState } from "react";
import DatePicker from "react-date-picker";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "redux/login.ts";
import "./sign-up-form.styles.scss";

import image from "assets/profile.jpg";
import { setProfilePicture } from "redux/login";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onChangeDate = (event) => {
    setBirthDate(event);
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    // setConfirmPassword(event.target.value);
  };

  const cancelHandler = () => {
    navigate("/");
  };

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      userName,
      password,
      birthDate,
    };

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      userName.length === 0 ||
      password.length === 0
    ) {
      alert("Please enter valid data!");
      return;
    } else {
      const users = async () => {
        const postUser = await axios.post("http://localhost:8080/users", data);

        if (postUser.statusText === "OK") {
          const response = await axios.get("http://localhost:8080/users");

          response.data.forEach((user) => {
            if (user.userName === userName) {
              dispatch(setProfilePicture(image));

              dispatch(logIn(user.id));
              navigate("/");
            }
          });
        }
      };

      users();

      // dispatch(signUp);
      // navigate("/");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Sign Up</h2>
      <div className="names">
        <div className="flex">
          <label htmlFor="firstName">First Name</label>
          <input
            required
            onChange={firstNameHandler}
            id="firstName"
            type="text"
          />
        </div>

        <div className="flex">
          <label htmlFor="lastName">Last Name</label>
          <input
            onChange={lastNameHandler}
            required
            id="lastName"
            type="text"
          />
        </div>
      </div>

      <div className="names">
        <div className="flex">
          <label htmlFor="email">Email</label>
          <input onChange={emailHandler} required id="email" type="email" />
        </div>

        <div className="flex">
          <label htmlFor="userName">User Name</label>
          <input
            onChange={userNameHandler}
            required
            id="userName"
            type="text"
          />
        </div>
      </div>

      <div className="names">
        <div className="flex">
          <label htmlFor="password">Password</label>
          <input
            onChange={passwordHandler}
            required
            id="password"
            type="password"
          />
        </div>
        <div className="flex">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={confirmPasswordHandler}
            required
            id="confirmPassword"
            type="password"
          />
        </div>
      </div>

      <div className="flex">
        <label htmlFor="birthDate">Birth Date</label>
        <DatePicker
          className="date"
          value={birthDate}
          onChange={onChangeDate}
        />
      </div>
      <button onClick={signUpHandler} className="start signBtn">
        Sign Up
      </button>
      <button onClick={cancelHandler} className="cancel">
        Cancel
      </button>
    </form>
  );
};

export default SignUpForm;
