import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovies, addMovie } from '../utils/FetchHelper';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const UpdateMovieForm = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    description: ''
  });
  const navigate = useNavigate();
  const notyf = new Notyf();

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovies();
      const movieToUpdate = data.movies.find((m) => m._id === id);
      if (movieToUpdate) {
        setMovie(movieToUpdate);
      }
    };
    loadMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addMovie(movie);

    if (response.success) {
      notyf.success('Movie updated successfully');
      navigate('/admin');
    } else {
      notyf.error('Failed to update movie');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={movie.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="director"
        value={movie.director}
        onChange={handleChange}
        placeholder="Director"
        required
      />
      <input
        type="number"
        name="year"
        value={movie.year}
        onChange={handleChange}
        placeholder="Year"
        required
      />
      <input
        type="text"
        name="genre"
        value={movie.genre}
        onChange={handleChange}
        placeholder="Genre"
        required
      />
      <textarea
        name="description"
        value={movie.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default UpdateMovieForm;
