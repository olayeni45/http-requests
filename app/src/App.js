import React, { Fragment } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";

const DUMMY_ARRAY = [
  {
    id: "1",
    title: "Anabelle",
    openingText: "Be scared!",
    releaseDate: "2020-10-5",
  },
  {
    id: "2",
    title: "Anabelle",
    openingText: "Be scared!",
    releaseDate: "2020-10-5",
  },
  {
    id: "3",
    title: "Anabelle",
    openingText: "Be scared!",
    releaseDate: "2020-10-5",
  },
];

const App = () => {
  return (
    <Fragment>
      <section>
        <button> Fetch Movies </button>
      </section>
      <section>
        <MovieList movies={DUMMY_ARRAY} />
      </section>
    </Fragment>
  );
};

export default App;
