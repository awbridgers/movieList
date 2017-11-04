import React, { Component } from 'react';
import './movieStyle.css'

export default class MovieForm extends Component {
  constructor(props){
    super(props);
    this.state = {movieName: ""}

    this.handleUserInput = this.handleUserInput.bind(this);
    this.listMovie = this.listMovie.bind(this);
  }

  handleUserInput(e){
    this.setState({movieName: e.target.value});
  }

  listMovie(){
    this.props.addMovie(this.state.movieName);
    this.setState({movieName: ""});
  }
  render(){
        return(
            <div className="formWrapper">
                <input className="movieInput"
                placeholder="Write a new movie..."
                value={this.state.movieName}
                onChange={this.handleUserInput} />
              <button className="movieButton"
                onClick={this.listMovie}>Add Movie</button>
            </div>
        )
}
}
