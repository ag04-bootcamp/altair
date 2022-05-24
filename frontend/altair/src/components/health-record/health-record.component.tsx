import "./health-record.styles.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import Select from "react-select";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { add, remove } from "../../redux/measurements.ts";

let i = 0;

const HealthRecord = () => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const [value, setValue] = useState(0);
  const [measurement, setMeasurement] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let options1 = useSelector((state: any) => state.measurement.options);
  console.log(options1);

  useEffect(() => {
    if (i === 0) {
      i++;
      const fetchData = async () => {
        const response = await axios.get(
          "http://localhost:8080/measurement/all"
        );

        response.data?.map((measurement) => {
          dispatch(add(measurement.name));
        });
      };

      console.log(options1);

      fetchData();
    }
  }, []);

  const selectoptions = options1.map((option) => {
    return { value: option, label: option };
  });

  const onChangeDate = (event) => {
    setBirthDate(event);
    const now = new Date(event);
    const dateString = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;
    setFormatedDate(dateString);
    console.log(formatedDate);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      profileId: 1,
      measurementName: measurement,
      value,
      date: birthDate,
    };

    console.log(data);
  };

  const valueHandler = (event) => {
    setValue(event.target.value);
  };

  const addMeasurementHandler = () => {
    navigate("/measurement");
  };

  const cancelHandler = () => {
    navigate("/");
  };

  const changeSelectHandler = (event) => {
    console.log(event.value);
    setMeasurement(event.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Health Record</h2>
      <div className="names">
        <div className="flex">
          <label>Measurement Name</label>
          <Select
            onChange={changeSelectHandler}
            className="measurement-select"
            options={selectoptions}
          />
        </div>
      </div>
      <p className="measurement-text">
        Don't see wanted measurement?
        <br /> Feel free to
        <span onClick={addMeasurementHandler} className="add-measurenent">
          Add one
        </span>
      </p>

      <div>
        <div className="flex flex1">
          <label htmlFor="measurement">Measurement Value</label>
          <input
            onChange={valueHandler}
            required
            id="measurement"
            type="number"
          />
        </div>

        <div className="flex">
          <label htmlFor="birthDate">Date</label>
          <DatePicker
            className="date"
            value={birthDate}
            onChange={onChangeDate}
          />
        </div>
      </div>

      <button className="start signBtn">Submit record</button>
      <button onClick={cancelHandler} className="cancel">
        Cancel
      </button>
    </form>
  );
};

export default HealthRecord;
