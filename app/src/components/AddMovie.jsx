import React, { useState } from "react";
import styles from "./AddMovie.module.css";

const AddMovie = (props) => {
  const { onAddMovie, onRefreshMovies } = props;

  const [details, setDetails] = useState({
    title: "",
    "opening-text": "",
    date: "",
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const movie = {
      title: details.title,
      openingText: details["opening-text"],
      releaseDate: details.date,
    };

    await onAddMovie(movie);
    setDetails({
      title: "",
      "opening-text": "",
      date: "",
    });
    onRefreshMovies();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={details.title}
          onChange={inputHandler}
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea
          rows="5"
          id="opening-text"
          name="opening-text"
          value={details["opening-text"]}
          onChange={inputHandler}
        ></textarea>
      </div>
      <div className={styles.control}>
        <label htmlFor="date">Release Date</label>
        <input
          type="text"
          id="date"
          name="date"
          value={details.date}
          onChange={inputHandler}
        />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default AddMovie;
