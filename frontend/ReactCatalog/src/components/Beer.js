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

class Beer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: this.props.username,
            name: this.props.name,
            beer: this.props.beer,
            breweryName: this.props.breweryName,
            description: this.props.description,
            alcoholByVolume: this.props.alcoholByVolume,
            beerStyle: this.props.beerStyle,
            open: false,
            message: "",
            image: this.props.image,
            value: 50,
            data: []
        };
    }

    componentDidMount() {
        this.props.getBeer(`http://localhost:8080/api/beers/search/findByName?name=${this.state.name}`);
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
                <MDBBtn color="primary" size="sm" onClick={this.toggle}>
                    {this.props.getBeer}
                    Details
                </MDBBtn>
                <MDBModal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    centered
                    backdrop={false}
                >

                    <MDBModalBody>
                        <div className="d-flex justify-content-center h-100">
                        <MDBBtn >
                         NAME
                        </MDBBtn>
                        </div>
                        <div className="d-flex justify-content-center h-100">
                        <MDBBtn>
                            BREWERY
                        </MDBBtn>
                        </div >
                        <div className="d-flex justify-content-center h-100">
                        <MDBBtn>
                            COUNTRY
                        </MDBBtn>
                        </div>
                                    <div className="d-flex justify-content-center h-100">
                        <MDBBtn>
                            DESCRIPTION
                        </MDBBtn>
                                    </div>
                        <div className="d-flex justify-content-center h-100">
                        <MDBBtn>
                            ALCOHOL
                        </MDBBtn>
                        </div>
                        <div className="d-flex justify-content-center h-100">
                        <MDBBtn>
                            STYLE
                        </MDBBtn>
                        </div>
                            <div className="d-flex justify-content-center h-100">
                                <MDBBtn>
                                Image:
                            <img src={this.state.image} height="90" alt=" image"/>
                                </MDBBtn>
                            </div>

                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={this.toggle}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default Beer;
