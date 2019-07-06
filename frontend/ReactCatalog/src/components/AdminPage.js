import React from "react";
import { MDBEdgeHeader, MDBContainer, MDBIcon, MDBJumbotron } from "mdbreact";
import "./HomePage.css";

import Users from "./users/Users";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username
    };
  }

  render() {
    return (
      <div>

        <MDBContainer className="mt-5  ">
          <MDBJumbotron>
            <h2>
              <MDBIcon icon="user-tag" className="grey-text mr-2" />
              ADMIN PANEL
            </h2>
            <Users username={this.props.username} />
          </MDBJumbotron>
        </MDBContainer>
      </div>
    );
  }
}

export default AdminPage;
