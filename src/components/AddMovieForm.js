import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 

const notyf = new Notyf(); 

function MovieForm({ isUpdate, updateMoviesList }) {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    year: '',
    description: '',
    genre: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate && id) {
      fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${id}`)
        .then(res => res.json())
        .then(data => setMovie(data))
        .catch(err => console.error(err));
    }
  }, [id, isUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isUpdate 
      ? `https://movieapp-api-lms1.onrender.com/movies/updateMovie/${id}`
      : 'https://movieapp-api-lms1.onrender.com/movies/addMovie';

    fetch(url, {
      method: isUpdate ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update movie');
        return res.json();
      })
      .then((data) => {
        notyf.success(isUpdate ? 'Movie updated successfully' : 'Movie added successfully');
        updateMoviesList(data);
        navigate('/dashboard');
      })
      .catch(err => {
        console.error(err);
        notyf.error(isUpdate ? 'Failed to update movie' : 'Failed to add movie');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control 
            name="title" 
            value={movie.title} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Director</Form.Label>
          <Form.Control 
            name="director" 
            value={movie.director} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Control 
            name="year" 
            value={movie.year} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            name="description" 
            value={movie.description} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control 
            name="genre" 
            value={movie.genre} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isUpdate ? 'Update Movie' : 'Add Movie'}
        </Button>
      </Form>
    </Container>
  );
}

export default MovieForm;
