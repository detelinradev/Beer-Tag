import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { SERVER_URL } from "../constants.js";
import "react-confirm-alert/src/react-confirm-alert.css";

import { MDBIcon, MDBFormInline, MDBContainer, MDBJumbotron} from "mdbreact";

class HomePageBeers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            role: this.props.role
        };
    }

    componentDidMount() {
        this.fetchBeers();
    }

    fetchBeers = async () => {
        this.setState({
            beers: []
        });

        await fetch(SERVER_URL + "beers", {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    beers: responseData._embedded.beers,
                });
            })
            .catch(err => console.error(err));
    };

    render() {
        const columns = [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Brewery",
                accessor: "breweryName",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: " Alcohol by volume",
                accessor: "alcoholByVolume",

            },
            {
                Header: "Style",
                accessor: "beerStyle",
            },
            {
                Header: "Creator",
                accessor: "creator"
            },
        ];

        return (
            <MDBContainer className="mt-5">
                <MDBJumbotron>
                    <h2>
                        <MDBIcon icon="window-restore" className="grey-text mr-2" />
                        BEERS
                    </h2>
            <div className="App">

                <ReactTable
                    className="align-middle react-table"
                    data={this.state.beers}
                    columns={columns}
                    filterable={true}
                    defaultFilterMethod={this.customFilter}
                    pageSize={5}
                    noDataText={
                        <div className="spinner-border fast text-info" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    showPaginationBottom
                />
            </div>
                </MDBJumbotron>
            </MDBContainer>
        );
    }
}

export default HomePageBeers;

