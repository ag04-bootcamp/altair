import "./update-profile.styles.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-date-picker";

let i = 0;

const UpdateProfile = (props) => {
  const userId = useSelector((state: any) => state.login.id);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    email: "",
    password: "",
    userName: "",
    id: userId,
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  useEffect(() => {
    if (i < 2) {
      i++;
      const getUser = async () => {
        const res = await axios.get(`http://localhost:8080/users/${userId}`);
        if (res.statusText === "OK") {
          setUserData(res.data);
        }
      };

      getUser();
    }
  }, [userData.firstName]);

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
    navigate("/profile");
  };

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    const updatedData = {
      firstName,
      lastName,
      userName,
      email,
      birthDate,
      password: userData.password,
      id: userId,
    };

    console.log(updatedData.firstName);
    console.log(updatedData.lastName);
    console.log(updatedData.userName);
    console.log(updatedData.email);
    console.log(updatedData.birthDate);
    console.log(updatedData.password);
    console.log(updatedData.id);

    if (
      updatedData.firstName === "" ||
      updatedData.lastName === "" ||
      updatedData.userName === "" ||
      updatedData.email === "" ||
      updatedData.password === ""
    ) {
      alert("Please enter valid data!");
      console.log(updatedData);
    } else {
      const res = await axios.post("http://localhost:8080/users", updatedData);
      navigate("/profile");
    }
  };

  return (
    <div>
      <form>
        <h2>Update Profile </h2>
        <div className="names">
          <div className="flex">
            <label htmlFor="firstName">First Name</label>
            <input
              placeholder={userData.firstName}
              required
              onChange={firstNameHandler}
              id="firstName"
              type="text"
            />
          </div>

          <div className="flex">
            <label htmlFor="lastName">Last Name</label>
            <input
              placeholder={userData.lastName}
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
            <input
              placeholder={userData.email}
              onChange={emailHandler}
              required
              id="email"
              type="email"
            />
          </div>

          <div className="flex">
            <label htmlFor="userName">User Name</label>
            <input
              onChange={userNameHandler}
              required
              id="userName"
              type="text"
              placeholder={userData.userName}
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
          Update
        </button>
        <button onClick={cancelHandler} className="cancel">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
