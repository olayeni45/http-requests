import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";

const BASE_URL = "https://swapi.dev/api";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/films`);

      if (response.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie["episode_id"],
          title: movie.title,
          openingText: movie["opening_crawl"],
          releaseDate: movie["release_date"],
        };
      });

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
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
        <button onClick={fetchMoviesHandler}> Fetch Movies </button>
      </section>
      <section>{content}</section>
    </Fragment>
  );
};

export default App;
