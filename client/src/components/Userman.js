import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../App.css";
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
//   const [statusLogin, setstatusLogin] = useState(false);
//   useEffect(() => {
//     Axios.get("http://localhost:3001/getloginstatus").then((res) => {
//       console.log(res.data);
//       if (res.data.data.err) {
//         console.log("ook");
//         setstatusLogin(true);
//       }
//     });
//   });
  // if(statusLogin){
  //     return <Loginpage />
  // }

  const clear = () => {
    setuserList([]);
  };
  const getUser = () => {
    Axios.get("http://localhost:3001/searchuserall").then((res) => {
      console.log(res.data.data);
      setuserList(res.data.data);
    });
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
    console.log(search);
    Axios.get(`http://localhost:3001/searchuser/${search}/${option}`).then(
      (res) => {
        console.log(res.data.data);
        setuserList(res.data.data);
      }
    );
  };
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
      alert(res.data.msg);
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
    });
  };
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
    console.log(username);
    Axios.delete("http://localhost:3001/deleteuser", {
      data: { username: username },
    }).then((res) => {
      console.log("ok");
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
        <div className="container">
      <h1 style={{ textAlign: "center" }}>User management</h1>
      <div className="container">
        <h3>Insert new user</h3>
        <input
          type="text"
          placeholder="Enter firstname"
          onChange={(e) => {
            setufname(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter lastname"
          onChange={(e) => {
            setulname(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <br />
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <br />
        <input
          type="email"
          placeholder="Enter address"
          onChange={(e) => {
            setaddress(e.target.value);
          }}
        />
        <br />
        <input
          type="number"
          placeholder="Enter age"
          onChange={(e) => {
            setage(e.target.value);
          }}
        />
        <br />
        <select
          value={role}
          onChange={(e) => {
            setrole(e.target.value);
          }}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <br />
        <button
          type="submit"
          onClick={() => {
            addNewUser();
          }}
        >
          Insert
        </button>
      </div>
      <div className="container">
        <h3>Search user</h3>
        <button
          type="submit"
          onClick={() => {
            getUser();
          }}
        >
          get all user
        </button>{" "}
        <button
          type="submit"
          onClick={() => {
            clear();
          }}
        >
          clear
        </button>{" "}
        <br />
        <input
          type="text"
          placeholder="Search username"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getuserbyusername(1);
          }}
        >
          search by username
        </button>{" "}
        <br />
        <input
          type="text"
          placeholder="Search firstname"
          onChange={(e) => {
            setufname(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getuserbyusername(2);
          }}
        >
          search by firstname
        </button>
        <br />
        <input
          type="text"
          placeholder="Search email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getuserbyusername(3);
          }}
        >
          search by email
        </button>
      </div>
      <div>{results()}</div>
    </div>
    </div>
  );
}

export default Userman;
