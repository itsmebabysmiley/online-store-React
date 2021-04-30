import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios'
import Navbar from './Navbar'
import { Redirect } from "react-router-dom";
function Userresults() {
    //authorized user is login or not.
    const [statusLogin, setstatusLogin] = useState(false);
    const [userList, setuserList] = useState([]);
    const [newRole, setnewRole] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log(token);
        Axios.post("http://localhost:3001/isUserAuth",{token : token}).then((res) => {
        //   console.log(res.data.status);
          if(res.data.status === false){
            localStorage.removeItem('token');
            setstatusLogin(true)
          }  
        });
        var apiURL = localStorage.getItem("userAPI");
        localStorage.removeItem("userAPI");
        console.log(apiURL);
        if (apiURL) {
            Axios.get(apiURL).then((res) => {
                console.log(res.data.data);
                setuserList(res.data.data);
            });
        }
        
    });
    //not login then redirect to login page.
    if(statusLogin){
        return <Redirect to={'/'}/>
    }
    const updateRole = (uname) => {
        console.log(uname, newRole);
        Axios.put("http://localhost:3001/updateuser", {
          username: uname,
          role: newRole,
        }).then((res) => {
          console.log(res.data.msg);
          alert(res.data.msg)
          setuserList(
            userList.map((val, key) => {
              return val.username == uname
                ? {
                    ufname: val.ufname,
                    ulname: val.ulname,
                    username: val.username,
                    password: val.password,
                    email: val.email,
                    address: val.address,
                    age: val.age,
                    role: newRole,
                  }
                : val;
            })
          );
        });
      };
      const deleteUser = (username) => {
        // console.log(username);
        Axios.delete("http://localhost:3001/deleteuser", {
          data: { username: username },
        }).then((res) => {
          // console.log("ok");
          alert(res.data.msg)
          setuserList(
            userList.filter((val) => {
              return val.username != username;
            })
          );
        });
      };

    const results = () => {
        return (
          <div>
            {userList.map((val, key) => {
              return (
                <div>
                  <div
                    style={{ border: "1px solid", margin: "10px", padding: "10px" }}
                  >
                    <p>Name: {val.ufname}</p>
                    <p>Lastname: {val.ulname}</p>
                    <p>Username: {val.username}</p>
                    <p>email: {val.email}</p>
                    <p>age: {val.age}</p>
                    <p>address: {val.address}</p>
                    <p>role: {val.role}</p>
                    <select
                      onChange={(e) => {
                        setnewRole(e.target.value);
                      }}
                    >
                     <option value="" disabled selected>-- role --</option>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
                    <button
                      onClick={() => {
                        updateRole(val.username);
                      }}
                    >
                      update
                    </button>
                    <br />
                    <button
                      onClick={() => {
                        deleteUser(val.username);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      };

    return (
        <div>
            <Navbar/>
            <h1 style={{ textAlign: "center" }}>This is user results</h1>
            {results()}
        </div>
    )
}

export default Userresults
