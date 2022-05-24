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

  let profiles = [];

  i++;
  const fetchProfiles = async () => {
    const response = await axios.get(
      `http://localhost:8080/profile/user?userId=${userId}`
    );
    if (response.data.length > 0) {
      setIsLoading(false);
      response.data.map((user) => {
        return profiles.push(user);
      });
    }
  };

  fetchProfiles();

  return (
    <div>
      <>
        {isLoading && <LoadingSpinner />}

        {!isLoading &&
          profiles.map((profile) => {
            return;
          })}
      </>
    </div>
  );
};

export default PreviuosProfiles;
