import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Alien",
      Image: "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
      Genre: "Horror, Sci-Fi",
      Director: "Ridley Scott",
    },
    {
      id: 2,
      Title: "The Mummy",
      Image: "https://upload.wikimedia.org/wikipedia/en/6/68/The_mummy.jpg",
      Genre: "Action, Adventure, Horror",
      Director: "Stephen Sommers",

    },
    {
      id: 3,
      Title: "Starship Troopers",
      Image: "https://upload.wikimedia.org/wikipedia/en/d/df/Starship_Troopers_-_movie_poster.jpg",
      Genre: "Science Fiction, Action",
      Director: "Paul Verhoeven" ,
     },
    {
      id: 4,
      Title: "Battle: Los Angeles",
      Image: "https://upload.wikimedia.org/wikipedia/en/2/29/Battle_Los_Angeles_Poster.jpg",
      Genre: "Action, Adventue, Sci-Fi",
      Director: "Jonathan Liebesman",

    },
    {
      id: 5,
      Title: "The Last Voyage of the Demeter",
      Image: "https://upload.wikimedia.org/wikipedia/en/a/ad/The_Last_Voyage_of_the_Demeter_%282023%29_poster.jpg",
      Genre: "Fantasy, Horror",
      Director: "André Øvredal",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
