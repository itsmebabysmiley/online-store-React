import React from 'react'
import Navbar from './Navbar'
import '../App.css'
import { useState, useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
function Home() {
    const [statusLogin, setstatusLogin] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log(token);
        Axios.post("http://localhost:3001/isUserAuth", { token: token }).then(
          (res) => {
            //   console.log(res.data.status);
            if (res.data.status === false) {
              localStorage.removeItem("token");
              setstatusLogin(true);
            }
          }
        );
      });
      // not login then redirect to login page.
    if(statusLogin){
        return <Redirect to={'/'}/>
    }
    return (
        <div>
            <Navbar/>
            <h1 className= "headerr" style={{textAlign: "center"}}>90's taste, Admin</h1>
            
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <h5 className="nav-link active" href="#">Dashboard</h5>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Statistic</a>
                    </li>
                    </ul>
                </div>
                <div className="card-body">
                    <h4 className="card-title">90's taste Admin</h4>
                    <p className="card-text">Web Programming Project</p>
                    <a href="https://docs.google.com/document/d/1xy5jo_cbRy2PL_cpBOEPOX14abFZI9OkNC0QMtpxHVs/edit" className="btn">View Report</a>
                </div>
                </div>
                {/* Content */}
                    <div className="row p-3">
                    <div className="col-sm-4">
                        <div className="card mini">
                        <div className="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 className="card-title">Page View</h5>
                                    <p className="card-text">
                                    Github <br />Online-shopping
                                    <br />
                                    </p>
                                    <a href="https://github.com/itsmebabysmiley/Online-shopping" className="btn"> View Detail</a>
                                </div>
                                <div class="col">
                                    <img src="https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/git.png?raw=true" style={{maxWidth:"100%"}}></img>
                                </div>
                                
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card mini">
                            <div className="card-body">
                                <div class="row">
                                        <div class="col">
                                            <h5 className="card-title">Give us A</h5>
                                            <p className="card-text">
                                            
                                            <br /><br />
                                            </p>
                                            <a href="https://mycourses.ict.mahidol.ac.th/" className="btn"> View Detail</a>
                                        </div>
                                        <div class="col">
                                            <img src="https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/90's%20taste%20LOGO.png?raw=true" style={{maxWidth:"100%", width:"200px"}}></img>
                                        </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    <div className="col-sm-4">
                        <div className="card mini">
                        <div className="card-body">
                                <div class="row">
                                        <div class="col">
                                            <h5 className="card-title">Balance</h5>
                                            <p className="card-text">
                                            
                                            <br /><br />
                                            </p>
                                            <a href="https://github.com/itsmebabysmiley/Online-shopping" className="btn"> View Detail</a>
                                        </div>
                                        <div class="col">
                                            <br />
                                        <img src="https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/money.png?raw=true" style={{maxWidth:"100%", width:"100px"}}></img>
                                        </div>
                                </div>
                        </div>
                        </div>
                    </div></div>
                    <div className="footer">
                    {/* footer */} 
                    <p><strong>Group 3 | ITCS212 Web Programming</strong></p>
                    <p><span>Copyright © 2021 Group3.co.</span> <span>All Rights Reserved.</span></p>
                </div>
            
            </div>
    )   
}
export default Home


