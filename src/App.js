import React, { Component } from 'react';
import Movie from './movies/movies';
import MovieForm from './movies/movieForm';
import './App.css';
import * as firebase from 'firebase'

let DBconfig = {
  apiKey: "AIzaSyA0YS0LWpkwFwLypkdzRuTilPN44Ehipao",
  authDomain: "movie-list-aa1a6.firebaseapp.com",
  databaseURL: "https://movie-list-aa1a6.firebaseio.com",
  projectId: "movie-list-aa1a6",
  storageBucket: "movie-list-aa1a6.appspot.com",
  messagingSenderId: "1038713828423"

}

class App extends Component {
  constructor(props){
    super(props);
    this.addMovie = this.addMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);

    this.app = firebase.initializeApp(DBconfig);
    this.ref= this.app.database().ref().child('movies');

    this.state = {movies: []};
  }
  componentWillMount(){
    const currentMovies = this.state.movies;
    //event listener for movie added to database
    this.ref.on('child_added', snapshot => {
      currentMovies.push({
        id: snapshot.key,
        movieName: snapshot.val().movieName
      });
      this.setState({movies: currentMovies})
    });

    //event listener for movie removed
    this.ref.on('child_removed', snapshot =>{
      for(let i=0; i< currentMovies.length; i++){
        if(currentMovies[i].id === snapshot.key){
          currentMovies.splice(i,1);
        }
      }
      this.setState({movies: currentMovies});
    });
  }

  addMovie(movie){
    this.ref.push({movieName: movie})
  }

  removeMovie(movieID){
    console.log("removing from " + movieID);
    this.ref.child(movieID).remove();
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
                movieID={movie.id}
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
