import React, {Component} from "react";
import "react-table/react-table.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Profile.css";
import {SERVER_URL} from "../constants";
import {MDBCollapse, MDBContainer, MDBIcon, MDBJumbotron, MDBNavbarNav} from "mdbreact";
import {NavLink} from "react-router-dom";
import BeerList from "./BeerList";

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username
        };
    }
    render() {
        return (
            <div>
                {/*<MDBContainer className="mt-5">*/}
                {/*    <MDBJumbotron>*/}
                {/*        <h2>*/}
                {/*            <MDBIcon icon="window-restore" className="grey-text mr-2" />*/}
                {/*            BEERS*/}
                {/*        </h2>*/}
                {/*        <BeerList*/}
                {/*            role={this.props.role}*/}
                {/*            username={this.state.username}*/}
                {/*        />*/}
                {/*    </MDBJumbotron>*/}
                {/*</MDBContainer>*/}
            </div>
        );
    }
}

export default Wishlist;
