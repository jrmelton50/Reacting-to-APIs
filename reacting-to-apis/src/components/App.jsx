import React, {Component} from "react";
import "isomorphic-fetch";
import "es6-promise";
import MovieList from "./MovieList";
import PeopleList from "./PeopleList";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            people: [],
            moviesHaveBeenLoaded: false,
            peopleHaveBeenLoaded: false
        }
    }

    fetchData(button) {
        let promise;
        if (button.id === "movies"){
            promise = fetch("https://ghibliapi.herokuapp.com/films");
            console.log("You pressed the button to load movies!");
        }
        else {
            promise = fetch("https://ghibliapi.herokuapp.com/people");
            console.log("You pressed the button to load people!");
        } 
        promise.then( (result) => {
            return result.json();
        })
        .then( (object) => {
            console.log("object = ", object);
            if (button.id === "movies") {
                this.setState({
                    movies: object,
                    people: this.state.people,
                    moviesHaveBeenLoaded: true,
                    peopleHaveBeenLoaded: this.state.peopleHaveBeenLoaded
                });
            }
            else {
                this.setState({
                    movies: this.state.movies,
                    people: object,
                    moviesHaveBeenLoaded: this.state.moviesHaveBeenLoaded,
                    peopleHaveBeenLoaded: true
                });
            }
        }).catch( (err) => {
            console.log(err);
        });
    }

    // componentDidMount() {
    //     fetch("https://ghibliapi.herokuapp.com/films")
    //     .then( (result) => {
    //         return result.json();
    //     })
    //     .then( (object) => {
    //         this.setState({
    //             movies: object,
    //             people: this.state.people,
    //             moviesHaveBeenLoaded: this.state.moviesHaveBeenLoaded,
    //             peopleHaveBeenLoaded: this.state.peopleHaveBeenLoaded
    //         });

    //         // HOW TO CHECK DATA THAT WAS JUST UPDATED 
    //         // this.setState({
    //         //     movies: object
    //         // }, () => {
    //         //     console.log(this.state.movies[0]);
    //         // });
    //     })
    //     .catch( (err) => {
    //         console.log(err);
    //     });
    // }

    // handleLoadingMovies() {
    //     this.setState({
    //         movies: this.state.movies,
    //         people: this.state.people,
    //         moviesHaveBeenLoaded: true,
    //         peopleHaveBeenLoaded: this.state.peopleHaveBeenLoaded
    //     });
    // }

    render() {
        if (this.state.moviesHaveBeenLoaded || this.state.peopleHaveBeenLoaded) {
            if (this.state.peopleHaveBeenLoaded) {
                return (
                    <React.Fragment>
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png" alt="Studio Ghibli logo"/>
                        <PeopleList people={this.state.people}/>
                    </React.Fragment>
                );
            }
            else {
                return (
                    <React.Fragment>
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png" alt="Studio Ghibli logo"/>
                        <MovieList movies={this.state.movies}/>
                    </React.Fragment>
                ); 
            }
            
        }
        else {
            return (
                <React.Fragment>
                    <img className="row" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png" alt="Studio Ghibli logo"/>
                    <div className="row">
                        <div className="col-md-5"></div>
                        <button id="movies" className="btn btn-primary col-md-2 mr-1" onClick= { (event) => this.fetchData(event.target) }> Load Movies </button>
                        <button id="people" className="btn btn-primary col-md-2" onClick= { (event) => this.fetchData(event.target) }> Load People </button>
                    </div>
                </React.Fragment>
            );
        }
    }
}