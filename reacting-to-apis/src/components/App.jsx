import React, {Component} from "react";
import "isomorphic-fetch";
import "es6-promise";
import List from "./List"

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            // moviesHaveBeenLoaded: false
        }
    }

    componentDidMount() {
        fetch("https://ghibliapi.herokuapp.com/films")
        .then( (result) => {
            return result.json();
        })
        .then( (object) => {
            this.setState({
                movies: object 
                // moviesHaveBeenLoaded: this.state.moviesHaveBeenLoaded
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

    // handleLoadingMovies() {
    //     this.setState({
    //         moviesHaveBeenLoaded: true
    //     });
    // }

    render() {
        // if (!moviesHaveBeenLoaded) {
        //     return (
        //         <React.Fragment>
        //             <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png" alt="Studio Ghibli logo"/>
        //             <button onClick= { (event) => this.handleLoadingMovies()}> Load Movies </button>
        //         </React.Fragment>
        //     );
        // }
        // else {
            return (
                <React.Fragment>
                    <List movies={this.state.movies}/>
                </React.Fragment>
            );
        // }
    }
}