/* eslint-disable no-fallthrough */
import './main.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Movie from './components/Movie/Movie';
import SortButton from './components/Buttons/SortButton';
import LoadMoreButton from './components/Buttons/LoadMoreButton';
import FetchButton from './components/Buttons/FetchButton';

function App() {
  const URL_TRENDING_WEEK = 'https://api.themoviedb.org/3/trending/all/week?';
  const URL_UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming?';
  const URL_MEDIA = 'https://api.themoviedb.org/3/movie/';
  const URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?';
  const API_KEY = 'df763027947b904295cf51b2710638b2'; //THIS IS PRIVATE KEY AND TO BE USED ONLY FOR TESTING
  const movies = useSelector((state) => state.movies.movies);

  const [sortRating, setSortRating] = useState(false);
  const [popup, setPopup] = useState(false);
  const [stateMovies, setStateMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [sortedMoviesRating, setSortedMoviesRating] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  console.log('render');
  const getMovies = async (url, page) => {
    console.log(url, page);
    try {
      const fetchedMovies = await axios.get(
        `${url}api_key=${API_KEY}&page=${page}`
      );
      page > 1
        ? dispatch({ type: 'LOAD_MORE', payload: fetchedMovies.data.results })
        : dispatch({
            type: 'MOVIES_LOADED',
            payload: fetchedMovies.data.results,
          });
    } catch (err) {
      return err;
    }
  };
  const searchMovie = async (movie) => {
    try {
      const searchedMovie = await axios.get(
        `${URL_SEARCH}api_key${API_KEY}&language=en-US&query=${movie}&page=1&include_adult=false`
      );
      dispatch({
        type: 'MOVIES_LOADED',
        payload: searchedMovie.data.results,
      });
      setSortRating(false);
    } catch (err) {
      return err;
    }
  };
  const getMedia = async (id) => {
    try {
      const fetchedMedia = await axios.get(
        `  ${URL_MEDIA}/${id}/videos?api_key=df763027947b904295cf51b2710638b2&language=en-US`
      );
      const trailer = fetchedMedia.data.results.find((elem) =>
        elem.name.includes('Trailer')
      );
      console.log(trailer.key);
      setTrailerUrl(trailer.key);
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    getMovies(URL_TRENDING_WEEK, 1);
  }, []);

  const loadMore = () => {
    setPage((prev) => ++prev);
    console.log(page);
    getMovies(URL_TRENDING_WEEK, page);
  };
  const fetchUpcoming = () => {
    setSortRating(false);
    getMovies(URL_UPCOMING, page);
  };

  const trailerHandle = (id) => {
    getMedia(id);
    setPopup(true);
    window.scrollTo(0, 0);
  };

  const popupHandle = () => {
    setTrailerUrl('');
    setPopup(false);
  };

  const sortHandle = () => {
    setSortRating(true);
    const ratingSorted = movies.sort((a, b) => b.vote_average - a.vote_average);
    setSortedMoviesRating(ratingSorted);
  };

  return (
    <div className="container">
      <Header searchMovie={searchMovie} />

      <SortButton sortHandle={sortHandle} text={'Rating'} />
      <FetchButton fetchHandle={fetchUpcoming} text={'Upcoming'} />

      <section style={{ opacity: popup ? 0.5 : 1 }} className="movies-block">
        {(sortRating ? sortedMoviesRating : movies).map((movie) => {
          return <Movie trailerHandle={trailerHandle} movie={movie} />;
        })}
      </section>
      <div
        style={{ display: popup ? 'block' : 'none' }}
        className="youtube-frame">
        <button onClick={popupHandle}>X</button>
        <iframe
          allow="autoplay"
          allowFullScreen
          src={`https://www.youtube.com/watch?v=${trailerUrl}`}
          frameborder="0"></iframe>
      </div>
      <LoadMoreButton loadMore={loadMore} text={'Load More'} />
    </div>
  );
}

export default App;
