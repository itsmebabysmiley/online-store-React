import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
const LoginAdmin = () => {
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
    console.log(user_info);

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
  return (
    <div className="container">
      <h1>Admin login</h1>
      <div className="Login">
        <form onSubmit={postLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
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
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="12345678"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
      <hr />
      <div className="resultslogin">
        <p>{message}</p>
        {(status === false) ? 
          <Redirect to={'/usermanage'}/>: <p></p>}
      </div>
    </div>
  );
};

export default LoginAdmin;
