import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.styles.scss";
import DatePicker from "react-date-picker";
import UploadModal from "components/upload-modal/upload.component";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setFullName, setProfilePicture } from "redux/login";
import image from "../../assets/profile.jpg";

const Profile = () => {
  const [observation, setObservation] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.login.id);
  const fullName = useSelector((state: any) => state.login.fullName);

  let profilePic = useSelector((state: any) => state.login.profilePicture);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileResponse = await axios.get(
        `http://localhost:8080/profile/user?userId=${userId}`
      );
      if (profileResponse.statusText === "OK") {
        setProfiles(profileResponse.data);
      }

      const userResponse = await axios.get(
        `http://localhost:8080/users/${userId}`
      );
      if (userResponse.statusText === "OK") {
        const data = userResponse.data;
        const fullName = `${data.firstName} ${data.lastName}`;
        dispatch(setFullName(fullName));
      }
    };

    fetchProfiles();
  }, []);

  let correctProfile;
  if (fullName !== null) {
  }

  const profilePicHandler = (event) => {
    event.preventDefault();
    setOpenModal(!openModal);
  };

  const getDataFromModal = (dataFromModal) => {
    setOpenModal(dataFromModal);
  };

  const getNewPicture = (newPicture) => {
    if (newPicture !== null) {
      dispatch(setProfilePicture(newPicture));
      setOpenModal(false);
    }
  };

  const heightHandler = (event) => {
    setHeight(event.target.value);
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
    } else {
      alert("Please make sure you entered valid data in each field!");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {openModal && (
        <UploadModal
          func1={getNewPicture}
          func={getDataFromModal}
          onOpenModal={openModal}
        />
      )}

      <h2>Profile</h2>

      {fullName && (
        <div className="profile-data">
          <div className="picture-name">
            <img
              src={profilePic}
              className="profile-pic"
              alt="default profile picture"
            />
            <h4 className="fullname">{fullName}</h4>
          </div>

          <button onClick={profilePicHandler} className="picture-btn">
            Change Photo
          </button>
        </div>
      )}

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

      <label htmlFor="observation">Personal Observation</label>
      <textarea
        id="observation"
        name="observation"
        onChange={observationHandler}
        className="observation-input"
        rows={2}
        maxLength={30}
      ></textarea>

      <label htmlFor="date">Date</label>
      <DatePicker className="date" value={date} onChange={onChangeDate} />
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
