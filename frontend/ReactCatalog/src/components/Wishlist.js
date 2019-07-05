import React, {Component} from "react";
import "react-table/react-table.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Team.css";
import {SERVER_URL} from "../constants";

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            age: "",
            open: false,
            message: ""
        };
    }

    handleClose = (event, reason) => {
        this.setState({open: false});
    };

    componentDidMount() {
        this.fetchLists();
    }

    // Fetch all users
    fetchLists = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + "me", {
            headers: {Authorization: token}
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    firstName: responseData.firstName,
                    lastName: responseData.lastName,
                    username: responseData.username,
                    email: responseData.email,
                    age: responseData.age
                });
            })
            .catch(err => console.error(err));
    };

    render() {
        return (
            <div>
                <div className="d-flex h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Profile</h3>
                        </div>
                        <div className="card-body">
                            <h3>{this.state.firstName} {this.state.lastName}</h3>
                            <div className="m-3 team-leader wow fadeInDown delay-03s">
                                <div className="team-leader-shadow">
                                    <a href="#"/>
                                </div>
                                <img src="img/antonmadzharov.png" alt=""/>
                                <ul>
                                    <li>
                                        <a
                                            href="https://app.enhancv.com/share/5886cb7d?utm_medium=growth&utm_campaign=share-resume&utm_source=dynamic"
                                            target="_blank"
                                        >
                                            more info
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <h3 className="wow fadeInDown delay-03s">@{this.state.username}</h3>
                            <h4 className="wow fadeInDown delay-03s">{this.state.email}</h4>
                            <h4 className="wow fadeInDown delay-03s">{this.state.age} years old</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wishlist;
