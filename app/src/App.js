import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";

//const BASE_URL = "https://swapi.dev/api";
const FIREBASE_URL = "https://react-http-8b31f-default-rtdb.firebaseio.com";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${FIREBASE_URL}/movies.json`);

      if (response.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  const addMovieHandler = useCallback(async (movie) => {
    await fetch(`${FIREBASE_URL}/movies.json`, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <Fragment>
      <section>
        <AddMovie
          onAddMovie={addMovieHandler}
          onRefreshMovies={fetchMoviesHandler}
        />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}> Fetch Movies </button>
      </section>
      <section>{content}</section>
    </Fragment>
  );
};

export default App;
