import axios from "axios";
import img from "../../assets/measurement-min.png";
import Card from "general-components/card.component.tsx";
import LoadingSpinner from "general-components/spinner.component.tsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HealthPagination from "./health-pagination.component";
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

        {!isLoading && <HealthPagination records={records} />}
      </>
    </div>
  );
};

export default PreviousRecords;
