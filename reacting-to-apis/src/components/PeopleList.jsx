import React, {Component} from "react";

export default class PeopleList extends Component {
    render() {
        let people = this.props.people.map( (person) => {
            return (
                // key must go in parent div!
                <div className="card col-md-4 mr-0" key={person.id}> 
                    <div className="card-body">
                        <h5 className="card-title"> {person.name} </h5>
                        <p className="card-text"> {person.gender} </p>
                        <p className="card-text"> {person.age} </p>
                        <a target="_blank" href={person.url}> {person.name}'s JSON Response </a>
                    </div>
                </div>
            );
        });

        return (
            <div className="row mt-5"> {people} </div>
        );
    }
}