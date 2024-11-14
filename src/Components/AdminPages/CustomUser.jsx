import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../../Nabar/Navbar';
import DataTable from "react-data-table-component";

const columns = [
  {
    name: 'User ID',
    selector: row => row.id,
  },
  {
    name: 'User Name',
    selector: row => row.username,
  },
  {
    name: 'Mobile',
    selector: row => row.mobile,
  },
  {
    name: 'Email',
    selector: row => row.email,
  },
  {
    name: 'IP Address',
    selector: row => row.ip_address,
  },
  {
	name: 'Last Login',
	selector: row => row.last_login,
	format: row => {
	  const date = new Date(row.last_login);
	  const day = String(date.getDate()).padStart(2, '0');
	  const month = String(date.getMonth() + 1).padStart(2, '0');
	  const year = String(date.getFullYear()).slice(-2); 
	  const hours = String(date.getHours()).padStart(2, '0');
	  const minutes = String(date.getMinutes()).padStart(2, '0');
	  return `${day}/${month}/${year}, ${hours}:${minutes}`;
	},
  },
  {
	name: 'Is Staff',
	selector: row => row.is_staff,
	format: row => row.is_staff ? 'Yes' : 'No', 
  },
  
 
];

function CustomUser() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("AdminAccessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.get("http://64.227.167.55:8080/A2G/users-deials", { headers });
		console.log(response);
		
        setUserData(response.data.data);
      } catch (err) {
        
          if (err.response?.data?.code === "token_not_valid") {
            alert("Please Login Again");
            navigate("/");
          }
        
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
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
                  title="Users"
                  columns={columns}
                  data={userData}
                  defaultSortFieldId={1}
                  sortIcon={<i className="fa-regular fa-eye" />}
                  pagination
                //   selectableRows
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomUser;
