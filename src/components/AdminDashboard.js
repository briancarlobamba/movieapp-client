import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddMovieForm from './AddMovieForm';
import UpdateMovieForm from './UpdateMovieForm';
import { fetchMovies, deleteMovie } from '../utils/FetchHelper';
import { Notyf } from 'notyf'; // Import Notyf

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const notyf = new Notyf(); // Create a Notyf instance

  const fetchAndSetMovies = () => {
    fetchMovies().then(data => {
      setMovies(data.movies);
    });
  };

  useEffect(() => {
    fetchAndSetMovies();
  }, []);

  const handleDelete = (id) => {
    deleteMovie(id).then(() => {
      setMovies(movies.filter(movie => movie._id !== id));
      notyf.success('Movie deleted successfully!'); // Notification on delete
    });
  };

  const handleAddMovie = () => {
    notyf.success('Movie added successfully!'); // Notification on add
    fetchAndSetMovies(); // Refresh the movie list
  };

  const handleUpdateMovie = () => {
    notyf.success('Movie updated successfully!'); // Notification on update
    fetchAndSetMovies(); // Refresh the movie list
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AddMovieForm onAddMovie={handleAddMovie} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Description</th> {/* New Description column */}
            <th>Genre</th> {/* New Genre column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>{movie.description}</td> {/* Display Description */}
              <td>{movie.genre}</td> {/* Display Genre */}
              <td>
                <UpdateMovieForm movie={movie} onUpdateMovie={handleUpdateMovie} />
                <Button variant="danger" onClick={() => handleDelete(movie._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
