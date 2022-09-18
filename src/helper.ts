import Axios from "axios";

export const axiosInstance = Axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/",
  headers: {
    "content-type": "application/json",
  },
  timeout: 10000,
});
