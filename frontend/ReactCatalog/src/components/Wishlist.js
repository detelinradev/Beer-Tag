import React, {Component} from "react";
import "react-table/react-table.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Team.css";
import {SERVER_URL} from "../constants";
import {MDBCollapse, MDBNavbarNav} from "mdbreact";
import {NavLink} from "react-router-dom";

class Wishlist extends Component {

    render() {
        return (
            <div>
                <MDBNavbarNav style={{marginRight: "4rem"}}>
                    <NavLink activeClassName="active" to="/login">
                        Login
                    </NavLink>
                </MDBNavbarNav>
            </div>
        );
    }
}

export default Wishlist;
