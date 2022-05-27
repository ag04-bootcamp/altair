import axios from "axios";

export const getFiles = async (path) => {
  console.log(`http://localhost:8080/file/${path}`);
  const res = await axios.get(`http://localhost:8080/file/${path}`);
  return res;
};
