import axios from "axios";
let response;
let options1: any[] = [];

let i = 0;
export const fetchData = async () => {
  if (i === 0) {
    i++;
    response = await axios.get("http://localhost:8080/measurement/all");

    response.data.map((measurement) => {
      const mes = { value: measurement.name, label: measurement.name };
      options1 = [...options1];
      options1.push(mes);
    });

    console.log(options1);

    return await options1;
  }
};
