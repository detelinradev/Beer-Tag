import React, {Component} from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBCollapse,
    MDBNavItem,
    MDBFooter,
    MDBIcon,
    MDBBtn, Navbar
} from "mdbreact";
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import {ReactComponent as Logo} from "./assets/logo.svg";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import Login from "./components/users/Login";
import Team from "./components/Team";
import "./App.css";
import Profile from "./components/Profile";
import Users from "./components/users/Users";
import HomePageBeers from "./components/HomePageBeers";
import BeerList from "./components/BeerList";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import Redirect from "react-router-dom/es/Redirect";


class App extends Component {


    state = {
        collapseID: "",
        username: null,
        role: "ANONYMOUS",
        profile: false
    };

    updateUsername = (value) => {
        this.setState({username: value});
    }

    updateRole = (value) => {
        this.setState({role: value});
    }


    logout = async event => {
        this.setState({username: null, role: ""});
    };

    profile = event => {
        this.setState({profile: true})
    };


    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    closeCollapse = collapseID => () =>
        this.state.collapseID === collapseID && this.setState({collapseID: ""});



    render() {
        const login =
          this.state.username == null ? (
              <Login
                  updateRole={this.updateRole.bind(this)}
                  updateUsername={this.updateUsername.bind(this)}
                  profile={this.profile.bind(this)}
              />
          ) : (
              <div/>
          );

        const logoutlink =
            this.state.username == null ? (
                <div/>
            ) : (
                <MDBNavItem>
                    <MDBBtn color="danger" size="sm" onClick={this.logout}>
                        Logout
                    </MDBBtn>
                </MDBNavItem>
            );

        const profile =
            this.state.username == null ? (
                <div/>
            ) : (
                <MDBNavItem>
                    <Profile/>
                </MDBNavItem>
            );


        const home =
            this.state.username === null ? (
                //<HomePage role={this.state.role} username={this.state.username} />
                <HomePage/>
            ) : (
                <div/>
            );

        const admin =
            this.state.role === "ADMIN" ? (
                <MDBNavItem>
                    <AdminPage/>
                </MDBNavItem>
            ) : (
                <div/>
            );

        const overlay = (
            <div
                id="sidenav-overlay"
                style={{backgroundColor: "black"}}
                onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
        );

        const {collapseID} = this.state;

        const LoginContainer = () => (
            <MDBNavbarNav style={{marginLeft: "4rem"}}>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/beers" component={HomePageBeers}/>
                <Route path="/login" render={() => <Login updateRole={this.updateRole.bind(this)}
                                                          updateUsername={this.updateUsername.bind(this)}
                                                          profile={this.profile.bind(this)}/>}/>
            </MDBNavbarNav>
        );

        const DefaultContainer = () => (
            <MDBNavbarNav style={{marginLeft: "4rem"}}>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/beers" component={HomePageBeers}/>
                    <Route path="/me" component={() => <Team/>}/>

            </MDBNavbarNav>
        );


        return (
            <BrowserRouter>

                <div className="flyout">
                    <MDBNavbar
                        // transparent="true"
                        color="elegant-color"
                        light
                        expand="md"
                        fixed="top"
                        scrolling
                    >
                        <MDBNavbarBrand href="/" style={{backgroundColor: "lightblue"}}>
                            Beer Tag {"          "}
                            <Logo style={{height: "2.5rem", width: "2.5rem"}}/>
                            Welcome {this.state.username}
                        </MDBNavbarBrand>

                        <MDBNavbarNav >{logoutlink}</MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavbarNav style={{marginLeft: "4rem"}}>
                                <NavLink exact activeClassName="active" to="/">
                                    Home
                                </NavLink>
                            </MDBNavbarNav>
                            <MDBNavbarNav style={{marginLeft: "4rem"}}>
                                <NavLink exact activeClassName="active" to="/beers">
                                    Beers
                                </NavLink>
                            </MDBNavbarNav>
                            <MDBCollapse
                                id="mainNavbarCollapse"
                                isOpen={this.state.collapseID}
                                navbar
                            >
                            <MDBNavbarNav style={{marginLeft: "4rem"}}>
                                <NavLink activeClassName="active" to="/login">
                                    Login
                                </NavLink>
                            </MDBNavbarNav>

                                {/*{login}*/}
                            </MDBCollapse>

                            {/*{home}*/}
                            {/*{admin}*/}
                            {/*  {profile}*/}

                            {/*<Team />*/}

                        </MDBNavbarNav>

                    </MDBNavbar>
                    {collapseID && overlay}
                    <main style={{marginTop: "10rem"}}>

                        <Switch>
                            <Route exact path="/login" component={LoginContainer}/>
                            <Route component={DefaultContainer}/>
                            {/*<Route exact path="/" component={HomePage}/>*/}
                            {/*<Route exact path="/beers" component={HomePageBeers}/>*/}
                            {/*<Route path="/login" render={() => <Login updateRole={this.updateRole.bind(this)}*/}
                            {/*                                             updateUsername={this.updateUsername.bind(this)}*/}
                            {/*                                             profile={this.profile.bind(this)}/>}/>*/}
                            {/*<Route path="/me" component={() => <Team/>}/>*/}
                        </Switch>
                    </main>
                    <MDBFooter m-5 color="elegant-color">
                        <p className="footer-copyright mb-0 py-3 text-center">
                            &copy; {new Date().getFullYear()}{" "}
                            <a
                                href="https://github.com/antonmadzharov/Beer-Tag"
                                target="_blank"
                            >
                                {" "}
                                Beer Tag App - GitHub{" "}
                                <MDBIcon
                                    fab
                                    icon="github"
                                    className="grey-text mr-2"
                                    size="2x"
                                />
                            </a>
                        </p>
                    </MDBFooter>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
