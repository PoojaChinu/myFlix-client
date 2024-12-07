export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      // Listening for Click Event with special attribute onClick
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};
