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
  const [page, setPage] = useState(1);
  const [showPressed, setShowPressed] = useState(false);
  let vis = movies.length > 0 ? 'visible' : 'invisible';
  
  const API_KEY = process.env.REACT_APP_API_KEY;
  const getMovies = async (searchInput) => {
    const url = `https://www.omdbapi.com/?s=${searchInput}&page=${page}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
   
    if (responseJson.Search && !showPressed) {
      setMovies((prevMovies) => [...prevMovies, ...responseJson.Search]);
    } 
      else if (responseJson.Search === undefined && showPressed){        
        alert('no more pages for current search input');
    }
    setShowPressed(false);
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

  const showMore = () => {
    setShowPressed(true);
    setPage(page + 1);
  };

  useEffect(() => {
    if (searchInput) {
      getMovies(searchInput);
    }
  }, [page, showPressed, searchInput]);

  useEffect(() => {
    const updatedLikedMovies = JSON.parse(
      localStorage.getItem("react-movie-app-liked")
    );
    if (updatedLikedMovies) {
      setLikedMovies(updatedLikedMovies);
    }
  }, []);

  useEffect(() => {
    vis = movies.length === 0 ? 'invisible' : 'visible';
  }, [movies]);

  return (
    <>
    <div className="container-fluid overflow">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MoviesHeading heading={"Movies"} />
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setPage={setPage}
          setMovies={setMovies}
        />
      </div>
  <div className="d-flex justify-content-center m-3">
    <btn className={`btn btn-dark p-3 ${vis}`} onClick={showMore}>
      Show More
    </btn>
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
  </>
  );
}

export default App;
