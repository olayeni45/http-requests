import axios from "axios";

const BASE_URL = "https://swapi.dev/api";
//const FIREBASE_URL = "https://react-http-8b31f-default-rtdb.firebaseio.com";

export const fetchMovies = async () => {
  try {
    const response = await axios({
      url: `${BASE_URL}/films`,
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    return { data: response.data.results, status: response.status };
  } catch (error) {
    return error
  }
};
