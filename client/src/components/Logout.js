import React from 'react'
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
function Logout() {
    useEffect(
        ()=>{
            localStorage.removeItem('token');
        }
    )
    return (
        <div>
            <Redirect to={'/'}/>
        </div>
    )
}

export default Logout
