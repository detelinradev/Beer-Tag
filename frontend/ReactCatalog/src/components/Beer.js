import React, { Component } from "react";
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
} from "mdbreact";
import "react-confirm-alert/src/react-confirm-alert.css";

class Beer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: this.props.username,
        };
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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
