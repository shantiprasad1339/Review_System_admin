import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../../Nabar/Navbar';
import DataTable from "react-data-table-component";


function HistoryPage() {
    const [historyData, setHistoryData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalReviewContent, setModalReviewContent] = useState("");
    
  useEffect(() => {
    const fetchHistoryData = async () => {
      const accessToken = localStorage.getItem("AdminAccessToken");  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
     
      try {
        const response = await axios.get(
          "http://64.227.167.55:8080/A2G/get-history/?page=1&page_size=100",
          { headers }
        );
        // console.log(response);
        setHistoryData(response.data.data);  
      } catch (err) {
        
        if (err.response?.data?.code === "token_not_valid") {
          alert("Please Login Again");
          navigate("/");
        }
      
    }
    };

    fetchHistoryData();
  }, []);
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
    
  };
  const handleVerify = async (userId, action) => {
   
  
    try {
      const response = await axios.get(
        `http://64.227.167.55:8080/A2G/Verification-update`,
        {
          params: { user_id: userId, verification: action },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminAccessToken")}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      
     alert( err.response.data.msg);
    }
  };
  
  
const columns = [
	{
	  name: 'User ID',
	  selector: row => row.user_id,
	},
	// {
	//   name: 'IP Address',
	//   selector: row => row.ip_address,
	// },
	// {
	//   name: 'Client ID',
	//   selector: row => row.client_detail_id,
	// },
	{
	  name: 'Type',
	  selector: row => row.review_type,
	},
	{
	  name: 'Date',
	  selector: row => row.review_date,
	  format: row => new Date(row.review_date).toLocaleString() // Format date for better readability
	},
	{
	  name: 'Location',
	  selector: row => row.location,
	},
  
  {
    name: 'Review',
    cell: row => (
      <button className="btn btn-primary " onClick={() => openReviewModal(row.review)}>
      View
      </button>
    ),
  },
	{
	  name: 'Link',
	  selector: row => (
		<a href={`https://${row.link}`} target="_blank" rel="noopener noreferrer">
		  View Image
		</a>
	  ),
	},
	{
		name: 'Status',
		selector: row => row.verify_status,
	  },
    {
      name: 'Verification',
      cell: row => (
        <div>
          <select onChange={(e) => handleVerify(row.id, e.target.value)} className='form-select'>
            <option value="">Select</option>
            <option value="Done">Done</option>
            <option value="reject">Reject</option>
          </select>
        </div>
      ),
    },
  ];
  const openReviewModal = (review) => {
    setModalReviewContent(review);
    setIsModalOpen(true);
  };
  
  return (
    <>
     {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>{modalReviewContent}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Navbar />
      <section className='main_area'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="table_area">
                <DataTable
                  title="History"
                  columns={columns}
                  data={historyData}
                  defaultSortFieldId={1}
                  pagination
                  selectableRows
                  selectableRowsSingle
                  onSelectedRowsChange={handleSelectedRowsChange}
                 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HistoryPage;
