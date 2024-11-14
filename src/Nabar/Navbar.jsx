import React,{useState,useEffect} from 'react'
import Logo from '../Components/Images/favicon.png'
import { Link, useNavigate } from 'react-router-dom'
function Navbar() {
    const [loginStatus,setLoginStatus] = useState("LogIn")
    useEffect(()=>{
        const refreshToken = localStorage.getItem("AdminRefreshToken")
        if(refreshToken){
            
            setLoginStatus("LogOut")
        }
    },[])
    const navigate = useNavigate()
    function logoutFn(){
        
        if(loginStatus == "LogIn"){
            navigate('/')
        }else{
            localStorage.clear();
            navigate('/')
        }
    }
  return (
   <>
   <nav>
    <div className="container">
        <div className="row">
            <div className="col-3">
                <div className="nav_logo">
                    <img src={Logo} alt="" />
                </div>
            </div>
            <div className="col-3 ms-auto text-end d-flex justify-content-end align-items-center">
                <div className="log_btn">
                   <p onClick={logoutFn}>{loginStatus}</p>
                </div>
            </div>
        </div>
    </div>
   </nav>
   </>
  )
}

export default Navbar
