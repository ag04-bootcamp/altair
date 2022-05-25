import "./previous-profiles.styles.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// @ts-ignore
import Card from "../../general-components/card.component.tsx";
// @ts-ignore
import LoadingSpinner from "../../general-components/spinner.component.tsx";
// @ts-ignore
import Pagination from "../../general-components/pagination.component.tsx";

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
    <div className="background">
      <div>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && <Pagination profiles={profiles} />}
      </div>
    </div>
  );
};

export default PreviuosProfiles;
