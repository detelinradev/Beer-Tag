import React, {Component} from "react";
import "react-table/react-table.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Profile.css";
import {SERVER_URL} from "../constants";
import axios from "axios";


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
            title: '',
            content: '',
            image:null,
           // selectedFile: null,
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

    // handleChange = event => {
    //     this.setState({[event.target.name]: event.target.value});
    // };


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
    // fileChangedHandler = event => {
    //     this.setState({ selectedFile: event.target.files[0] })
    //     console.log(this.state.selectedFile)
    // };
    // uploadHandler = () => {
    //     const token = sessionStorage.getItem("jwt");
    //     // axios.post( 'http://localhost:8080/image/uploadUserImage',{"file": this.state.selectedFile},
    //     //     {headers:{Authorization:token}})
    //     fetch("http://localhost:8080/image/uploadUserImage", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: token
    //         },
    //         body: this.state.selectedFile
    //     })
    //         .catch(err => console.error(err));
    //     console.log(this.state.selectedFile)
    // };
      // console.log(this.state.selectedFile)

    // axios({ method: 'POST', url: 'you http api here', headers: {autorizacion: localStorage.token}, data: { user: 'name' } })

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    // handleImageChange = (e) => {
    //     this.setState({
    //         image: e.target.files[0]
    //     })
    // };
    //
    // handleSubmit = (e) => {
    //     const token = sessionStorage.getItem("jwt");
    //     e.preventDefault();
    //     console.log(this.state);
    //     let form_data = new FormData();
    //    // form_data.append('image', this.state.image, this.state.image.name);
    //     // form_data.append('title', this.state.title);
    //     // form_data.append('content', this.state.content);
    //     let url = 'http://localhost:8080/image/uploadUserImage';
    //     axios.post(url, form_data, {
    //         headers: {
    //            'content-type': 'multipart/form-data',
    //             Authorization : token
    //         }
    //     })
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch(err => console.log(err))
    // };
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
        // const {img} = this.state;
        // console.log(img)
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
                            <h3 className="wow fadeInDown delay-03s">@{this.state.username}</h3>
                            <h3 className="wow fadeInDown delay-03s">{this.state.email}</h3>
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
