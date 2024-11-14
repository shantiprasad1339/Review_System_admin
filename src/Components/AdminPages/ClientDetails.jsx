import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Nabar/Navbar";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const columns = [
  {
    name: "Client ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Client Name",
    selector: (row) => row.client_name,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category_name,
    sortable: true,
  },
  {
    name: "Location",
    selector: (row) => row.location,
    sortable: true,
  },
  {
    name: "Product Name",
    selector: (row) => row.product_name,
    sortable: true,
  },
  {
    name: "Mobile",
    selector: (row) => row.mobile,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    wrap: true,
  },
  {
    name: "Review Link",
    selector: (row) => (
      <a href={row.review_link} target="_blank" rel="noopener noreferrer">
        Link
      </a>
    ),
  },
];

function ClientDetails() {
  const [clientData, setClientData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("AdminAccessToken");
  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    axios
      .get("http://64.227.167.55:8080/A2G/get_clients_data/?page=1&page_size=1000", { headers })
      .then((res) => {
        // console.log(res);

        setClientData(res.data.data);
      })
      .catch((err) => {
        if (err.response?.data?.code === "token_not_valid") {
          alert("Please Login Again");
          navigate("/");
        }
      });
  }, [navigate]);
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete client "${selectedRows[0].client_name}"?`
    );

    if (!confirmDelete) return;
    if (selectedRows) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.delete(
          `http://64.227.167.55:8080/A2G/delete-client/${selectedRows[0].id}/`,
          { headers }
        );
        console.log("Delete response:", response);
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };
  return (
    <>
      <Navbar />
      <section className="main_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="table_area">
                <Link
                  
                  className="text-decoration-none d-flex gap-4"
                >
                  {selectedRows.length > 0 ? (
                    <button
                      className="btn btn-danger d-flex mr-auto"
                      onClick={handleDelete}
                      disabled={!selectedRows}
                    >
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  ) : (
                    ""
                  )}
                  <button className="btn btn-success d-flex ms-auto">
                    <Link to="/addclients" className="text-decoration-none text-light">
                    Add clients
                    </Link>
                  
                  </button>
                </Link>

                <DataTable
                  title="Clients"
                  columns={columns}
                  data={clientData}
                  defaultSortFieldId={1}
                  sortIcon={""}
                  pagination
                  selectableRows
                  selectableRowsSingle
                  onSelectedRowsChange={handleSelectedRowsChange}
                  progressPending={!clientData.length}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientDetails;
