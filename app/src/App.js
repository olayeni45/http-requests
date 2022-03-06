import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import { fetchMovies } from "./axios/axios";

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
      const result = await fetchMovies();

      if (result.status !== 200) {
        throw new Error("Something went wrong");
      }

      const loadedMovies = result.data.map((movie) => {
        return {
          id: movie["episode_id"],
          title: movie.title,
          openingText: movie["opening_crawl"],
          releaseDate: movie["release_date"],
        };
      });

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false);
  }, []);

  const addMovieHandler = async (movie) => {
    await fetch(`${FIREBASE_URL}/movies.json`, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

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
