import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { add } from "redux/measurements.ts";
import "./health-record.styles.scss";

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

  const userId = useSelector((state: any) => state.login.id);

  useEffect(() => {
    {
      const fetchData = async () => {
        const response = await axios.get(
          "http://localhost:8080/measurement/all"
        );

        console.log(response.data);

        if (response.statusText === "OK") {
          dispatch(add(response.data));
        }
      };
      console.log(options1);

      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectoptions = options1.map((option) => {
    return { value: option.name, label: option.name };
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

    if (userId !== null && measurement !== null && value !== null) {
      const data = {
        profileId: userId,
        measurementName: measurement,
        value,
        date: birthDate,
      };

      axios
        .post("http://localhost:8080/health/record", data)
        .then((response) => {
          if (response.statusText === "OK") {
            navigate("/");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
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
            step="0.01"
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
