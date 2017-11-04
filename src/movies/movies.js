import React, { Component } from 'react';
import './movies.css';
import PropTypes from 'prop-types';

export default class Movie extends Component {

  constructor(props){
    super(props);
    this.movieName = props.movieName;
    this.movieId = props.movieID;

    this.deleteMovie=this.deleteMovie.bind(this);
  }

  deleteMovie(id){
    this.props.removeMovie(id)
  }

  render(){
       return(
           <div className="movie fade-in">
               <span className="closebtn"
                     onClick={() => this.deleteMovie(this.noteId)}>
                     &times;
               </span>
               <p className="MovieContent">{ this.noteContent }</p>
           </div>
       )
     }
   }
Movie.propTypes = {
    movieName: PropTypes.string
}
