import React, {Component} from "react";

export default class MovieList extends Component {
    render() {
        let movies = this.props.movies.map( (movie) => {
            return (
                // key must go in parent div!
                <div className="card col-md-4 mr-0" key={movie.id}> 
                    <img className="card-img-top" src="http://cdn3-www.cattime.com/assets/uploads/2012/05/socializing-kitten-300x200.jpg" alt={movie.title}/>
                    <div className="card-body">
                        <h5 className="card-title"> {movie.title} </h5>
                        <p className="card-text"> {movie.description.substring(0, 100)}... </p>
                    </div>
                </div>
            );
        });

        return (
            <div className="row mt-5"> {movies} </div>
        );
    }
}