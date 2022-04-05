import React, { useState, useEffect } from 'react';

import axios from '../../services/axios';
import requests from '../../services/requests';

import './style.scss';

import '../../global.scss';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }

    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}>
      <div className="banner__contents">
        <h1 className="banner__heading">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* buttons */}
        <div className="banner__buttons">
          <button className="banner__button banner__button--red">Play</button>
          <button className="banner__button banner__button--white">
            My List
          </button>
        </div>

        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
    </header>
  );
}

export default Banner;
