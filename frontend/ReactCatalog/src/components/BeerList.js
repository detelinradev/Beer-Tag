import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { SERVER_URL } from "../constants.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { MDBBtn, MDBIcon, MDBFormInline } from "mdbreact";
import Snackbar from "@material-ui/core/Snackbar";

import NewPlayList from "./NewBeer";
import Beer from "./Beer";
import Link from "react-router-dom/es/Link";

class BeerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      role: this.props.role,
      beers: [],
      beer: [],
      info: false,
      open: false,
      message: "",
      duration: 0
    };
  }

  componentDidMount() {
    this.fetchBeers();
  }

  // Fetch all products
  fetchBeers =  () => {

     fetch(SERVER_URL + "beers", {
       method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          beers: responseData._embedded.beers
        });
      })
      .catch(err => console.error(err));
  };

  // fetchBeer =  () => {
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

  getBeer = link => {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "GET",
    })
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            beer: responseData._embedded.beers,
            info: true
          });
        })
        .catch(err => console.error(err));
  };

  // Add new product from child
  addProduct(beer) {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/beers", {
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
        accessor: "alcoholByVolume"
      },
      {
        Header: "Style",
        accessor: "beerStyle",
        Cell: this.renderEditable
      },


      {
        Header: "Info",
        sortable: false,
        filterable: false,
        accessor: "_links.self.href",
        id: 'links',
        Cell: ({ row }) => (<Link to={{ pathname: `/beers/{id}` }}>More info</Link>)
      },
      {
        Header: "Delete",
        id: "delbutton",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value, row }) =>
          this.props.role !== "ANONYMOUS" ? (
            <MDBBtn
              color="danger"
              size="sm"
              onClick={() => {
                this.getBeer(value);
              }}
            >
              (<Link to={{ pathname: `/beers/{id}` }}>More info</Link>)
            </MDBBtn>
          ) : (
            <div />
          )
      }
    ];

    const NewPlayListlink =
      this.props.role === "ANONYMOUS" ? (
        <div />
      ) : (
        <NewPlayList
          className="align-middle"
          username={this.props.username}
          addProduct={this.addProduct}
          fetchProducts={this.fetchBeers}
        />
      );


    return (
      <div className="App">
        <MDBFormInline>{NewPlayListlink}</MDBFormInline>

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
    );
  }
}

export default BeerList;
