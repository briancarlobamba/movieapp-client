export const fetchMovies = async () => {
  const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies');
  return await response.json();
};

export const addMovie = async (movie) => {
  const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/addMovie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  return await response.json();
};

export const deleteMovie = async (id) => {
  const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
