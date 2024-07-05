### Project Overview

The MyFlix-Client project is a single-page, responsive application built using React, designed for movie enthusiasts who want to explore and save information about various movies. This client-side application interfaces with an existing server-side REST API and database, forming a complete full-stack JavaScript project utilizing the MERN stack (MongoDB, Express, React, and Node.js).

### Features

### Main View:

Returns all movies to the user (each movie item with an image and title).
Allows filtering the list of movies with a search feature.
Ability to select a movie for more details.
Ability to log out.
Ability to navigate to Profile View.

### Single Movie View:

Returns data (image, title, description, genre, director, cast) about a single movie to the user.
Allows users to add or remove a movie from their list of favorites.

### Login View:

Allows users to log in with a username and password.

### Signup View:

Allows new users to register (username, password, email, date of birth).

### Profile View:

Displays user registration details.
Allows users to update their info (username, password, email, date of birth).
Displays favorite movies.
Allows users to remove a movie from their list of favorites.
Allows existing users to deregister.

### Project Setup

#### Configuring Parcel

- npm install -g parcel

#### Install dependencies

- npm install --save react react-dom

#### Instruct Parcel to build your project:

- parcel src/index.html

### Deployment

The myFlix Clientapp is deployed on Netlify and can be accessed [https://pooja-porwal-myflix.netlify.app/]
