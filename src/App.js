import Movies from "./components/Movies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import MoviesHeading from "./components/MoviesHeading";
import Search from "./components/Search";
import AddLiked from "./components/AddLiked";
import RemovedLiked from "./components/RemovedLiked";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [likedMovies, setLikedMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const getMovies = async (searchInput) => {
    const url = `http://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const saveToLS = (items) => {
    localStorage.setItem("react-movie-app-liked", JSON.stringify(items));
  };

  const removelikedClick = (movie) => {
    const updatedLikedMovies = likedMovies.filter(
      (movieInArr) => movieInArr !== movie
    );
    setLikedMovies(updatedLikedMovies);
    saveToLS(updatedLikedMovies);
  };

  const likedClick = (movie) => {
    if (likedMovies.includes(movie)) {
      alert("This film has already been added");
    } else {
      const updatedLikedMovies = [...likedMovies, movie];

      setLikedMovies(updatedLikedMovies);
      saveToLS(updatedLikedMovies);
    }
  };

  useEffect(() => {
    if (searchInput) {
      getMovies(searchInput);
    }
  }, [searchInput]);

  useEffect(() => {
    const updatedLikedMovies = JSON.parse(
      localStorage.getItem("react-movie-app-liked")
    );
    if(updatedLikedMovies){setLikedMovies(updatedLikedMovies)};
  }, []);

  return (
    <div className="container-fluid overflow">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MoviesHeading heading={"Movies"} />
        <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>
      <div className="row">
        <Movies
          movies={movies}
          Addliked={AddLiked}
          handleLikedClick={likedClick}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MoviesHeading heading={"Liked Films"} />
      </div>
      <div className="row">
        <Movies
          movies={likedMovies}
          Addliked={RemovedLiked}
          handleLikedClick={removelikedClick}
        />
      </div>
    </div>
  );
}

export default App;
