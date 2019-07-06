import React from "react";
import { MDBEdgeHeader, MDBContainer, MDBIcon, MDBJumbotron } from "mdbreact";
import "./HomePage.css";

import BeerList from "./BeerList";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username
        };
    }

    render() {
        return (
            <div>
                <MDBContainer className="mt-5">
                    <MDBJumbotron>
                        <h2>
                            <MDBIcon icon="window-restore" className="grey-text mr-2" />
                            BEERS
                        </h2>
                        <BeerList
                            role={this.props.role}
                            username={this.props.username}
                        />
                    </MDBJumbotron>
                </MDBContainer>
            </div>
        );
    }
}

export default HomePage;
