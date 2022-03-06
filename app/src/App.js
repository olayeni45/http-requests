import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import { fetchMovies, createMovie } from "./axios/axios";

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

      const loadedMovies = [];

      for (const key in result.data) {
        loadedMovies.push({
          id: key,
          title: result.data[key].title,
          openingText: result.data[key]["openingText"],
          releaseDate: result.data[key]["releaseDate"],
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  const addMovieHandler = async (movie) => {
    try {
      const response = await createMovie(movie);
      if (response.status !== 200) {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      setError(error.message);
    }
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
