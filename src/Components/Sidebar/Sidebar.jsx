import React from "react";
import logo from "../Images/favicon.png";
import { Link ,useLocation} from "react-router-dom";
function Sidebar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    function logOutFunction(){
      localStorage.clear();
      navigate('/')
    }
  return (
    <>
      <aside>
        <div className="siderbar_inner ">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <ul>
            <li>
                <Link className={isActive('/cleintdetails') ? 'active' : ''} to='/cleintdetails'> Client Details</Link>
            </li>
            <li>
                <Link className={isActive('/customuser') ? 'active' : ''} to='/customuser'> Custom User</Link>
            </li>
            <li>
                <Link className={isActive('/reviewprices') ? 'active' : ''} to='/reviewprices'> Review Prices</Link>
            </li>
            <li>
                <Link className={isActive('/userhistory') ? 'active' : ''} to='/userhistory'> User History</Link>
            </li>
            <li onClick={logOutFunction}>
                <Link className="Logout_hover" > LogOut</Link>
            </li>
          
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
