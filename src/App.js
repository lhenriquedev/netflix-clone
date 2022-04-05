import React from 'react';

// scss
import './global.scss';
// components
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Posters from './components/Posters';

// services
import requests from './services/requests';

function App() {
  return (
    <div className="App">
      {/* NAV */}
      <Navbar />
      <Banner />
      {/* BANNER */}
      <Posters
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Posters title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Posters title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Posters title="Action Movies" fetchUrl={requests.fetchActionMovies} />
    </div>
  );
}

export default App;
