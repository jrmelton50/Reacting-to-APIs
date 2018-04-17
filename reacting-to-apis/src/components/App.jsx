import React, {Component} from "react";
import "isomorphic-fetch";
import "es6-promise";
import List from "./List"

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            moviesHaveBeenLoaded: false
        }
    }

    componentDidMount() {
        fetch("https://ghibliapi.herokuapp.com/films")
        .then( (result) => {
            return result.json();
        })
        .then( (object) => {
            this.setState({
                movies: object,
                moviesHaveBeenLoaded: this.state.moviesHaveBeenLoaded
            });

            // HOW TO CHECK DATA THAT WAS JUST UPDATED 
            // this.setState({
            //     movies: object
            // }, () => {
            //     console.log(this.state.movies[0]);
            // });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    handleLoadingMovies() {
        this.setState({
            movies: this.state.movies,
            moviesHaveBeenLoaded: true
        });
    }

    render() {
        if (!this.state.moviesHaveBeenLoaded) {
            return (
                <React.Fragment>
                    <img className="row" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png" alt="Studio Ghibli logo"/>
                    <div className="row">
                        <div className="col-md-5"></div>
                        <button className="btn btn-primary col-md-1" onClick= { (event) => this.handleLoadingMovies() }> Load Movies </button>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png" alt="Studio Ghibli logo"/>
                    <List movies={this.state.movies}/>
                </React.Fragment>
            );
        }
    }
}