import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {SERVER_URL} from "../constants.js";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import {MDBBtn, MDBIcon, MDBFormInline, MDBNavbarNav} from "mdbreact";
import Snackbar from "@material-ui/core/Snackbar";

import NewPlayList from "./NewBeer";
import Beer from "./Beer";
import Link from "react-router-dom/es/Link";
import {NavLink} from "react-router-dom";

class BeerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            role: this.props.role,
            image: "data:image/jpeg;base64,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",
            beers: [],
            beer: [],
            open: false,
            message: "",
            duration: 0
        };
    }

    componentDidMount() {
        this.fetchBeers();
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


    getBeer = (link) => {
        console.log(link);
        const token = sessionStorage.getItem("jwt");
        fetch(`${link}`, {
                method: "GET",
                headers: {Authorization: token}
            }
        )
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    beer: responseData._embedded.beers
                });
            })
            .catch(err => console.error(err));
    };

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


    updatePlaylist(user, link) {
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(user)
        })
            .then(res => this.setState({open: true, message: "Changes saved"}))
            .catch(err =>
                this.setState({open: true, message: "Error when saving"})
            );
    }

    renderEditable = cellInfo => {
        return (
            <div
                style={{backgroundColor: "#fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.beers];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({beers: data});
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.beers[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    };

    handleClose = (event, reason) => {
        this.setState({open: false});
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
                Header: "Country",
                accessor: "country",
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
            }, {
                Header: "Deleted",
                accessor: "deleted",
                Cell: this.renderEditable
            },
            {
                Header: "Creator",
                accessor: "creator"
            },
            {
                Header: "Image",
                accessor: "_links.image.href",
                sortable: false,
                filterable: false,
                width: 78,
                Cell: ({value}) => (
                    <div>
                        <img alt="" src={value} width="60" height="60"/>
                    </div>
                )
            },
            {
                Header: "Save",
                id: "savebutton",
                sortable: false,
                filterable: false,
                width: 80,
                accessor: "_links.self.href",
                Cell: ({value, row}) => (
                    <MDBBtn
                        color="primary"
                        size="sm"
                        onClick={() => {
                            this.updatePlaylist(row, value);
                        }}
                    >
                        <MDBIcon icon="marker" size="2x" className="white-text"/>
                    </MDBBtn>
                )
            }, {
                Header: "Info",
                sortable: false,
                filterable: false,
                accessor: "name",
                id: 'links',
                Cell: ({link}) => (
                    <div>
                        {moreinfo}
                    </div>
                )
            }
        ];

        const NewBeer =
            this.props.role === "ANONYMOUS" ? (
                <div/>
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
                <div/>
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
            <div className="App">
                <MDBFormInline>{NewBeer}</MDBFormInline>

                <ReactTable
                    auto
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
        );
    }
}

export default BeerList;
