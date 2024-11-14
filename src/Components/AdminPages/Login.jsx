import React,{useState} from "react";
import Navbar from "../../Nabar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const[eyeToggle,setEyeToggle] = useState(true)

    const [userDetails,setUserDetails] = useState({
        Email:'',
        password:''
    })
    const navigate = useNavigate()
    const loginFunction = (e) => {
        e.preventDefault(); 
    
        const data = {
          email: userDetails.Email,
          password: userDetails.password
        };
    
        console.log(data);
        axios
          .post("http://64.227.167.55:8080/A2G/admin-login/", data)
          .then((res) => {
              if (res.status == 200) {
                console.log(res.status);
                localStorage.setItem("AdminAccessToken",res.data.access)
            localStorage.setItem("AdminRefreshToken",res.data.refresh)
            navigate('/cleintdetails')
            }
            
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
    
  return (
    <>
      <Navbar />
      <div class="container2">
        <div class="wrapper2">
        <form >
            <h1>Login</h1>
            <div class="input-box">
              <input type="text" placeholder="Username" required onChange={(e)=>setUserDetails((pre)=>({
                ...pre,
                Email:e.target.value
              }))} />
             
            </div>
            <dive class="input-box">
              <input  type={eyeToggle?'password':'text'} placeholder="Password" required  onChange={(e)=>setUserDetails((pre)=>({
                ...pre,
                password:e.target.value
              }))}/>
              <i class="bx bxs-lock-alt"></i>
              {
                          eyeToggle?
                          
                          <i class="fa-regular fa-eye position-absolute" style={{cursor:'pointer'}} onClick={()=>setEyeToggle(!eyeToggle)}></i>
                          :<i class="fa-regular fa-eye-slash position-absolute" style={{cursor:'pointer'}} onClick={()=>setEyeToggle(!eyeToggle)}></i>
                        }
            </dive>
            <dive class="remember-forget"></dive>
            <br />
            <button onClick={loginFunction} class="btn">
              Login
            </button>
           
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
