import React, {Component} from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBCollapse,
    MDBNavItem,
    MDBFooter,
    MDBIcon,
    MDBBtn,
} from "mdbreact";
import {
    Route,
    NavLink,
    Switch
} from "react-router-dom";
import {ReactComponent as Logo} from "./assets/logo.svg";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import Login from "./components/Login";
import "./App.css";
import Profile from "./components/Profile";
import HomePageBeers from "./components/HomePageBeers";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import Wishlist from "./components/Wishlist";
import Link from "react-router-dom/es/Link";


class App extends Component {

    state = {
        collapseID: "",
        username: null,
        role: "ANONYMOUS",
        profile: false,
        beerName: null
    };


    updateUsername = (value) => {
        this.setState({username: value});
    };

    updateRole = (value) => {
        this.setState({role: value});
    };


    logout = async event => {
        this.setState({username: null, role: ""});
        sessionStorage.clear();
    };

    profile = event => {
        this.setState({profile: true})
    };


    // toggleCollapse = collapseID => () =>
    //     this.setState(prevState => ({
    //         collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    //     }));
    //
    // closeCollapse = collapseID => () =>
    //     this.state.collapseID === collapseID && this.setState({collapseID: ""});


    render() {

        const homebeerlist =
            this.state.username == null ? (
                <MDBNavbarNav style={{marginRight: "4rem"}}>
                    <NavLink activeClassName="active" to="/beers">
                        Beers
                    </NavLink>
                </MDBNavbarNav>
            ) : (

                <div/>
            );

        const logoutlink =
            this.state.username == null ? (
                <MDBNavbarNav style={{marginRight: "4rem"}}>
                    <NavLink exact activeClassName="active" to="/login">
                        Login
                    </NavLink>
                </MDBNavbarNav>
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
                    <NavLink exact activeClassName="active" to="/beerslogged">
                        Beers!
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


        const LoginContainer = () => (
            <MDBNavbarNav style={{marginRight: "4rem"}}>
                <Route exact path="/" component={HomePage}/>
                <Route path="/users" component={AdminPage}/>
                <Route exact path="/beers" component={HomePageBeers}/>
                <Route path="/beerslogged" render={() => <Wishlist username={this.state.username}/>}/>
                <Route path="/me" component={() => <Profile/>}/>
                <Route path="/login" render={() => <Login updateRole={this.updateRole.bind(this)}
                                                          updateUsername={this.updateUsername.bind(this)}
                                                          profile={this.profile.bind(this)}/>}/>

            </MDBNavbarNav>
        );

        const DefaultContainer = () => (
            <MDBNavbarNav style={{marginRight: "4rem"}}>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/beers" render={props => <HomePageBeers {...props} username={this.state.username}/>}/>
                    <Route path="/me" component={() => <Profile/>}/>

            </MDBNavbarNav>
        );


        return (
            <BrowserRouter>
                <div className="flyout">


 {/*Navbar                   */}
                    <MDBNavbar className="test"
                         transparent="true"
                        color="elegant-color"
                        dark
                        expand="md"
                        fixed="top"
                        scrolling
                    >

 {/*Navbar header                       */}
                        <MDBNavbarBrand href="/">
                            Beer Tag {"          "}
                            <Logo style={{height: "2.5rem", width: "2.5rem"}}/>
                            Welcome {this.state.username}
                        </MDBNavbarBrand>


  {/*Navbar buttons                     */}
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
                                <MDBNavbarNav >{homebeerlist}</MDBNavbarNav>

                                <MDBNavbarNav >{users}</MDBNavbarNav>
                                <MDBNavbarNav >{profile}</MDBNavbarNav>
                                <MDBNavbarNav >{logoutlink}</MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbarNav>


                    </MDBNavbar>


                    <main style={{marginTop: "10rem"}}>

                        <Switch>
                            <Route  component={LoginContainer}/>
                            <Route component={DefaultContainer}/>
                        </Switch>
                    </main>


 {/*Footer                   */}
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
