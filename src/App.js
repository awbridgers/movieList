import React, { Component } from 'react';
import Movie from './movies/movies';
import MovieForm from './movies/movieForm';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.addMovie = this.addMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);

    this.state = {movies: ["test","test","test","test","test","test",]};
  }
  componentWillMount(){
    const previousMovies = this.state.movies;
  }

  addMovie(){
    //add a movie here
  }

  removeMovie(){
    //remove a movie here
  }
  render(){
    return (
      <div className="movieWrapper">
        <div className="movieHeader">
          <div className="heading">Movie Watch List</div>
        </div>
        <div className="movieBody">
          {
            this.state.movies.map((movie) => {
              return (
                <Movie movieName={movie.movieName}
                movieId={movie.id}
                key={movie.id}
                removeMovie ={this.removeMovie}/>
              )
            })
          }
        </div>
        <div className="movieFooter">
          <MovieForm addMovie={this.addMovie} />
        </div>
      </div>
);

  }


  }


export default App;
