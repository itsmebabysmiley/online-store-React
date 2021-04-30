import React from 'react'
import Navbar from './Navbar'
// import ReactDOM, { render } from 'react-dom';
import { useState } from "react";
function Test(){
    return(
        <div>
            <h1 style={{textAlign: "center"}}>This is test</h1>
        </div>
    );
    
}

function Home() {
    const [hide, setHide] = useState(false);
    const changePage = ()=>{
        setHide(!hide);
        const x = true
        if(x){
            return(
                <Test/>
            )
        }else{
            return(
                <div>
                    <h1 style={{textAlign: "center"}}>This is fuck</h1>
                </div>
            )
        }
    }
    return (
        <div>
            <Navbar/>
            <h1 style={{textAlign: "center"}}>This is homepage</h1>
        </div>
    )
}
export default Home


