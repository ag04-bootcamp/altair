import axios from "axios";
import { useEffect, useState } from "react";
import "./upload.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfilePicture } from "redux/login";

const UploadModal = (props) => {
  let openModal = props.onOpenModal;
  let formData = new FormData();
  let [file, setFile] = useState(null);
  const userId = useSelector((state: any) => state.login.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let profilePic = useSelector((state: any) => state.login.profilePicture);

  const toggleModal = (event) => {
    event.preventDefault();
    openModal = !openModal;
    props.func(openModal);
  };

  if (openModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const onFileChange = (event) => {
    if (event.target && event.target.files[0]) {
      setFile(event.target.files[0]);
      formData.append("files", event.target.files[0]);
      console.log("files", event.target.files[0]);
    }
  };

  const uploadPictureHanlder = async (event) => {
    event.preventDefault();

    if (file !== null) {
      const deletePrevious = await axios({
        method: "delete",
        url: `http://localhost:8080/file/${userId}/profile`,
      });

      console.log(deletePrevious);

      const res = await axios({
        method: "post",
        url: `http://localhost:8080/file/${userId}/profile`,
        data: { files: file },
        headers: { "Content-Type": "multipart/form-data" },
      });

      const getNewPicture = await axios.get(
        `http://localhost:8080/file/${userId}/profile`
      );

      if (getNewPicture.statusText === "OK") {
        await dispatch(setProfilePicture(getNewPicture.data[0]));

        console.log(profilePic);
        openModal = !openModal;
        props.func(openModal);
        props.func1(getNewPicture.data[0]);
      }

      navigate("/");
    }
  };

  useEffect(() => {}, [profilePic]);

  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h3>Change Profile Picture</h3>

        <label className="upload-label" htmlFor="files">
          <input
            className="upload-input"
            accept="image/*"
            type="file"
            id="files"
            name="files"
            onChange={onFileChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="upload-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>

          {file && <p className="file-name">{file.name}</p>}
        </label>

        <button onClick={uploadPictureHanlder} className="modal-btn save">
          Upload
        </button>
        <button
          className="modal-btn close-modal margin-left"
          onClick={toggleModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
