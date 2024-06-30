import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DeleteProfile, ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://radiant-river-68463-0f7c4a72bc48.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row>
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {!user ? (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                ) : (
                  <Navigate to="/" />
                )}
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <SignupView />
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-5 col-12 col-md-6 col-lg-4"
                        key={movie._id}
                        movie={movie}
                      >
                        <MovieCard key={movie._id} movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          ></Route>
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <>
                <ProfileView movies={movies} />
              </>
            }
          ></Route>
          <Route
            path="/deleteProfile"
            element={<>{user ? <DeleteProfile /> : <Navigate to="/" />}</>}
          ></Route>
        </Routes>
        {/* {!user ? (
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8} style={{ border: "1px solid black" }}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          movies.map((movie) => (
            <Col className="mb-5 col-12 col-md-6 col-lg-4" key={movie._id}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )} */}
      </Row>
    </BrowserRouter>
  );
};
