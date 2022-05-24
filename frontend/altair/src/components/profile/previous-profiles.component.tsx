import "./previous-profiles.styles.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

let i = 0;
const PreviuosProfiles = () => {
  const userId = useSelector((state: any) => state.login.id);

  let profiles = [];

  i++;
  const fetchProfiles = async () => {
    const response = await axios.get(
      `http://localhost:8080/profile/user?userId=${userId}`
    );
    if (response.data.length > 0) {
      response.data.map((user) => {
        return profiles.push(user);
      });
    }
  };

  fetchProfiles();

  console.log(profiles);

  return <div>{}</div>;
};

export default PreviuosProfiles;
