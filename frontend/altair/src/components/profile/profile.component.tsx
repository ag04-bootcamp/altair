import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.styles.scss";
import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const [observation, setObservation] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const navigate = useNavigate();

  const userId = useSelector((state: any) => state.login.id);

  const heightHandler = (event) => {
    setHeight(event.target.value);
    console.log(height);
  };

  const weightHandler = (event) => {
    setWeight(event.target.value);
  };

  const cancelHandler = () => {
    navigate("/");
  };

  const observationHandler = (event) => {
    setObservation(event.target.value);
  };

  const previousProfilesHandler = (event) => {
    event.preventDefault();
    navigate("/previous-profiles");
  };

  const onChangeDate = (event) => {
    setDate(event);
    const now = new Date(event);
    const dateString = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;
    setFormatedDate(dateString);
    console.log(formatedDate);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (height !== "" && weight !== null && observation.length > 0) {
      const profile = {
        userId,
        weight,
        height,
        personalObservation: observation,
        date: date,
      };

      axios.post("http://localhost:8080/profile", profile);

      console.log(profile);
    } else {
      alert("Please make sure you entered valid data in each field!");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Profile</h2>

      <div className="profile-flex">
        <div>
          <label htmlFor="height">Height (cm)</label>
          <input required onChange={heightHandler} id="height" type="number" />
        </div>

        <div>
          <label htmlFor="weight">Weight (kg)</label>
          <input onChange={weightHandler} required id="weight" type="number" />
        </div>
      </div>
      <label htmlFor="date">Date</label>
      <DatePicker className="date" value={date} onChange={onChangeDate} />

      <label htmlFor="observation">Personal Observation</label>
      <textarea
        id="observation"
        name="observation"
        onChange={observationHandler}
        className="observation-input"
        rows={5}
      ></textarea>
      <button onClick={previousProfilesHandler} className="previous-profiles">
        Previous Profiles
      </button>

      <button className="start">Create Profile</button>
      <button onClick={cancelHandler} className="cancel1">
        Cancel
      </button>
    </form>
  );
};

export default Profile;
