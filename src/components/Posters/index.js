import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import Youtube from "react-youtube";
import MovieTrailer from "movie-trailer";

import "./style.scss";

const base_image_url = "https://image.tmdb.org/t/p/original/";

function Posters({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // A snippet of code which runs based on a specific condition/variable;
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  // if [], run once when the row loads, and dont run again
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      MovieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU
          // get all params after 'v'
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="posters">
      {/* title */}
      <h2 className="posters__heading">{title}</h2>

      <div className="posters__row">
        {/* posters */}
        {movies.map((movie) => (
          <img
            className={`posters__image ${isLargeRow && "posters__imageLarge"}`}
            onClick={() => handleClick(movie)}
            src={`${base_image_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            key={movie.id}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Posters;
