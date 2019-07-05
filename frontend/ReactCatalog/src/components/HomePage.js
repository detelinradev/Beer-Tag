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
        <div style={{ marginTop: "6rem" }}>
          <BeerList />
        </div>
    );
  }
}

export default HomePage;
