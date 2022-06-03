import "./previous-profiles.styles.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import image from "assets/profile.jpg";

import LoadingSpinner from "general-components/spinner.component.tsx";

import Pagination from "general-components/pagination.component.tsx";

const PreviuosProfiles = () => {
  const userId = useSelector((state: any) => state.login.id);
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  axios({
    method: "post",
    url: `http://localhost:8080/file/${userId}/profile`,
    data: { files: image },
    headers: { "Content-Type": "multipart/form-data" },
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
