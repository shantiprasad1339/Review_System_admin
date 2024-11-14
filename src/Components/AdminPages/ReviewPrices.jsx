import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Nabar/Navbar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";

const columns = [
  {
    name: "Review Type",
    selector: (row) => row.reviewer_type,
  },
  {
    name: "Price",
    selector: (row) => row.price,
  },
];

function ReviewPrices() {
  const [reviewData, setReviewData] = useState([]);
  const [reviewerType, setReviewerType] = useState("");
  const [price, setPrice] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // const accessToken = localStorage.getItem("AdminAccessToken");
  const accessToken = localStorage.getItem("AdminAccessToken");
  useEffect(() => {
    const fetchReviewData = async () => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          "http://64.227.167.55:8080/A2G/get_review_data/",
          { headers }
        );
        setReviewData(response.data.data);
      } catch (err) {
        
        if (err.response?.data?.code === "token_not_valid") {
          alert("Please Login Again");
          navigate("/");
        }
      
    }
    };

    fetchReviewData();
  }, []);

  const handleAddReview = async () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const requestData = {
      reviewer_type: reviewerType,
      price: parseFloat(price),
    };
    console.log(requestData);

    try {
      const response = await axios.post(
        "http://64.227.167.55:8080/A2G/add_review_data/",
        requestData,
        { headers }
      );
      console.log(response);
      // setReviewData([...reviewData, response.data.data]);
      setReviewerType("");
      setPrice("");
    } catch (error) {
      console.error("Error adding review data:", error);
    }
  };
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  console.log(selectedRows[0]);
  const handleDelete = () => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const confirmDelete = window.confirm(
        `Are you sure you want to delete Review Type "${selectedRows[0].reviewer_type}"?`
      );
  
      if (!confirmDelete) return;
      
      axios
        .delete(
          `http://64.227.167.55:8080/A2G/delete-review/${selectedRows[0].id}/`,
          { headers }
        )
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting row:", error);
        });
     
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
                <Link to="" className="text-decoration-none d-flex gap-4">
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
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    className="btn btn-success d-flex ms-auto"
                  >
                    Add Review Price
                  </button>
                </Link>
                <DataTable
                  title="Users"
                  columns={columns}
                  data={reviewData}
                  defaultSortFieldId={1}
                  sortIcon={<i className="fa-regular fa-eye"></i>}
                  pagination
                  selectableRows
                  selectableRowsSingle
                  onSelectedRowsChange={handleSelectedRowsChange}
                  progressPending={!reviewData.length}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Review Price
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xl-6 mb-4">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Type
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={reviewerType}
                      onChange={(e) => setReviewerType(e.target.value)}
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </div>
                <div className="col-xl-6 mb-4">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Price
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddReview}
              >
                Save Price
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewPrices;
