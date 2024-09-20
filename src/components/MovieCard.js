import React from 'react';
import { Card } from 'react-bootstrap';

const MovieCard = ({ movie }) => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>
        <strong>Director:</strong> {movie.director} <br />
        <strong>Year:</strong> {movie.year} <br />
        <strong>Genre:</strong> {movie.genre} <br />
        <strong>Description:</strong> {movie.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default MovieCard;
