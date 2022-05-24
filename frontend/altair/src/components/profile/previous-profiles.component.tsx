import "./previous-profiles.styles.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// @ts-ignore
import Card from "../../general-components/card.component.tsx";
// @ts-ignore
import LoadingSpinner from "../../general-components/spinner.component.tsx";

let i = 0;
const PreviuosProfiles = () => {
  const userId = useSelector((state: any) => state.login.id);
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await axios.get(
        `http://localhost:8080/profile/user?userId=${userId}`
      );
      if (response.statusText === "OK") {
        setIsLoading(false);
        setProfiles(response.data);
      }
    };

    fetchProfiles();
  }, []);

  console.log(profiles);
  return (
    <div>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <div className="grid-profiles">
        {!isLoading &&
          profiles.map((profile) => {
            return (
              <div className="profile-container">
                <h3>Profile</h3>
                <h2>Weight: {profile.weight}</h2>
                <h2>Height: {profile.height}</h2>
                <h2>Personal Observation: {profile.personalObservation}</h2>
                <h2>
                  Date: {profile.date[2]}.{profile.date[1]}.{profile.date[0]}.
                </h2>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PreviuosProfiles;
