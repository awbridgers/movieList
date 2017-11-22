import React, { Component } from 'react';
import Movie from './movies/movies';
import MovieForm from './movies/movieForm';
import LogInComp from './logIn/logIn.jsx';
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
    this.logIn = this.logIn.bind(this);
    this.googleLogIn = this.googleLogIn.bind(this);
    this.facebookLogIn = this.facebookLogIn.bind(this);
    this.twitterLogIn= this.twitterLogIn.bind(this);
    this.addListeners=this.addListeners.bind(this);
    this.logOut = this.logOut.bind(this);

    this.app = firebase.initializeApp(DBconfig);
    this.state = {movies: [], loggedIn: false};
    }
  componentWillMount(){}
  addListeners(){
    //try to add event listeners. Using "try" so if ref is not properly set it won't crash to program
    try{
      const currentMovies = this.state.movies;
      //event listener for movie added to database
      this.childAdded=this.ref.on('child_added', snapshot => {
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
    catch(err){
      console.log(this.state.loggedIn);
    }
  }
  googleLogIn(){
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.logIn();
  }
  facebookLogIn(){
    this.provider = new firebase.auth.FacebookAuthProvider();
    this.logIn();
  }
  twitterLogIn(){
    this.provider = new firebase.auth.TwitterAuthProvider();
    this.logIn();
  }
  logIn(){
    firebase.auth().signInWithPopup(this.provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    this.uid = firebase.auth().currentUser.uid;
    this.ref= this.app.database().ref(this.uid).child('movies');
    this.addListeners();
    this.setState({loggedIn:true});
    // ...
    }.bind(this)).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      });

    }


  logOut(){
    if(this.state.loggedIn){
      console.log(firebase.auth().currentUser.uid);
      this.ref.off();
      firebase.auth().signOut().then(()=>{console.log("Sign Out Successful");});
      this.setState({loggedIn: false, movies: []});
    }
    else{
      console.log("Already Logged Out");
    }
  }
  addMovie(movie){
    this.ref.push({movieName: movie})
  }

  removeMovie(movieID){
    console.log("removing from " + movieID);
    this.ref.child(movieID).remove();
  }
  render(){
    if(!this.state.loggedIn){
      return(
        <div>
          <div className="movieHeader">
            <div className="heading">Please Log In</div>
            <button className = "signOut" onClick = {this.logOut}>Sign Out</button>
          </div>
          <LogInComp twitter = {this.twitterLogIn} facebook = {this.facebookLogIn} google = {this.googleLogIn}/>
        </div>
      )
    }
    return (
      <div className="movieWrapper">
        <div className="movieHeader">
          <div className="heading">Movie Watch List</div>
          <button className = "signOut" onClick = {this.logOut}>Sign Out</button>
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
