import React, { Component } from "react";
import "./Login.css";
import { MDBBtn, MDBFormInline } from "mdbreact";
import { SERVER_URL } from "../constants";
import Snackbar from "@material-ui/core/Snackbar";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      age: "",
      isAuthenticated: false,
      login: false,
      message: "",
      open: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  login = () => {
    window.location.reload();
  };

  register = () => {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      age: this.state.age,
      password: this.state.password,
    };
    fetch(SERVER_URL + "sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({ open: true, message: "successful registration" });
          this.login();
        } else {
          this.setState({
            open: true,
            message: "Incorrect data! Please, check your details!"
          });
        }

      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Register</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    onChange={this.handleChange}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lastName"
                    onChange={this.handleChange}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Age"
                    name="age"
                    onChange={this.handleChange}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>

              <MDBBtn
                color="danger"
                className="float-right"
                onClick={this.register}
              >
                Register
              </MDBBtn>
              <Snackbar
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={1500}
                message={this.state.message}
              />
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              <MDBFormInline>
                I have an account
                <MDBBtn
                  color="primary"
                  className="float-right"
                  size="sm"
                  onClick={this.login}
                >
                  Login
                </MDBBtn>
              </MDBFormInline>
            </div>
            <div className="d-flex justify-content-center" />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
