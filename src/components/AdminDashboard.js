import React, { useEffect, useState } from 'react';
import { fetchMovies, deleteMovie } from '../utils/FetchHelper';
import { Button, Table } from 'react-bootstrap';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data.movies);
    };
    loadMovies();
  }, []);

  const handleDelete = async (id) => {
    await deleteMovie(id);
    setMovies(movies.filter(movie => movie._id !== id));
  };

  return (
    <div>
      <Button variant="primary" href="/add-movie">Add Movie</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>{movie.genre}</td>
              <td>
                <Button href={`/update-movie/${movie._id}`} variant="warning">Update</Button>{' '}
                <Button onClick={() => handleDelete(movie._id)} variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
