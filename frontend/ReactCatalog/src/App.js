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
import Login from "./components/Login";
import "./App.css";
import Profile from "./components/Profile";
import Users from "./components/Users";
import HomePageBeers from "./components/HomePageBeers";
import BeerList from "./components/BeerList";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import Redirect from "react-router-dom/es/Redirect";
import Wishlist from "./components/Wishlist";
import Link from "react-router-dom/es/Link";
import Beer from "./components/Beer";


class App extends Component {

    state = {
        collapseID: "",
        username: null,
        role: "ANONYMOUS",
        profile: false,
        beerName: null
    };

    updateBeerName = (value) => {
        this.setState({beerName: value});
    }

    updateUsername = (value) => {
        this.setState({username: value});
    }

    updateRole = (value) => {
        this.setState({role: value});
    }


    logout = async event => {
        this.setState({username: null, role: ""});
        sessionStorage.clear();
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
                <Wishlist/>
            ) : (
                <MDBNavItem>
                        <Link to="/login">
                    <MDBBtn color="danger" size="sm" onClick={this.logout}>
                            Logout
                    </MDBBtn>
                        </Link>
                </MDBNavItem>
            );

        const profile =
            this.state.username == null ? (
                <div/>
            ) : (
                <MDBNavbarNav style={{marginRight: "4rem"}}>
                    <NavLink activeClassName="active" to="/me">
                        Profile
                    </NavLink>
                </MDBNavbarNav>
            );


        const wishlist =
            this.state.role !== "USER" ? (
                <div/>
            ) : (
                <MDBNavbarNav style={{marginRight: "4rem"}}>
                    <NavLink exact activeClassName="active" to="/wishlist">
                        Wishlist
                    </NavLink>
                </MDBNavbarNav>
            );

        const users =
            this.state.role === "ADMIN" ? (
                <MDBNavbarNav style={{marginRight: "4rem"}}>
                    <NavLink exact activeClassName="active" to="/users">
                        Users
                    </NavLink>
                </MDBNavbarNav>
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
            <MDBNavbarNav style={{marginRight: "4rem"}}>
                <Route exact path="/" component={HomePage}/>
                <Route path="/users" component={AdminPage}/>
                <Route exact path="/beers" component={HomePageBeers}/>
                <Route path="/wishlist" component={Wishlist}/>
                <Route path="/me" component={() => <Profile/>}/>
                <Route path="/login" render={() => <Login updateRole={this.updateRole.bind(this)}
                                                          updateUsername={this.updateUsername.bind(this)}
                                                          profile={this.profile.bind(this)}/>}/>

            </MDBNavbarNav>
        );

        const DefaultContainer = () => (
            <MDBNavbarNav style={{marginRight: "4rem"}}>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/beers" component={HomePageBeers}/>
                    <Route path="/me" component={() => <Profile/>}/>

            </MDBNavbarNav>
        );

        return (
            <BrowserRouter>
                <div className="flyout">
                    <MDBNavbar className="test"
                         transparent="true"
                        color="elegant-color"
                        dark
                        expand="md"
                        fixed="top"
                        scrolling
                    >
                        <MDBNavbarBrand href="/">
                            Beer Tag {"          "}
                            <Logo style={{height: "2.5rem", width: "2.5rem"}}/>
                            Welcome {this.state.username}
                        </MDBNavbarBrand>


                        <MDBNavbarNav right>

                            <MDBCollapse
                                id="mainNavbarCollapse"
                                isOpen={this.state.collapseID}
                                navbar
                            >


                                <MDBNavbarNav style={{marginRight: "4rem"}}>
                                    <NavLink exact activeClassName="active" to="/">
                                        Home
                                    </NavLink>
                                </MDBNavbarNav>
                                <MDBNavbarNav >{wishlist}</MDBNavbarNav>
                                <MDBNavbarNav style={{marginRight: "4rem"}}>
                                    <NavLink exact activeClassName="active" to="/beers">
                                        Beers
                                    </NavLink>
                                </MDBNavbarNav>

                                <MDBNavbarNav >{users}</MDBNavbarNav>
                                <MDBNavbarNav >{profile}</MDBNavbarNav>
                                <MDBNavbarNav >{logoutlink}</MDBNavbarNav>
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
                            <Route  component={LoginContainer}/>
                            <Route component={DefaultContainer}/>
                            {/*<Route exact path="/" component={HomePage}/>*/}
                            {/*<Route exact path="/beers" component={HomePageBeers}/>*/}
                            {/*<Route path="/login" render={() => <Login updateRole={this.updateRole.bind(this)}*/}
                            {/*                                             updateUsername={this.updateUsername.bind(this)}*/}
                            {/*                                             profile={this.profile.bind(this)}/>}/>*/}
                            {/*<Route path="/me" component={() => <Team/>}/>*/}
                        </Switch>
                    </main>
                    <MDBFooter className="test-footer" m-5 color="elegant-color">
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
