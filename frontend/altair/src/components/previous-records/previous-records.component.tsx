import axios from "axios";
import img from "../../assets/measurement-min.png";
import Card from "general-components/card.component.tsx";
import LoadingSpinner from "general-components/spinner.component.tsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./previous-records.styles.scss";

const PreviousRecords = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const userId = useSelector((state: any) => state.login.id);
  const navigate = useNavigate();

  const healthRecordHandler = () => {
    setIsLoading(false);
    navigate("/health-record");
  };

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get(
        `http://localhost:8080/health/${userId}/records`
      );

      console.log(response.data);

      if ((response.statusText = "OK")) {
        setIsLoading(false);
        setRecords(response.data);
      }
    };

    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <>
        {isLoading && <LoadingSpinner />}

        {records.length === 0 && (
          <div className="center-card">
            <Card>
              <h2>No available records for your profile</h2>
              <p>Consider adding new health record first.</p>

              <button
                className="startColor start"
                onClick={healthRecordHandler}
              >
                New Record
              </button>
            </Card>
          </div>
        )}

        {!isLoading && (
          <div className="grid">
            {records.map((record) => {
              return (
                <Card>
                  <img className="card-img" src={img} alt="measurements" />
                  <h2>
                    {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="card-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        />
                      </svg>
                    }
                    Measurement Name: {record.measurementName}
                  </h2>
                  <h2>
                    {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="card-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    }
                    Value: {record.value}
                  </h2>
                  <h2>
                    {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="card-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                    Date: {record.date}
                  </h2>
                </Card>
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default PreviousRecords;
