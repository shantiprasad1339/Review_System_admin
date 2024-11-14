import React, { useState } from "react";
import Navbar from "../../Nabar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Addclientform() {
  const [formData, setFormData] = useState({
    client_name: "",
    mobile: "",
    category_name: "",
    field_name: "",
    stream_name: "",
    product_name: "",
    location: "",
    review_link: "",
    total_reviews: "",
    cost: "",
    review_limit: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("AdminAccessToken");
    const data = new FormData();

    
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (file) {
      data.append("image", file);
    }

    axios.post("http://64.227.167.55:8080/A2G/add-clientdetails/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        alert("Client details added successfully!");
        navigate("/cleintdetails"); 
      })
      .catch((error) => {
        console.error(error);
        alert("Error adding client details. Please try again.");
      });
  };
console.log(formData);

  return (
    <>
      <Navbar />
      <section className="main_area">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Sidebar />
            </div>
            <div className="col-md-8">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-xl-6 mb-4">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Category</label>
                  <select
                    className="form-control"
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Restaurant">Restaurant</option>
                  </select>
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Field</label>
                  <input
                    type="text"
                    className="form-control"
                    name="field_name"
                    value={formData.field_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Stream</label>
                  <input
                    type="text"
                    className="form-control"
                    name="stream_name"
                    value={formData.stream_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Product</label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Review Link</label>
                  <input
                    type="text"
                    className="form-control"
                    name="review_link"
                    value={formData.review_link}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Total Reviews</label>
                  <input
                    type="text"
                    className="form-control"
                    name="total_reviews"
                    value={formData.total_reviews}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Cost</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Review Limit</label>
                  <input
                    type="text"
                    className="form-control"
                    name="review_limit"
                    value={formData.review_limit}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-xl-6 mb-4">
                  <label>Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-xl-12 d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Addclientform;
