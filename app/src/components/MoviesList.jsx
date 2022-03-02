import React from "react";
import Movie from "./Movie";
import styles from "./MoviesList.module.css";

const MovieList = (props) => {
  const { movies } = props;
  return (
    <ul className={styles["movies-list"]}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
