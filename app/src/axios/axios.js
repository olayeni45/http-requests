import axios from "axios";

//const BASE_URL = "https://swapi.dev/api";
const FIREBASE_URL = "https://react-http-8b31f-default-rtdb.firebaseio.com";

export const fetchMovies = async () => {
  try {
    const response = await axios({
      url: `${FIREBASE_URL}/movies.json`,
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return error;
  }
};

export const createMovie = async ({ title, openingText, releaseDate }) => {
  try {
    await axios({
      url: `${FIREBASE_URL}/movies.json`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title,
        openingText,
        releaseDate,
      },
    });
  } catch (error) {
    return error;
  }
};
