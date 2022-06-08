import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "redux/measurements.ts";
import "./measurement.styles.scss";

const Measurement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const measurementInputRef = useRef(null);

  let options = useSelector((state: any) => state.measurement.options);
  console.log(options);

  const addHandler = async (event) => {
    event.preventDefault();
    dispatch(add(measurementInputRef?.current.value));
    navigate("/health-record");

    const addMeasurement = {
      name: measurementInputRef?.current.value,
    };

    await axios.post("http://localhost:8080/measurement", addMeasurement);
  };

  const cancelHandler = () => {
    navigate("/health-record");
  };

  return (
    <form onSubmit={addHandler}>
      <h2>Add Measurement</h2>
      <div className="names">
        <div className="flex">
          <label htmlFor="bloodPressure">Measurement Name</label>
          <input ref={measurementInputRef} type="text" />
        </div>
      </div>
      <div>
        <button onClick={addHandler} className="startColor start">
          Add
        </button>
        <button
          onClick={cancelHandler}
          className="health-color margin-left cancel"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Measurement;
