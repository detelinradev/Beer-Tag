import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { SERVER_URL } from "../constants.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import {MDBBtn, MDBIcon, MDBFormInline, MDBNavbarNav, MDBContainer, MDBJumbotron} from "mdbreact";
import Snackbar from "@material-ui/core/Snackbar";

import NewPlayList from "./NewBeer";
import Beer from "./Beer";
import Link from "react-router-dom/es/Link";
import {NavLink} from "react-router-dom";

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
        // this.getBeer(`http://localhost:8080/api/beers/search/findBeerByName?name=${this.state.name}`);
    }

    // Fetch all products
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

    // fetchBeer =  (value) => {
    //
    //    fetch(value, {
    //      method: 'GET',
    //   })
    //     .then(response => response.json())
    //     .then(responseData => {
    //       this.setState({
    //         beers: responseData._embedded.beers
    //       });
    //     })
    //     .catch(err => console.error(err));
    // };

    // customFilter = (filter, row) => {
    //   const id = filter.pivotId || filter.id;
    //   if (row[id] !== null && typeof row[id] === "string") {
    //     return row[id] !== undefined
    //       ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
    //       : true;
    //   }
    // };

    confirmDelete = link => {
        confirmAlert({
            message: "Are you sure to delete?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => this.onDelClick(link)
                },
                {
                    label: "No"
                }
            ]
        });
    };

    // Delete product
    onDelClick = link => {
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method: "DELETE",
            headers: { Authorization: token }
        })
            .then(res => {
                this.setState({ open: true, message: "Deleted" });
                this.fetchBeers();
            })
            .catch(err => {
                this.setState({ open: true, message: "Error when deleting" });
                console.error(err);
            });
    };

    getBeer = (link) => {
        console.log(link);
        const token = sessionStorage.getItem("jwt");
        // fetch('http://localhost:8080/api/beers/search/findByName?name=' + link, {
        fetch(`${link}`, {
                method: "GET",
                headers: { Authorization: token }
            }
        )
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    beer: responseData._embedded.beers
                    // name: responseData.name,
                    // breweryName: responseData.breweryName,
                    // description: responseData.description,
                    // alcoholByVolume: responseData.alcoholByVolume,
                    // beerStyle: responseData.beerStyle,
                    // image: responseData._links.image.href
                });
            })
            .catch(err => console.error(err));
    };

    // Add new product from child
    addProduct(beer) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + "beers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(beer)
        })
            .then(res => this.fetchBeers())
            .catch(err => console.error(err));
    }

    // Update Product
    updateProduct(beer, link) {
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(beer)
        })
            .then(res => this.setState({ open: true, message: "Changes saved" }))
            .catch(err =>
                this.setState({ open: true, message: "Error when saving" })
            );
    }

    renderEditable = cellInfo => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.beers];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ beers: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.beers[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    };

    handleClose = (event, reason) => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };



    render() {
        const columns = [
            {
                Header: "Name",
                accessor: "name",
                Cell: this.renderEditable
            },
            {
                Header: "Brewery",
                accessor: "breweryName",
                Cell: this.renderEditable
            },
            {
                Header: "Description",
                accessor: "description",
                Cell: this.renderEditable
            },
            {
                Header: " Alcohol by volume",
                accessor: "alcoholByVolume",
                Cell: this.renderEditable

            },
            {
                Header: "Style",
                accessor: "beerStyle",
                Cell: this.renderEditable
            },
            {
                Header: "Creator",
                accessor: "creator"
            },
        ];

        const NewBeer =
            this.props.role === "ANONYMOUS" ? (
                <div />
            ) : (
                <NewPlayList
                    className="align-middle"
                    username={this.state.username}
                    addProduct={this.addProduct}
                    fetchBeers={this.fetchBeers}
                />
            );

        const moreinfo =
            this.props.role === "ANONYMOUS" ? (
                <div />
            ) : (
                <Beer
                    className="align-middle"
                    username={this.state.username}
                    name={this.state.name}
                    breweryName={this.state.breweryName}
                    description={this.state.description}
                    alcoholByVolume={this.state.alcoholByVolume}
                    beerStyle={this.state.beerStyle}
                    image={this.state.image}
                    getBeer={this.getBeer}
                />
            );


        return (
            <MDBContainer className="mt-5">
                <MDBJumbotron>
                    <h2>
                        <MDBIcon icon="window-restore" className="grey-text mr-2" />
                        BEERS
                    </h2>
            <div className="App">
                <MDBFormInline>{NewBeer}</MDBFormInline>

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
                    defaultSorted={[
                        {
                            id: "avgrank",
                            desc: true
                        }
                    ]}
                    showPaginationBottom
                />
                <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={1500}
                    message={this.state.message}
                />
            </div>
                </MDBJumbotron>
            </MDBContainer>
        );
    }
}

export default HomePageBeers;

