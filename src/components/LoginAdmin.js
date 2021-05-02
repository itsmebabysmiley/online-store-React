import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Banner from "../img/Banner1.png";
function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(true);

  const postLogin = (e) => {
    e.preventDefault();
    let user_info = {
      username: username,
      password: password,
    };
    // console.log(user_info);

    Axios.post("http://localhost:3001/postlogin", user_info).then((res) => {
      setMessage(res.data.data.msg);
      localStorage.removeItem("token");
      if(res.data.data.err == false && res.data.data.role == 'admin'){
        setStatus(res.data.data.err);
        localStorage.setItem("token" , res.data.data.token);
      }else if(res.data.data.err == false && res.data.data.role == 'user'){
        setStatus(true);
        setMessage("You are not admin")
      }
    });
  };
  const errormsg =()=>{
    console.log(status)
    console.log(message)
    if(message !== ''){
      return(
        <div class="alert alert-danger" role="alert" style={{marginTop:"1rem",padding:"0.5rem 1rem"}}>
          {message}
        </div>
      )
    }

    
    
  }
  return (
    <div className="container-fluid">
      <div style={{backgroundColor:"#314e52", padding:"50px 50px 50px 50px"}}>
          <h1 style={{textAlign:"center", color:"white"}}>Admin login</h1>
      </div>
      <div>
        <div className="container" style={{margin:"50px"}}>
          <div className="row row-cols-2">
            <div class="cardAdmin col">
              <div className="Login card cardadmin">
                <form onSubmit={postLogin}>
                  <div className="mb-3">
                    <h5 htmlFor="username" className="form-label">
                      Username:
                    </h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <h5 className="form-label">Password:</h5>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="12345678"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </div>
                  <button style={{padding:"5px 15px 5px 15px"}} className="btnadmin btn">Sign In</button>
                </form>
                {(status === false) ? 
                  <Redirect to={'/home'}/>: errormsg()}
              </div>
            </div>
            <div className="ImageIthink">
              <img  src = "https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/Banner1.png?raw=true" style={{width:"558px",height:"220px"}} />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default LoginAdmin;
