import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../App.css";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
function Userman() {
  const [ufname, setufname] = useState("");
  const [ulname, setulname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState(0);
  const [address, setaddress] = useState("none");
  const [role, setrole] = useState("user");
  const [newRole, setnewRole] = useState("");
  const [userList, setuserList] = useState([]);
  const [statusLogin, setstatusLogin] = useState(false);
  const [searchstatus, setSearchstatus] = useState(false);
  const [searchURL, setSearchURL] = useState('')
  useEffect(async () => {
    const token = localStorage.getItem("token");
    //authorized user is login or not.
    await Axios.post("http://localhost:3001/isUserAuth",{token : token}).then((res) => {
      if(res.data.status === false){
        localStorage.removeItem('token');
        setstatusLogin(true)
      }
    });
  },[]);
  //not login then redirect to login page.
  if(statusLogin){
      return <Redirect to={'/'}/>
  }

  const clear = (username) => {
    setuserList(
      userList.filter((val) => {
        return val.username != username;
      })
    );
  };
  const getUser = () => {
    // var temp = "http://localhost:3001/searchuserall";
    // localStorage.setItem("userAPI",temp);
    let query = `search=all&option=none`
    setSearchURL(query)
    setSearchstatus(true);
  };
  const getuserbyusername = (type) => {
    let option = "";
    let search = "";
    switch (type) {
      case 1:
        option = "username";
        search = username;
        break;
      case 2:
        option = "ufname";
        search = ufname;
        break;
      case 3:
        option = "email";
        search = email;
        break;
      default:
        break;
    }
    // console.log(search);
    // var temp = `http://localhost:3001/searchuser/${search}/${option}`;
    // localStorage.setItem("userAPI",temp);
    let query = `search=${search}&option=${option}`
    setSearchURL(query)
    setSearchstatus(true);
  };
  //if user click button search it will redirect to result page
  if(searchstatus){
    return <Redirect push to={{pathname: "/userresults",search:`?${searchURL}`}}/>
  }
  const addNewUser = () => {
    let user_info = {
      ufname: ufname,
      ulname: ulname,
      username: username,
      password: password,
      email: email,
      address: address,
      age: age,
      role: role,
    };
    Axios.post("http://localhost:3001/insertuser", user_info).then((res) => {
      console.log(res.data)
      alert(res.data.msg);
      if(res.data.err == false){
        //SHOW new user in the webpage immediately.
        setuserList([...userList, {
          ufname: ufname,
          ulname: ulname,
          username: username,
          password: password,
          email: email,
          address: address,
          age: age,
          role: role,
        }]);
      }
    });
  };

  const results = () => {
    return (
      <div>
        {userList.map((val, key) => {
          return (
            <div>
              <br />
               <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={()=>{clear(val.username)}}></button>
              <div className="card" style={{width:"18rem;", borderRadius:"30px"}}>
                <div className="card-body">
                  <h4 className="card-subtitle mb-2 ">{val.ufname} {val.ulname}</h4>
                  <h5 className="card-title">Username: &nbsp; {val.username}</h5>
                  <hr></hr>
                  <p className="card-text d-flex"><h5>Address:&nbsp;</h5> {val.address}</p>
                  <p className="card-text d-flex"><h5>Age:&nbsp;</h5> {val.age}</p>
                  <p className="card-text d-flex"><h5>Email:&nbsp;</h5> {val.email}</p>
                  <p className="card-text d-flex"><h5>Role:&nbsp;</h5> {val.role}</p>
                </div>
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
        <h1 className="headerr" style={{ textAlign: "center" }}>User management</h1>
        {/* <hr className="rounded"></hr> */}
        <div className="container">
          <div className="row justify-content-center" >
            <div className="cardstock3 col-8 align-self-start">
              <h3>Insert new user</h3>
              <hr></hr>
              <div className="d-flex flex-column justify-content-start" >
                <div className="d-flex ">
                  <label className="align-self-center">First name:&nbsp;</label>
                  <input
                    type="text"
                    placeholder="Enter firstname"
                    onChange={(e) => {
                      setufname(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex ">
                  <label className="align-self-center">Last name:&nbsp;</label>
                  <input
                    type="text"
                    placeholder="Enter lastname"
                    onChange={(e) => {
                      setulname(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex ">
                  <label className="align-self-center">Username:&nbsp;</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex ">
                  <label className="align-self-center">Password:&nbsp;</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex ">
                  <label className="align-self-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E-mail:&nbsp;</label>
                  <input 
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  />
                </div>
                <div className="d-flex ">
                  <label className="align-self-center">&nbsp;&nbsp;Address:&nbsp;</label>
                  <textarea
                    type="address"
                    placeholder="Enter address"
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex ">
                  <label className="align-self-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Age:&nbsp;</label>
                  <input
                  type="number"
                  placeholder="Enter age"
                  onChange={(e) => {
                    setage(e.target.value);
                  }}
                  />
                </div>
                <div className="d-flex ">
                  <label className="align-self-center" style={{marginLeft:"2rem"}}> Role:</label>
                  <select
                    style={{

                      borderRadius : "30px",
                      padding : "10px 15px 10px 15px",
                      margin: "5px",
                      borderWidth: "1px",
                      borderColor: "#304e52"
                    }}
                    value={role}
                    onChange={(e) => {
                      setrole(e.target.value);
                    }}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                  <div className="p-2" style={{width:"6.4rem"}}></div>
                  <div className="d-flex">
                    <button className="btn" style={{width:"6rem"}}
                    type="submit"
                    onClick={() => {
                      addNewUser();
                    }}
                  >
                    Insert
                  </button>
                  </div>
                  
                </div>
                
              </div>
            </div>
            <div className=" cardstock4 col-8">
                  <h3>Search user</h3>
                  <hr></hr>
                <div className="col" >

                  <div className="d-flex ">
                  <input
                    type="text"
                    placeholder="Search username"
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                  />
                  <button className="btn mt-1"
                    
                    onClick={() => {
                      getuserbyusername(1);
                    }}
                  >
                    search by username
                  </button>
                  </div>
                  <div className="d-flex">
                    <input
                      type="text"
                      placeholder="Search firstname"
                      onChange={(e) => {
                        setufname(e.target.value);
                      }}
                    />
                    <button className="btn mt-1"
                      onClick={() => {
                        getuserbyusername(2);
                      }}
                    >
                      search by firstname
                    </button>
                  </div>
                  <div className="d-flex mt-1">
                    <input
                      type="text"
                      placeholder="Search email"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    />
                    <button className="btn mt-1"
                    style={{
                      
                    }}
                      onClick={() => {
                        getuserbyusername(3);
                      }}
                    >
                      search by email
                    </button>
                  </div>
                  <div className="d-flex mt-3">
                    <div style={{width:"16rem"}}></div>
                    <button className="btn "
                      style={{backgroundColor:"#f2a154"}}
                      type="submit"
                      onClick={() => {
                        getUser();
                      }}
                    >
                    get all user
                    </button>
                    <button className="btn ms-2"
                      style={{backgroundColor:"#f2a154"}}
                      type="submit"
                      onClick={() => {
                        clear();
                      }}
                    >
                      clear
                    </button>{" "}
                  </div>
                </div>
                <div className="col">
                  {results()}
                </div>
            </div>
          </div>
        </div>
        <div className="footer">
          {/* footer */}
          <p>
            <strong>Group 3 | ITCS212 Web Programming</strong>
          </p>
          <p>
            <span>Copyright © 2021 Group3.co.</span>{" "}
            <span>All Rights Reserved.</span>
          </p>
        </div>
    </div>
  );
}

export default Userman;
