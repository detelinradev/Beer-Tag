import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBFormInline
} from "mdbreact";
import "react-confirm-alert/src/react-confirm-alert.css";

class NewBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: this.props.username,
      name: "",
      breweryName: "",
      description: "",
      alcoholByVolume: "",
      beerStyle: "",
      open: false,
      message: "",
      image:
        "https://banner2.kisspng.com/20180604/pol/kisspng-react-javascript-angularjs-ionic-atom-5b154be6709500.6532453515281223424611.jpg",
      value: 50,
      data: []
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  // Save and close modal form
  handleSubmit = event => {
    event.preventDefault();

    var newPlaylist = {
      username: this.props.username,
      name: this.state.name,
      breweryName: this.state.breweryName,
      description: this.state.description,
      alcoholByVolume: this.state.alcoholByVolume,
      beerStyle: this.state.beerStyle,
      image: this.state.image
    };
    this.props.addProduct(newPlaylist);
    this.setState({ name: "", breweryName: "", description: "", alcoholByVolume: "" });
    this.toggle();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    return (
      <MDBContainer>
        <MDBBtn color="primary" size="md" onClick={this.toggle}>
          New Beer
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered
          backdrop={false}
        >
          <MDBModalBody toggle={this.toggle}>
            New Beer {this.props.username}
          </MDBModalBody>
          <MDBModalBody>
            <MDBInput
              className="w-100"
              label="Name"
              outline
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />

            <MDBInput
              className="w-100"
              min={0}
              label="Brewery"
              outline
              name="breweryName"
              onChange={this.handleChange}
              value={this.state.price}
            />

            <MDBInput
              className="w-100"
              label="Description"
              outline
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />

            <MDBInput
                className="w-100"
                label="Alcohol"
                outline
                name="alcoholByVolume"
                onChange={this.handleChange}
                value={this.state.price}
            />
            <MDBInput
                className="w-100"
                label="Style"
                outline
                name="beerStyle"
                onChange={this.handleChange}
                value={this.state.price}
            />


            <MDBFormInline>
              <MDBInput
                className="w-60"
                label="Image URL"
                outline
                name="image"
                onChange={this.handleChange}
                value={this.state.image}
              />

              <img src={this.state.image} height="55" alt=" image"/>
            </MDBFormInline>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="danger" onClick={this.toggle}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.handleSubmit}>
              Save
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default NewBeer;
