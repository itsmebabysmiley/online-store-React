import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios'
import Navbar from './Navbar'
import { Redirect, useLocation } from "react-router-dom";
function Userresults() {
    //authorized user is login or not.
    const [statusLogin, setstatusLogin] = useState(true);
    const [userList, setuserList] = useState([]);
    const [newRole, setnewRole] = useState("");
    const search = useLocation().search;
    useEffect(() => {
        const token = localStorage.getItem("token");
        //authorized user is login or not.
        const asyncCallback = async () =>{
            const data = await Axios.post("http://localhost:3001/isUserAuth",{token : token})
            setstatusLogin(data.data.status);
        }
        asyncCallback()
        //if not login redirect to login page.
        if(!statusLogin){
            return <Redirect to={'/'}/>
        }

        if(statusLogin == true){
          const name = new URLSearchParams(search).get('search');
          const option = new URLSearchParams(search).get('option');
          let apiURL = '';
          if(name === "all"){
            apiURL = "http://localhost:3001/searchuserall";
          }else{
            apiURL = `http://localhost:3001/searchuser/${name}/${option}`;
          }
          console.log(apiURL);
          if (apiURL) {
              Axios.get(apiURL).then((res) => {
                  //console.log(res.data.data);
                  setuserList(res.data.data);
              });
          }
        }
        
        
    },[]);
    //not login then redirect to login page.
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
          <div className="container" style={{
            padding: "2rem",
            borderRadius: "40px",
            backgroundColor: "white",
          }}>
            <table className="table table-light">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Age</th>
                  <th scope="col">Address</th>
                  <th scope="col">Role</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
            {userList.map((val, key) => {
              return (
                <tbody>
                  <tr>
                    <td>{val.username}</td>
                    <td>{val.ufname}</td>
                    <td>{val.ulname}</td>
                    <td>{val.email}</td>
                    <td>{val.age}</td>
                    <td>{val.address}</td>
                    <td>
                      {val.role === "admin"? <button className="btn btn-primary btn-sm" disabled>Admin</button>:<button className="btn btn-secondary btn-sm" disabled>User</button>}
                    </td>
                    <td>
                      <div className="d-flex">
                        <select  className="form-select form-select-sm"
                          onChange={(e) => {
                            setnewRole(e.target.value);
                          }}
                          style={{
                            margin: "0px 10px 0px 0px",
                            padding: "5px",
                            borderRadius: "20px",
                            width:"100px"
                          }}
                        >
                        <option value="" disabled selected>-- role --</option>
                          <option value="admin">admin</option>
                          <option value="user">user</option>
                        </select>
                        <button className="btn btn-sm"
                          onClick={() => {
                            updateRole(val.username);
                          }}
                        >
                          update
                        </button>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteUser(val.username);
                        }}
                        style={{
                          backgroundColor: "rgb(217, 83, 79)"
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
            </table>
          </div>
        );
      };

    return (
        <div>
            <Navbar/>
            <h1 style={{ textAlign: "center" }}>This is user results</h1>
            <div className="container">
            {results()}
            </div>
        </div>
    )
}

export default Userresults
