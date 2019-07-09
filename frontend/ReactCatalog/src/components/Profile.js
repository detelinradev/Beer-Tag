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
            img: 'https://www.telegraph.co.uk/content/dam/men/2016/05/24/Untitled-1_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg?imwidth=450',
            title: '',
            content: '',
            image:null,
            src:null,
            error:'',
            msg:'',
            file:''
        };
    }

    handleClose = (event, reason) => {
        this.setState({open: false});
    };

    componentDidMount() {
        this.fetchLists();
        this.fetchImage();
    }

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

    fetchImage = async () => {
        const token = sessionStorage.getItem("jwt");
       await fetch(`http://localhost:8080/image/downloadImage`,
            { headers: {Authorization: token}}
            )
            // .then(validateResponse)
            .then(response => response.blob())
            .then(blob => {
                this.setState({ src: URL.createObjectURL(blob) })
            })

    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
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
            this.fetchLists();
            this.setState({error: '', msg: 'Successfully uploaded file'});
        }).catch(err => {
            this.setState({error: err});
        });
    };

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center h-40">
                    <form onSubmit={this.handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Profile</h3>
                        </div>
                        <div className="card-body">
                            <h3>{this.state.firstName} {this.state.lastName}</h3>
                            <div className="m-3 team-leader wow fadeInDown delay-03s">
                                <div className="team-leader-shadow">
                                    <a href=""/>
                                </div>
                                <img  src= {this.state.src} alt="No image"/>
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
                            <h4 className="wow fadeInDown delay-03s">@{this.state.username}</h4>
                            <h4 className="wow fadeInDown delay-03s">{this.state.email}</h4>
                            <h4 className="wow fadeInDown delay-03s">{this.state.age} years old</h4>
                            <div>
                                <input onChange={this.onFileChange} type="file"></input>
                                <button onClick={this.uploadFile}>Upload</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Profile;
