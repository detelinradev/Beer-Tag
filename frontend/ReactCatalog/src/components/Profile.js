import React, {Component} from "react";
import "react-table/react-table.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Profile.css";
import {SERVER_URL} from "../constants";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            age: "",
            open: false,
            message: "",
            img: '',
            selectedFile: null
        };
    }

    arrayBufferToBase64(buffer) {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    handleClose = (event, reason) => {
        this.setState({open: false});
    };

    componentDidMount() {
        console.log(111111);
        this.fetchLists();
        this.fetchImage();
    }

    fetchImage = () => {
       // console.log(22222);
        const token = sessionStorage.getItem("jwt");
        console.log(token);
        fetch( "http://localhost:8080/userImage/downloadImage", {
            headers: {Authorization: token}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(555555);
                const base64Flag = 'data:image/jpeg;base64,';
                const imageStr =
                    this.arrayBufferToBase64(data.body);
                console.log(33333)
                this.setState({
                    img: base64Flag + imageStr

                })
                console.log(444444);
            })
            .catch(err => console.error(err));
    };

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

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    // downloadRandomImage = () => {
    //     const token = sessionStorage.getItem("jwt");
    //     fetch('http://localhost:8080/userImage/downloadImage', {
    //         headers: {Authorization: token}
    //     })
    //         .then(response => {
    //             this.setState({
    //                 image: response.
    //             })
    //         });
    // }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center h-40">
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

                                <img src= "" alt=""/>
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
                                {/*<div className="App-intro">*/}
                                {/*    <h3>Download a random file</h3>*/}
                                {/*    <button onClick={this.downloadRandomImage}>Download</button>*/}
                                {/*</div>*/}
                            <h3 className="wow fadeInDown delay-03s">@{this.state.username}</h3>
                            <h3 className="wow fadeInDown delay-03s">{this.state.email}</h3>
                            <h4 className="wow fadeInDown delay-03s">{this.state.age} years old</h4>
                            <div>
                                <input type="file" onClick={this.fileSelectedHandler}/>
                                <button onClick={this.fileUploadHandler}>Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
