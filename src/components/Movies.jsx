import React from "react";

const Movies = (props) => {
  const Addliked = props.Addliked;
  return (
    <>
      {props.movies.map((movie) => (
        <div className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt={`poster of ${movie.Poster}`} />
          <div onClick={() => props.handleLikedClick(movie)} className="overlay dflex align-items-center justify-content-center">
             <Addliked />
          </div>
        </div>
      ))}
    </>
  );
};

export default Movies;

