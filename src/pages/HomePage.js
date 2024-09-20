import { useEffect, useState } from 'react';
import { fetchMovies } from '../utils/FetchHelper';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      const data = await fetchMovies();
      setMovies(data.movies);
    };

    fetchMoviesData();
  }, []);

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default HomePage;
