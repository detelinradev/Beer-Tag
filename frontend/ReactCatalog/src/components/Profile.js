import React from "react";
import { MDBEdgeHeader, MDBContainer, MDBIcon, MDBJumbotron } from "mdbreact";
import "./HomePage.css";

import BeerList from "./BeerList";
import Team from "./Team";
import Wishlist from "./Wishlist";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username
        };
    }

    render() {
        return (
            <div style={{ marginTop: "2rem" }}>
                <Team/>
            </div>
        );
    }
}

export default Profile;