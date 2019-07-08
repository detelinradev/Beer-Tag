import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBFormInline, MDBDropdownItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBBtnGroup
} from "mdbreact";

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
      country: "",
      open: false,
      message: "",
      image:
        "https://target.scene7.com/is/image/Target/GUEST_e8853023-d976-477f-bca5-cec1df085307?wid=488&hei=488&fmt=pjpeg",
      value: 50,
      file:'',
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
      name: this.state.name,
      breweryName: this.state.breweryName,
      description: this.state.description,
      alcoholByVolume: this.state.alcoholByVolume,
      beerStyle: this.state.beerStyle,
      country: this.state.country
      // image: this.state.image
    };
    this.props.addProduct(newPlaylist);
    this.setState({ name: "", breweryName: "", description: "", alcoholByVolume: "", beerStyle: "", country: "" });
    this.toggle();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  };
  uploadFile = (event) => {
    event.preventDefault();
    this.setState({error: '', msg: ''});
    if(!this.state.file) {
      this.setState({error: 'Please upload a file.'})
      return;
    }
    if(this.state.file.size >= 2000000) {
      this.setState({error: 'File size exceeds limit of 2MB.'})
      return;
    }
    const token = sessionStorage.getItem("jwt");
    let data = new FormData();
    data.append('file', this.state.file);
    data.append('name', this.state.file.name);
    fetch('http://localhost:8080/image/uploadUserImage', {
      method: 'POST',
      headers:{Authorization:token},
      body: data
    }).then(response => {
      this.setState({error: '', msg: 'Successfully uploaded file'});
    }).catch(err => {
      this.setState({error: err});
    });
  };

  render() {



    return (
      <MDBContainer>
        <MDBBtn color="primary" size="md" onClick={this.toggle} disabled={!this.state.username}>
          New Beer
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered
          backdrop={false}
        >
          <MDBModalBody toggle={this.toggle}>
            New Beer {this.state.username}
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
              value={this.state.breweryName}
            />

            <MDBInput
              className="w-100"
              min={0}
              label="Country"
              outline
              name="country"
              onChange={this.handleChange}
              value={this.state.country}
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
                value={this.state.alcoholByVolume}
            />


            <MDBInput
                className="w-100"
                label="Style"
                outline
                name="beerStyle"
                onChange={this.handleChange}
                value={this.state.beerStyle}
            >
            </MDBInput>
            <div>
              {/*<input type="file" name ="name" onChange={this.fileChangedHandler}/>*/}
              {/*<button type="submit" onClick={this.uploadHandler}>Upload</button>*/}
              {/*<input type="file"  onChange={this.handleImageChange} required/>*/}
              {/*<input type="submit"/>*/}
              <input onChange={this.onFileChange} type="file"></input>
              <button onClick={this.uploadFile}>Upload</button>
            </div>

            {/*<MDBFormInline>*/}
            {/*  <MDBInput*/}
            {/*    className="w-60"*/}
            {/*    label="Image URL"*/}
            {/*    outline*/}
            {/*    name="image"*/}
            {/*    onChange={this.handleChange}*/}
            {/*    value={this.state.image}*/}
            {/*  />*/}

            {/*  <img src={this.state.image} height="55" alt=" image"/>*/}
            {/*</MDBFormInline>*/}

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
